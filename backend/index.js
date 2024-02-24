const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const schedule = require("node-schedule");
const { sequelize } = require("./db");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserByUserId,
  updateUserDetails,
} = require("./controllers/UserController");
const {
  createTimelog,
  deleteTimelogs,
  updateTimelog,
} = require("./controllers/TimelogController");
const {
  createScorecard,
  getScore,
} = require("./controllers/ScorecardController");
const {
  sendmail,
  verifymail,
  reset_pass,
  sendbulkmail,
} = require("./mail/mail");
const { qrgen, set2fa } = require("./mail/qrauthenticator");
const { User } = require("./db");
const { Scorecard } = require("./db");

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
app.post("/scorecard", createScorecard);
app.post("/getscore", getScore);
app.post('/totalscore',totalScore)
app.post('/daterange',getDateRange)


//user Score
app.post("/userscore",async (req,res)=>{
  console.log("hell")
  sum=await Scorecard.sum('score', { where: {"userid":req.body.id} }).catch(e=>res.status(500).json({error:e.message}));
  return res.status(200).json({score:sum})
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Sync Sequelize models with the database
  await sequelize.sync({ force: false });
  console.log("Database synced successfully");
  const defaultuser = async () => {
    var dt = new Date();
    dt.setDate(dt.getDate() - dt.getDay() + 1);
    var mon = dt
      .toLocaleDateString("en-US", { dateStyle: "medium" })
      .split(",");
    dt.setDate(dt.getDate() + 4);
    var fri = dt
      .toLocaleDateString("en-US", { dateStyle: "medium" })
      .split(",");
    var range = mon[0] + "," + mon[1] + " - " + fri[0] + "," + fri[1]; // Feb 19, 2024 - Feb 23, 2024
    var score = await Scorecard.findAll({ where: { date_range: range } });
    var a1 = [];
    for (i = 0; i < score.length; i++) {
      a1.push(score[i].userid);
    }
    var a2 = [];
    console.log(a1);
    var user = await User.findAll({ where: { is_admin: "false" } });
    for (i = 0; i < user.length; i++) {
      if (a1.indexOf(user[i].userid) === -1) {
        console.log(user[i].email);
        a2.push(user[i].email);
      }
    }
    console.log(a2);
    var sub=`Timesheet for week ${range} is overdue`
    console.log(sub);
    var msg="I hope this message finds you well.This is a friendly reminder that your timesheet for the current period is overdue. Timely submission of your timesheet is crucial for accurate payroll processing and project management.We kindly request that you submit your timesheet as soon as possible."
    var html=  `<body>
    <p>Dear Employee,</p>
    <br>
    <p>I hope this message finds you well.</p>
    <br>
    <p>As you may be aware, the deadline for submitting your timesheet has passed, and unfortunately, 5 points have been deducted from your record. However, there is still an opportunity to recover these points.</p>
    <br>
    <p>If you submit your timesheet by the end of today, you will still receive 5 points. However, failure to do so will result in a deduction of 0 points.</p>
    <br>
    <p>Best regards,</p>
    <p>Admin</p>
  </body>`
    
    sendbulkmail(a2,sub,msg,html);
  };
  const warning=async()=>{

    var dt = new Date();
    dt.setDate(dt.getDate() - dt.getDay() + 1);
    var mon = dt
      .toLocaleDateString("en-US", { dateStyle: "medium" })
      .split(",");
    dt.setDate(dt.getDate() + 4);
    var fri = dt
      .toLocaleDateString("en-US", { dateStyle: "medium" })
      .split(",");
    var range = mon[0] + "," + mon[1] + " - " + fri[0] + "," + fri[1]; // Feb 19, 2024 - Feb 23, 2024
    var a2 = [];
    var user = await User.findAll({ where: { is_admin: "false" } });
    for (i = 0; i < user.length; i++) {
        a2.push(user[i].email);
    }
    console.log(a2);
    var sub=`Timesheet for week ${range} is overdue`
    var msg="I hope this message finds you well.This is a friendly reminder that your timesheet for the current period is overdue. Timely submission of your timesheet is crucial for accurate payroll processing and project management.We kindly request that you submit your timesheet as soon as possible."
    var html=`<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 16px;">Dear Employee,</p>
        <p style="font-size: 16px;">I hope this message finds you well.</p>
        <p style="font-size: 16px;">This is a friendly reminder that your timesheet for the current period is overdue. Timely submission of your timesheet is crucial for accurate payroll processing and project management.</p>
        <p style="font-size: 16px;">We kindly request that you submit your timesheet as soon as possible.</p>
        <p style="font-size: 16px;">Best regards,</p>
        <p style="font-size: 16px;">Admin</p>
    </div>
    </body>`
    sendbulkmail(a2,sub,msg,html);
    
  }


  // var g=a2.filter(d=>a1.indexOf(d)===-1)
  // console.log(g)

  // let date = new Date();
  // let seconds = date.getSeconds();
  // let minutes = date.getMinutes();
  // let hours = date.getHours();
  // const formattedTime = date.toLocaleTimeString('en-US');
  // console.log(date.getDay(),hours,minutes,seconds,formattedTime)
  schedule.scheduleJob("25 23 * * 4", () => {
    warning();
    console.log("Warning Mail");
  });
  schedule.scheduleJob("45 18 * * 5", () => {
    // "30 18 * * 5" time -- 18:45  date -- friday(5)
    defaultuser();
    console.log("Deadline Expired ");
  });

  schedule.scheduleJob("30 18 * * 4", async () => {
    console.log("Trial");
  });
});
