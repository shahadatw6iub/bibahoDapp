import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the client is not re-created on every hot reload.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('marriageAppointments');

    const appointmentData = req.body;
    const result = await db.collection('appointments').insertOne(appointmentData);

    res.status(200).json({ message: 'Appointment saved successfully', data: result });
  } catch (error) {
    console.error('Failed to save appointment:', error);

    if (error instanceof Error) {
      // Handle the error as an instance of Error
      res.status(500).json({ message: error.message });
    } else {
      // Handle the case where the error is not an instance of Error
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}

export default handler;
