const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv/config');
const cors = require('cors');
const path = require('path');

const Items = require('./Routes/api/items');

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
  },
  () => console.log('connected to DB!')
);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);
app.use('/api/items', Items);
app.get('/', (req, res) => {
  res.send('building a mern app');
})

//Serve static assets if in production 
if(process.env,NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('mernfront/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'mernfront', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`mern stack ${PORT}`));
