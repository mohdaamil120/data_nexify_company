const calendarService = require('../services/calendarService');

exports.createEvent = async (req, res) => {
  const { userId, event } = req.body;

  try {
    const createdEvent = await calendarService.createEvent(userId, event);
    res.json({ success: true, event: createdEvent });
  } catch (error) {
    res.status(500).json({ error: 'Event Creation Failed', details: error.message });
  }
};

exports.getEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await calendarService.getEvents(userId);
    res.json({ success: true, userEvents: events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};

exports.listEvents = async (req, res) => {
  try {
    const auth = 'Auth' || 'YOUR_AUTH_TOKEN';
    if (!auth) {
      return res.status(401).send('Unauthorized: Missing auth token');
    }

    const events = await calendarService.listEvents(auth);
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events', details: error.message });
  }
};
