const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://user0001:12345@pratica06.wckqqpk.mongodb.net/';

const client = new MongoClient(url);


async function conectarDb() {
  await client.connect();
  return client.db('agenda');
}


module.exports = { conectarDb };