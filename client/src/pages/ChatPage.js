import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome'
import './ChatPage.css'


function ChatPage({currentUser, setCurrentUser, currentChat, setCurrentChat, socket}) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserData = sessionStorage.getItem('currentUser');
      if (!currentUserData) {
        navigate('./')
      } else {
        setCurrentUser(JSON.parse(currentUserData));
      }
    };
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser]);


  return (
    <div className='chat-page'>
        <div className='container'>
            <Sidebar currentUser={currentUser} setCurrentChat={setCurrentChat}/>
            {currentChat === undefined && <Welcome currentUser = {currentUser}/>}
            {currentChat !== undefined && <Chat currentUser = {currentUser} currentChat={currentChat} socket={socket}/>}
        </div>
    </div>
  )
}

export default ChatPage