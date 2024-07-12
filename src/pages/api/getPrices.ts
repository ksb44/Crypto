import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
const MONGODB_URI = process.env.MONGO_URI || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { crypto } = req.query;
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('crypto');
    const collection = db.collection<{ crypto: string; price: number; timestamp: Date }>('prices');

    const prices = await collection
      .find({ crypto: crypto as string }) 
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    res.status(200).json(prices);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching prices' });
  } finally {
    await client.close();
  }
}
