const { google } = require('googleapis');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

exports.getAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/calendar', 'email', 'profile'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  return url;
};

exports.googleCallback = async (code) => {
  if (!code) {
    throw new Error('Authorization code is missing.');
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
  const { id, email } = userInfo.data;

  const user = await User.findOneAndUpdate(
    { googleId: id },
    { googleId: id, email, accessToken: tokens.access_token, refreshToken: tokens.refresh_token },
    { upsert: true, new: true }
  );

  return user;
};
