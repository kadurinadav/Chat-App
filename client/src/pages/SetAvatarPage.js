import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './SetAvatarPage.css'

function SetAvatarPage({currentUser}) {
    const navigate = useNavigate();
    const api = 'https://api.multiavatar.com/45678945';
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)

    const setProfilePicture = async () => {
        try {
          const response = await axios.post('http://localhost:3001/users/update-avatar', {
            email: currentUser.email,
            avatarImage: avatars[selectedAvatar]
          });
      
          const data = response.data;
      
          if (data.success === true) {
            navigate('../chat');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const base64Image = btoa(response.data);
                data.push(base64Image);
            }
            setAvatars(data);
            setIsLoading(false)
        };
        fetchData();
    }, []);

    return (
        <>
            {!isLoading && <div className='avatar-container'>
                <div className='avatar-title'>
                    <h1> Pick an avatar as your profile picture </h1>
                </div>
                <div className='avatars'>
                    {avatars.map((avatar, index) => (
                        <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="" onClick={() => setSelectedAvatar(index)}></img>
                        </div>
                    ))}
                </div>
                <button className='set-profile-btn' onClick={setProfilePicture}> Set as profile picture </button>
            </div>}
            {isLoading && <LoadingSpinner/>}
        </>
    );
}

export default SetAvatarPage;
