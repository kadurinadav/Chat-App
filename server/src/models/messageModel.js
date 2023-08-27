const mongoose = require('mongoose');

// Define message schema
const messageSchema = new mongoose.Schema(
    {
      message: {
        text: {
          type: String,
        }
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

// Create message model  
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;