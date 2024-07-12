import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();

interface CryptoPrice {
  crypto: string;
  price: number;
  timestamp: Date;
}

const MONGODB_URI =process.env.MONGO_URI || '';
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('crypto');
    const collection = db.collection<CryptoPrice>('prices');

    const cryptocurrencies = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'polkadot'];

    for (const crypto of cryptocurrencies) {
      const response = await axios.get(`${COINGECKO_API}/simple/price?ids=${crypto}&vs_currencies=usd`);
      const price = response.data[crypto].usd;

      await collection.insertOne({
        crypto,
        price,
        timestamp: new Date(),
      });
    }

    res.status(200).json({ message: 'Data fetched and stored successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching and storing data' });
  } finally {
    await client.close();
  }
}
