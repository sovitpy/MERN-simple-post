import mongoose from 'mongoose';

const Post = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = new mongoose.model('PostModel', Post);

export default PostModel;
