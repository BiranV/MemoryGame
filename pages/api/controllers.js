import { MongoClient } from "mongodb";

async function apiHandler(req, res) {

    const client = await MongoClient.connect(process.env.MONGO_URI)
    const db = client.db();
    const collection = db.collection('game');

    if (req.method === 'POST') {
        await collection.insertOne(req.body)
        client.close();
        res.status(201).json({ message: 'record added successfully' });
    }
}

export default apiHandler;