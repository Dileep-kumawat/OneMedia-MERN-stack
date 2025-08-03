import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
