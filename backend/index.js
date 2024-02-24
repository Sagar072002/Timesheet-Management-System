const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./db');
const { createUser, loginUser, getAllUsers, getUserByUserId, updateUserDetails } = require('./controllers/UserController');
const { createTimelog, deleteTimelogs, getTaskDetails } = require('./controllers/TimelogController');
const { createScorecard, getScore, totalScore, getDateRange } = require('./controllers/ScorecardController');
const {sendmail,verifymail,reset_pass} = require('./mail/mail');
const {qrgen,set2fa} = require('./mail/qrauthenticator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//mail Routes
app.get("/",(req,res)=>res.send("Hello Done Succesfully"))
app.post('/mail/forgotpassword', sendmail);   // Send Reset/Forgot password mail
app.post('/mail/verifyforgot', verifymail);   // to verify user link mail
app.post('/mail/reset', reset_pass);   // Send Reset/Forgot password mail
app.post('/auth/qr',qrgen)
app.post('/auth/set2fa',set2fa)

//user Routes
app.post('/register', createUser);
app.post('/login', loginUser);
app.get('/users', getAllUsers);             
app.get('/users/:userid', getUserByUserId);  
app.put('/users/:userid', updateUserDetails);   

//timelog Routes
app.post('/timelog', createTimelog);
app.post('/deletetimelog', deleteTimelogs);
app.post('/gettaskdetails', getTaskDetails);

//scorecard Routes
app.post('/scorecard', createScorecard);
app.post('/getscore', getScore);
app.post('/totalscore',totalScore)
app.post('/daterange',getDateRange)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Sync Sequelize models with the database
  await sequelize.sync({ force: false });
  console.log('Database synced successfully');
});
