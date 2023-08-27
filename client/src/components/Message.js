import React from 'react';
import './Message.css';

function Message({ currentUser, currentChat, msg }) {

  const getTimeString = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours}:${minutes}`;
    return timeString;
  };

  return (
    <div className={`message ${msg.fromSelf ? 'owner' : ''}`}>
      <div className='message-info'>
        <img src={`data:image/svg+xml;base64,${msg.fromSelf ? currentUser.avatarImage: currentChat.avatarImage}`} alt="" />
        <span className="message-time">{getTimeString(msg.time)}</span>
      </div>
      <div className='message-content'>
        {msg.message && <p>{msg.message}</p>}
      </div>
    </div>
  );
}

export default Message;
