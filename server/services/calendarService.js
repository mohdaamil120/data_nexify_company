const { google } = require('googleapis');
const User = require('../models/user');

let eventsStore = {}; 

exports.createEvent = async (userId, event) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: event.summary,
      description: event.description,
      start: event.start,
      end: event.end,
      attendees: [{ email: user.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 10 },
          { method: 'popup', minutes: 5 },
        ],
      },
    },
  });

  if (!eventsStore[userId]) {
    eventsStore[userId] = [];
  }

  eventsStore[userId].push(event);

  return response.data;
};

exports.getEvents = async (userId) => {
  const userEvents = eventsStore[userId] || [];
  return userEvents;
};

exports.listEvents = async (auth) => {
  const calendarClient = google.calendar({ version: 'v3', auth });

  const response = await calendarClient.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return response.data.items;
};
