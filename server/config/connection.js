//const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yongwooyun74:4sygt3ckJsExqlxb@cluster0.j2y0ej4.mongodb.net/googlebook?retryWrites=true&w=majority&appName=Cluster');

//module.exports = mongoose.connection;

//const mongoose = require('mongoose');
//require('dotenv').config();

//mongoose.connect(process.env.MONGODB_URI);

//module.exports = mongoose.connection;

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;


