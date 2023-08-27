import React, { useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import './Chat.css'

function Chat({currentUser, currentChat, socket}) {
  const [messages, setMessages] = useState([]);

  return (
    <div className='chat'>
      <div className='chat-info'>
        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt= ""/>
        <span> {currentChat.username} </span>
      </div>
      <Messages currentUser = {currentUser} currentChat = {currentChat} messages={messages} setMessages={setMessages} socket={socket}/>
      <MessageInput currentUser = {currentUser} currentChat = {currentChat} messages={messages} setMessages={setMessages} socket={socket}/>
    </div>
  )
}

export default Chat