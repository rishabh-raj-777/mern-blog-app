const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});

