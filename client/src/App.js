import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ChatPage from './pages/ChatPage';
import SetAvatarPage from './pages/SetAvatarPage';
import io from 'socket.io-client';

function App() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the socket.io server
    const newSocket = io.connect('http://localhost:3001');
    setSocket(newSocket);

    // Emit the 'add_user' event to inform the server that the user is online
    if (currentUser) {
      newSocket.emit('add_user', { userId: currentUser._id });
    }

    return () => {
      // Disconnect the socket when the component unmounts
      newSocket.disconnect();
    };
  }, [currentUser]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
      children: [
        { path: '/', element: <SignIn setCurrentUser={setCurrentUser} socket={socket} /> },
        { path: '/signup', element: <SignUp setCurrentUser={setCurrentUser} /> },
        { path: '/setAvatar', element: <SetAvatarPage currentUser={currentUser} /> }
      ]
    },
    { path: '/chat', element: <ChatPage currentUser={currentUser} setCurrentUser={setCurrentUser} currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket} /> }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
