const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@keedat-zyado.mongodb.net/keedat?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("keedat").collection("keedat");
//   // perform actions on the collection object
//   client.close();
// });

// mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@keedat-zyado.mongodb.net/keedat?retryWrites=true&w=majority`)
mongoose.connect(`mongodb://127.0.0.1:27017`)
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log(`Connection failed! Error: ${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
