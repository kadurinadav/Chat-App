import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Chats from './Chats';
import './Sidebar.css';

function SideBar({currentUser, setCurrentChat}) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/');
        const data = response.data;
        if (data.success === true) {
          const users = data.data;
          setContacts(users);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUsers();
  }, []);


  return (
    <div className='sidebar'>
      <Navbar />
      <div className='chats-container'>
        {contacts.map((user) => {
          if (user.email !== currentUser.email) {
            return <Chats setCurrentChat={setCurrentChat} key={user._id} user={user} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default SideBar;
