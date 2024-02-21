const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./db');
const { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails } = require('./controllers/UserController');
const { createTimelog, deleteTimelogs, updateTimelog } = require('./controllers/TimelogController');
const { createScorecard, getScore } = require('./controllers/ScorecardController');
const {sendmail,verifymail,reset_pass} = require('./mail/mail');
const {qrgen,set2fa} = require('./mail/qrauthenticator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/",(req,res)=>res.send("Hello Done Succesfully"))

//user routes
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
