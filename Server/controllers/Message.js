const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

router.post("/send", async (req, res) => {
  const { text, senderId, receiverId } = req.body;
  console.log(senderId);
  console.log(text);
  console.log(receiverId);


  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid message text" });
  }

  try {
    const newMessage = new Message({
      text,
      sender: senderId,
      receiver: receiverId
    });
    await newMessage.save();

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [newMessage._id]
      });
    } else {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

router.get("/get-message", async (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "Missing senderId or receiverId" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
});

module.exports = router;
