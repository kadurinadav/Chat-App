const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// Get Request - Check if user exists in the database
router.get('/auth', async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.json({ success: true, data: user, message: 'Authentication successful' });
      } else {
        res.json({ success: false, message: 'Incorrect password for the account with that email address. Please try again' });
      }
    } else {
      res.json({ success: false, message: "Sorry, we can't find an account with this email address. Please try again or create a new account" });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST Request - Add User to database
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userByEmail = await User.findOne({ email });
    const userByUsername = await User.findOne({ username });

    if (userByEmail) {
      res.json({ success: false, message: 'user with that email is already exists.' });
      return;
    }

    if (userByUsername) {
      res.json({ success: false, message: 'user with that username is already exists.' });
      return;
    }

    const newUser = new User({
      username,
      email,
      password
    });
    
    await newUser.save();
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// POST Request - Update user's avatar image
router.post('/update-avatar', async (req, res) => {
  const { email, avatarImage } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
  
    if (!user) {
      res.json({ success: false, message: 'User not found' });
      return;
    }

    user.isAvatarImageSet = true;
    user.avatarImage = avatarImage;

    await user.save();

    res.json({ success: true, message: 'Avatar image updated successfully' });
  } catch (error) {
    console.error('Error updating avatar image:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET Request - Retrieve all users from the database
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;