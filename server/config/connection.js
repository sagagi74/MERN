//const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yongwooyun74:4sygt3ckJsExqlxb@cluster0.j2y0ej4.mongodb.net/googlebook?retryWrites=true&w=majority&appName=Cluster');

//module.exports = mongoose.connection;

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;
