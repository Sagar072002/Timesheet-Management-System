const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./db');
const { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails } = require('./controllers/UserController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/register', createUser);
app.post('/login', loginUser);

// New Routes
app.get('/users', getAllUsers);              // Fetch all users
app.get('/users/:userid', getUserByUserId);  // Fetch user by employee ID
app.put('/users/:userid', updateUserDetails);   // Update user details by employee ID

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Sync Sequelize models with the database
  await sequelize.sync({ force: false });
  console.log('Database synced successfully');
});
