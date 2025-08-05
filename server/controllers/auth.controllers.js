import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('username fullname email avatar gender');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, username, password, gender } = req.body;

    if (!fullname || !email || !username || !password || !gender) {
      return res.status(400).json({ message: "All credentials required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const avatarType = gender === 'male' ? 'boy' : 'girl';
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullname, email, username, password: hashedPassword, gender, avatar });
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, fullname: user.fullname, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 86400000 });
    res.json({ success: true, user: { username: user.username, fullname: user.fullname } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All credentials required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username, fullname: user.fullname, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 86400000 });
    res.json({ success: true, user: { username: user.username, fullname: user.fullname } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
