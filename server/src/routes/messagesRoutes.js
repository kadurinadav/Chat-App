const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');


// POST Request - Add new message to the database
router.post('/addmsg', async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const newMessage = new Message({
      message: { text: message },
      users: [from, to],
      sender: from
    });
    await newMessage.save();
    res.json({ success: true, message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET Request - Get all messages between currentUser and currentChat
router.get('/getallmsg/', async (req, res) => {
  try {
    const { from, to } = req.query;
    const messages = await Message.find({
      users: { $all: [from, to] },
    });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        time: msg.createdAt
      };
    });
    res.json({ success: true, messages: projectMessages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
