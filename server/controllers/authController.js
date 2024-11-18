const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const { google } = require('googleapis');
const user = require('../models/user');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // `http://localhost:5173`
  `https://data-nexify.vercel.app`,
);

// Generate Auth URL
exports.getAuthUrl = (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar', 'email', 'profile'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.json({ url });
};



exports.googleCallback = async (req, res) => {
    const { code } = req.query;
    console.log(code)
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
      const { id, email } = userInfo.data;
      console.log("useInfo :" , userInfo)
      console.log("id, email :" , id, email)
      const user = await User.findOneAndUpdate(
        { googleId: id },
        { googleId: id, email, accessToken: tokens.access_token, refreshToken: tokens.refresh_token },
        { upsert: true, new: true }
      );
  
      // Return user details to the frontend
      console.log("user",user)
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error in Google Callback:', error.message);
      res.status(500).json({ error: 'Authentication Failed', details: error.message });
    }
  };
  