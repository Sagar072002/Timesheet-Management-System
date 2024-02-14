
// controllers/UserController.js
const { User } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const {
      name,
      userid, 
      gender,
      email,
      phone_number,
      age,
      address,
      password,
      is_admin,
    } = req.body;

    const user = await User.create({
      name,
      userid, 
      gender,
      email,
      phone_number,
      age,
      address,
      password,
      is_admin,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// app.post('/login', (req, res) => {
//   const { userId, password } = req.body;
  
//   // In a real scenario, you should validate the user against your database here
//   if (userId === user.userId && password === user.password) {
//       res.json({ success: true, message: 'Login successful' });
//   } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }
// });
const loginUser = async (req, res) => {
  //console.log("in");
  try {
    const { email, password } = req.body; 
    console.log("request",req.body);
    const user = await User.findOne({ where: { email } }); 

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// New functions
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ where: { userid } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userid } = req.params;
    const { name, gender, email, phone_number, age, address } = req.body;

    const user = await User.findOne({ where: { userid } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.email = email || user.email;
    user.phone_number = phone_number || user.phone_number;
    user.age = age || user.age;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails };
