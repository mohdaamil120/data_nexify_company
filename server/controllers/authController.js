// const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/user');
// const { google } = require('googleapis');
// const user = require('../models/user');
// const dotenv = require('dotenv');

// dotenv.config();

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   // process.env.REDIRECT_LOCAL_URL,
//   process.env.REDIRECT_URL,
  
// );

// // Generate Auth URL
// exports.getAuthUrl = async(req, res) => {
//   try {
//     const scopes = ['https://www.googleapis.com/auth/calendar', 'email', 'profile'];
//     const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes,
//   });
//   res.status(200).send({ url });  
//   } catch (err) {
//     console.log("Error from message catch: ", err)
//     res.status(401).send({"msg":"erro in getting url"})
//   }
  
// };



// exports.googleCallback = async (req, res) => {
//     const { code } = req.query;
//     // console.log("code from bacekend line 27",code)
//     if (!code) {
//       console.error("Authorization code is missing.");
//       return res.status(400).json({ error: "Authorization code is missing." });
//     }
//     try {

//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
  
//       const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
//       const { id, email } = userInfo.data;

//       // console.log("tokens :" , tokens)
//       // console.log("useInfo :" , userInfo)
//       // console.log("id, email :" , id, email)
//       const user = await User.findOneAndUpdate(
//         { googleId: id },
//         { googleId: id, email, accessToken: tokens.access_token, refreshToken: tokens.refresh_token },
//         { upsert: true, new: true }
//       );
  
//       // Return user details to the frontend
//       // console.log("user",user)
//       res.json({ success: true, user });
//     } catch (error) {
//       console.error('Error in Google Callback:', error.message);
//       res.status(500).json({ error: 'Authentication Failed', details: error.message });
//     }
//   };
  




















const authService = require('../services/authService');

exports.getAuthUrl = async (req, res) => {
  try {
    const url = authService.getAuthUrl();
    res.status(200).send({ url });
  } catch (err) {
    res.status(401).send({ msg: 'Error in getting URL', error: err.message });
  }
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const user = await authService.googleCallback(code);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication Failed', details: error.message });
  }
};
