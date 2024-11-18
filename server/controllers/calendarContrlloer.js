const { google } = require('googleapis');
const User = require('../models/user');

// In-memory storage for events (for simplicity)
let eventsStore = {};

exports.createEvent = async (req, res) => {
  const { userId, event } = req.body;
 
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

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
        attendees: [
          { email: user.email }, 
        ],
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

    res.json({ success: true, event: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Event Creation Failed', details: error.message });
  }
};




exports.getEvents = async (req, res) => {
  const { userId } = req.params;  // Assuming userId is passed in the URL
  
  try {
    // const events = await Event.find({ userId });  // Fetch events for the user from the DB
    // if (!events) return res.status(404).json({ error: 'No events found' });
    
    // const userEvents = eventsStore[userId];
  
    // if (!userEvents) {
    //     return res.status(404).json({ error: 'No events found for this user' });
    // }

    const userEvents = eventsStore[userId] || []; // Return an empty array if no events exist


    res.json({ success: true, userEvents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};




exports.listEvents = async (auth) => {
  const calendarClient = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendarClient.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;

    if (events.length) {
      console.log('Upcoming events:');
      events.forEach((event) => {
        console.log(`${event.summary} (${event.start.dateTime || event.start.date})`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  } catch (error) {
    console.error('Error listing events:', error);
    throw new Error('Failed to fetch events from Google Calendar');
  }
};
