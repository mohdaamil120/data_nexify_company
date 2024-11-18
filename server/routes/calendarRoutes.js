const express = require('express');
const { createEvent, getEvents, listEvents } = require('../controllers/calendarContrlloer');
const router = express.Router();


// Endpoint to get events for a specific user
router.get('/events/:userId', getEvents);


// Route for Listing Events
router.get('/events', async (req, res) => {
    try {
      const auth = "Auth"|| 'YOUR_AUTH_TOKEN'; // Replace with valid OAuth token or retrieve from session
      console.log("auth",auth)
      if (!auth) {
        return res.status(401).send('Unauthorized: Missing auth token');
      }
  
      await listEvents(auth); // Call the function to list events
  
      res.status(200).send('Events listed in console');
    } catch (err) {
      res.status(500).send('Error listing events: ' + err.message);
    }
  });


// Endpoint to create an event for a user
router.post('/create-event', createEvent);




module.exports = router;

