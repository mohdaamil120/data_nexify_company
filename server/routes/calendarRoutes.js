
const express = require('express');
const { createEvent, getEvents, listEvents } = require('../controllers/calendarContrlloer');
const router = express.Router();

router.get('/events/:userId', getEvents);
router.get('/events', listEvents);
router.post('/create-event', createEvent);

module.exports = router;
