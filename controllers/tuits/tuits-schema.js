import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislikes: Number,
  disliked: Boolean,
  replies: Number,
  retuits: Number,
  handle: String,
  image: String
}, {collection: 'tuits'});
export default schema;