import { MongoClient } from "mongodb";

async function handler(req, res) {
  const postSlug = req.query.slug;
  const postSubject = req.body.subject;
  const postPreview = req.body.preview;

  if (req.method === "GET") {
    res.status(422).json({ message: "Method not available." });
  }

  if (req.method === "PATCH") {
    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.srxozkr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database." });
      return;
    }
    const db = client.db();

    let post;

    try {
      post = await db.collection("posts").updateOne(
        { slug: postSlug },
        {
          $set: {
            subject: postSubject,
            preview: postPreview
          },
        }
      );
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Updating message failed." });
      return;
    }

    client.close();

    return res.status(201).json({ post });
  }
}

export default handler;
