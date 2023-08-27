import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import './Messages.css';

function Messages({currentUser, currentChat, messages, setMessages, socket}) {
  const [arrivalMessage, setArrivalMessage] = useState(undefined)
  const messagesRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/messages/getallmsg', {
          params: {
            from: currentUser._id,
            to: currentChat._id
          }
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentChat, currentUser, setMessages]);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const renderMessagesByDate = () => {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const messageDate = new Date(msg.time).toLocaleDateString([], { hour12: false });
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(msg);
    });

    return Object.keys(groupedMessages).map((date) => (
      <React.Fragment key={date}>
        <div className="date-container">
          <p className="message-date">{date}</p>
        </div>
        {groupedMessages[date].map((msg, index) => (
          <Message currentUser = {currentUser}  currentChat={currentChat} key={index} msg={msg} />
        ))}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if(socket){
      socket.on('recieve_message', (message) => {
        const currentTime = new Date().toISOString();
        setArrivalMessage({fromSelf: false, message: message, time: currentTime })
        console.log("got message!")
      });
    }
  }, [socket]);


  useEffect(() => {
    arrivalMessage && setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage, setMessages])


  return (
    <div className="messages" ref={messagesRef}>
      {renderMessagesByDate()}
    </div>
  );
}

export default Messages;
