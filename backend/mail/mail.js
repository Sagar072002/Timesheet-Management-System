const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const client_id =
  "999945687960-c8cekffue2dekt39mu7tl6rrk6920qkb.apps.googleusercontent.com";
const client_sec = "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";
const redirect_uri = "https://developers.google.com/oauthplayground";
const refresh_token =
  "1//040aew2BFHmAFCgYIARAAGAQSNwF-L9IrnN4eexX-QXhNc-RWlz46OhsrC_KGdmXd8SmxEeFG_6rrtgPfiy4V6vj9F_rx36C1KFE";
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_sec,
  redirect_uri
);
oauth2Client.setCredentials({ refresh_token: refresh_token });

const { User } = require("../db");
const bcrypt = require("bcrypt");

//Access Token :1//04APhpC4WQJ5kCgYIARAAGAQSNwF-L9Ir5ZkwLb6KMnhHLjuv-F2TXn8QbunG7xg2Ly2ZT3rC-G8QoLa9cc9qavhIGUNjM1NFXvs
// Refresh Token :ya29.a0AfB_byC0s7o_Wy0VhcxsMfrD5ZEgF_C_TNzIb6tv9veN-1uHQ5oBP6bLw0Cw9iahqmwvKQpBo5xwy0Imk_0h-gxNNGoLpd3TsZQF2oirdSXX6aztl8CeQNBqjup7P6widTQy9BN34AF6mrJejB0FNCcqjW8twE1B0Ic9aCgYKAVkSARMSFQHGX2MirgNcMTuGaHi9TFfOiBPKcg0171

// const html=`<a href="http://localhost:3001/forgotpass/?key=${}">ClickHere</a>`

async function reset_pass(req, res) {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({ where: { email } });
    user.password = await bcrypt.hash(password, 10);
    user.reset_link = false;
    await user.save();
    res.status(200).json({ update: true });
  } catch (error) {
    res.status(500).json({ error: error.message, update: "false" });
  }
}

async function sendmail(req, res) {
  console.log("hey")
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_sec,
    redirect_uri
    );
    oauth2Client.setCredentials({ refresh_token: refresh_token });
    try {
    console.log("hello")

    const { email } = req.body;
    console.log(req.body);
    console.log("sending....");
    var user = await User.findOne({ where: { email } }).catch(e=>console.log(e));
    if(user==null){
        message="User does not exsist"
        console.log(message)
        return res.status(500).json({message });
    }
    else
    {console.log(user);
    if (user.reset_link) {
      user.reset_link = false;
      await user.save();
    }
    user.reset_link = true;
    await user.save();
    console.log("hell")
    user = await User.findOne({ where: { email } }).catch(e=>console.log(e));
    const duration = user.updatedAt;
    const key = user.password;
    console.log("hell1")
    const access_token = await oauth2Client.getAccessToken();
    console.log(access_token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: "msecsecondyearit@gmail.com",
        clientId: client_id, // Your API key
        clientSecret: client_sec,
        accesstoken: access_token,
        refreshToken: refresh_token,
      },
    });
    const mailopt = {
      from: "msecsecondyearit@gmail.com",
      to: `${email}`,
      subject: "Test mail Gmail",
      text: "Example mail sending testing",
      html: `<a href="http://localhost:3001/forgotpass/?mail=${email}&key=${key}&expiry=${duration}">ClickHere</a>`,
    };

    const info = await transporter.sendMail(mailopt);
    console.log("sent");
    return res.status(200).json({ response: info });}
  } catch (error) {
    console.log(error.message,"error");
    return res.status(500).json({ error: error.message });
  }
}
async function sendbulkmail(g,sub,msg,html) {
  console.log("hey")
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_sec,
    redirect_uri
    );
    oauth2Client.setCredentials({ refresh_token: refresh_token });
    try {
    console.log("hello")

    console.log("sending....");
    
    const access_token = await oauth2Client.getAccessToken();
    console.log(access_token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: "msecsecondyearit@gmail.com",
        clientId: client_id, // Your API key
        clientSecret: client_sec,
        accesstoken: access_token,
        refreshToken: refresh_token,
      },
    });
    const mailopt = {
      from: "msecsecondyearit@gmail.com",
      to: g,
      subject: sub,
      text: msg,
      html:html,
    };

    const info = await transporter.sendMail(mailopt);
    console.log("sent");

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function verifymail(req, res) {
  //console.log("in");
  try {
    const { email, key } = req.body;
    console.log("request", req.body);
    const user = await User.findOne({ where: { email } });
    console.log(user.password, "hell", key);
    if (!user || !(key === user.password)) {
      return res.status(401).json({ error: "Invalid Link" });
    }

    res.status(200).json({ email: user.email, auth: true ,temp:user.twofa});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { sendmail, verifymail, reset_pass, sendbulkmail };

// sendmail().then(e=>console.log("result",e.response)).catch(error=>console.log("error",error))



