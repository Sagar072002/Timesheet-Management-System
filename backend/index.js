const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./db');
const { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails } = require('./controllers/UserController');
const { createTimelog, deleteTimelogs, updateTimelog } = require('./controllers/TimelogController');
const { createScorecard, getScore } = require('./controllers/ScorecardController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// User Routes
app.post('/register', createUser);
app.post('/login', loginUser);
app.get('/users', getAllUsers);             
app.get('/users/:userid', getUserByUserId);  
app.put('/users/:userid', updateUserDetails);   

// Timelog Routes
app.post('/timelog', createTimelog);
app.post('/deletetimelog', deleteTimelogs);
app.put('/updatetimelog', updateTimelog);

// Scorecard Routes
app.post('/scorecard', createScorecard);
app.post('/getscore', getScore);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Sync Sequelize models with the database
  await sequelize.sync({ force: false });
  console.log('Database synced successfully');
});
