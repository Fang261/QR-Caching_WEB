const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/db';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // to perform operations on the database, use 'client.db()'
        // const db = client.db();

        //execute queries here

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connectToMongoDB, client }; // exporting the connection function and client for later use
