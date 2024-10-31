const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('empresa'); 
    const collections = await database.listCollections().toArray(); // List all collections
    console.log('Collections:', collections.map(col => col.name));
  } finally {
    await client.close();
  }
}

run().catch(console.error);