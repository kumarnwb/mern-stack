const mongoose = require('mongoose');
const env = require('../config/config');

env.get();

const connetDB = async () => {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${
    process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true

    });
    console.log('Connected to Database ', conn.connection.host);
  }
  catch (e) {
    mongoose.connection.on('error', (error) => {
      console.log('Error Connecting to Database ', error);
      process.exit(1);
    });
  }
};

module.exports = connetDB;
