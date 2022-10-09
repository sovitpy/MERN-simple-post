import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postModel from './models/postModel.js';
import PostModel from './models/postModel.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const options = {
  keepAlive: true,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DB_URI = process.env.DB_URI;
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Your are lucky!! server is running...');
});

app.get('/posts', async (req, res) => {
  try {
    let posts = await PostModel.find().sort('-createdAt');
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.post('/posts', async (req, res) => {
  const newPost = req.body;
  try {
    const post = await PostModel.create(newPost);
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  try {
    let book = await PostModel.findByIdAndRemove(req.params.postId);
    if (book) {
      res.status(200).json({
        status: 200,
        message: 'Post deleted successfully',
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'No Post found',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

mongoose.connect(DB_URI, options, (err) => {
  if (err) console.log(err);
});

// Validate DB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Mongo DB Connected successfully');
});
app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`));
