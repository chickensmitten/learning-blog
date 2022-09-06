import { MongoClient } from "mongodb";

export async function getPostData(slug) {
  const resData = await fetch(`${process.env.API_URL}/posts/${slug}`);
  const data = await resData.json();
  return data;  
}

async function handler(req, res) {
  const postSlug = req.query.slug;

  if (req.method === "POST") {
    res.status(422).json( { message: "Method not available."});
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
    
    let post;
    
    try {
      post = await db.collection("posts").findOne({slug: postSlug});
    } catch (error) {
      client.close();
      res.status(500).json({message: "Storing message failed."});
      return;
    }
    
    client.close();
  
    return res.status(200).json({post})
  }
  
}

export default handler;