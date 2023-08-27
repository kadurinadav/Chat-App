import React from 'react'
import './Chats.css'

function Chats({setCurrentChat, user}) {

  const handleChatClick = () => {
    setCurrentChat(user)
  }
  
  return (
    <div className='chats'>
      <div className='user-chat' onClick={handleChatClick}>
        <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt= ""/>
        <div className='user-chat-info'>
          <span> {user.username} </span>
        </div>
      </div>
    </div>
  )
}

export default Chats