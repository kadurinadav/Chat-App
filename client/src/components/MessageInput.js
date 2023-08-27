import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import axios from 'axios';
import './MessageInput.css';

function MessageInput({ currentUser, currentChat, messages, setMessages, socket }) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageHandler = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      const formData = {
        from: currentUser._id,
        to: currentChat._id,
        message: message
      };
      
      socket.emit('send_message', {
        to: currentChat._id,
        message: formData,
      });

      const msgs = [...messages]
      const currentTime = new Date().toISOString();
      msgs.push({ fromSelf: true, message: formData.message, time: currentTime })
      setMessages(msgs)

      await axios.post('http://localhost:3001/messages/addmsg', formData);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      messageHandler();
    }
  };

  const handleEmojiClick = (event, emojiData) => {
    let msg = message;
    msg += emojiData.emoji;
    setMessage(msg);
    handleEmojiPicker();
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className='message-input'>
      <div className='emoji'>
        <BsEmojiSmileFill onClick={handleEmojiPicker} />
        <div className='emoji-picker'>{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}</div>
      </div>
      <input type='text' placeholder='Type Something...' value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={handleKeyPress} />
      <div className='send'>
        <button className='send-btn' onClick={messageHandler}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
