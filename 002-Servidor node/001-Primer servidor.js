const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('empresa'); 
    const collection = database.collection('clientes'); 
    const clientes = await collection.find({}).toArray();
    console.log(clientes);
  } finally {
    await client.close();
  }
}

run().catch(console.error);