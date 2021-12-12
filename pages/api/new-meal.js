import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const DATABASE_NAME = "myFirstDatabase";
  const DATABASE_PASSWORD = "Bnizi0207";

  if (req.method === "POST") {
    const client = await MongoClient.connect(
        `mongodb+srv://bniziolek:${DATABASE_PASSWORD}@cluster0.ylfvd.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();
    const mealsCollection = db.collection("meals");
    await mealsCollection.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Meal inserted" });
  }
};

export default handler;