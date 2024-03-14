
// controllers/UserController.js
const { User } = require('../db');
const bcrypt = require('bcrypt');

// Creating a new user with the required details
const createUser = async (req, res) => {
  try {
    var {
      name,
      userid, 
      gender,
      email,
      phone_number,
      age,
      address,
      password,
      is_admin,
      reset_link,
      image
    } = req.body;
    const twofa=false;
    var rowCount = await User.count();
    rowCount+=100;
    // Generating random userid for each user
    if(is_admin){
      userid='A'+rowCount.toString();
    }
    else{
      userid='E'+rowCount.toString();
    }
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
      reset_link,
      twofa,
      image,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Logging in the existing user with email and password
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 
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

// Fetching the details of all the users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetching the details of all the users with respect to userid
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

// Updating the user details
const updateUserDetails = async (req, res) => {
  try {
    const { userid } = req.params;
    const { name, gender, email, phone_number, age, address,image } = req.body;

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
    user.image = image || user.image;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails };
