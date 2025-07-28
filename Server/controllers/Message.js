const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/send", async (req, res) => {
  const { text,senderId } = req.body;
  console.log(text);
  console.log(senderId);
  // const sender = req.params.senderId;
  // const receiver = req.params.receiverId;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid message text" });
  }

  // try {
  //   const newMessage = new Message({ text });
  //   await newMessage.save();
  //   res.status(201).json({ message: "Message saved", data: newMessage });
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to send message", details: error.message });
  // }
});

module.exports = router;