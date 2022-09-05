// get all posts here

import { MongoClient, Timestamp } from "mongodb";
import slugify from "slugify";

export async function getAllPosts() {
  const resData = await fetch(`${process.env.API_URL}/posts`);
  const data = await resData.json();
  return data;  
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, preview } = req.body;
    const time = new Date().toLocaleTimeString()
    const datetime = new Date()
    const slug = slugify(subject)
    const sender = "Gloria Roberston"
    
    const newPost = {
      subject,
      preview,
      slug,
      sender,
      time,
      datetime,
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
      .json({ message: "Successfully stored message!", message: newPost });
  }

  return res.status(200).json(
    [
      {
        id: 1,
        slug: "velit-placeat-sit-ducimus-non-sed-1",
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
          'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
      },
      {
        id: 2,
        slug: "velit-placeat-sit-ducimus-non-sed-2",
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
          'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
      },
      {
        id: 3,
        slug: "velit-placeat-sit-ducimus-non-sed-3",
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
          'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
      }  
      // More messages...
    ]
  )
}

export default handler;


