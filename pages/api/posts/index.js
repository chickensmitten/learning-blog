// get all posts here

import { MongoClient } from "mongodb";
import slugify from "slugify";

export async function getAllPosts() {
  const resData = await fetch(`${process.env.API_URL}/posts`);
  const data = await resData.json();
  return data;  
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, preview, uploadedImages } = req.body;
    const time = new Date().toLocaleTimeString();
    const datetime = new Date();
    const slug = slugify(subject);
    const sender = "Gloria Roberston";
    const images = uploadedImages;

    const newPost = {
      subject,
      preview,
      slug,
      sender,
      time,
      datetime,
      images,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.srxozkr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database."});
      return;
    }
    const db = client.db();
    
    try {
      await db.collection("posts").insertOne(newPost);
    } catch (error) {
      client.close();
      res.status(500).json({message: "Storing message failed."});
      return;
    }

    client.close();

    return res
      .status(201)
      .json({ message: "Successfully stored message!", post: newPost });
  }

  if (req.method === "GET") {

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.srxozkr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`    
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database."});
      return;
    }
    const db = client.db();
    
    let results;
    
    try {
      results = await db.collection("posts").find({}).toArray();
    } catch (error) {
      client.close();
      res.status(500).json({message: "Storing message failed."});
      return;
    }
    
    
    client.close();
    
    return res
      .status(200)
      .json(results)
  }
}

export default handler;


