import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { getSocketId, getIo } from '../socket.js';

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;
    const { message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      isGroupMessage: false
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    await newMessage.populate('senderId', 'fullname avatar');

    const io = getIo();
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", {
        senderId: newMessage.senderId._id,
        senderName: newMessage.senderId.fullname,
        senderAvatar: newMessage.senderId.avatar,
        message: newMessage.message,
        timestamp: newMessage.createdAt
      });
    }
    
    const senderSocketId = getSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("getMessage", {
        senderId: newMessage.senderId._id,
        senderName: newMessage.senderId.fullname,
        senderAvatar: newMessage.senderId.avatar,
        message: newMessage.message,
        timestamp: newMessage.createdAt
      });
    }

    res.status(200).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { message } = req.body;

    if (!senderId || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newMessage = await Message.create({
      senderId,
      message,
      isGroupMessage: true
    });

    await newMessage.populate('senderId', 'fullname avatar');

    const io = getIo();
    io.emit("getGroupMessage", {
      senderId: newMessage.senderId._id,
      senderName: newMessage.senderId.fullname,
      senderAvatar: newMessage.senderId.avatar,
      message: newMessage.message,
      timestamp: newMessage.createdAt
    });

    res.status(200).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendGroupMessage:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { otherUserId } = req.params;

    if (!myId || !otherUserId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [myId, otherUserId] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId",
        select: "fullname avatar"
      }
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      data: conversation.messages
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const groupMessages = await Message.find({ isGroupMessage: true })
      .populate('senderId', 'fullname avatar')
      .sort({ createdAt: 1 })
      .limit(100); 

    res.status(200).json({
      success: true,
      data: groupMessages
    });
  } catch (error) {
    console.error("Error in getGroupMessages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select('fullname email avatar')
      .sort({ fullname: 1 });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
