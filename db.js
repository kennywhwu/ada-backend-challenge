const { Client } = require("pg");
const DB_URI = "postgresql:///ada";

const client = new Client({
  connectionString: DB_URI,
});

client.connect();

module.exports = client;
