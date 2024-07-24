//const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yongwooyun74:4sygt3ckJsExqlxb@cluster0.j2y0ej4.mongodb.net/googlebook?retryWrites=true&w=majority&appName=Cluster');

//module.exports = mongoose.connection;

//const mongoose = require('mongoose');
//require('dotenv').config();

//mongoose.connect(process.env.MONGODB_URI);

//module.exports = mongoose.connection;

const mongoose = require('mongoose');

// Hardcode the MongoDB URI
const MONGODB_URI = 'mongodb+srv://yongwooyun74:4sygt3ckJsExqlxb@cluster0.j2y0ej4.mongodb.net/googlebook?retryWrites=true&w=majority&appName=Cluster0';

// Log the hardcoded URI to verify
console.log('MONGODB_URI:', MONGODB_URI);

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

module.exports = mongoose.connection;

