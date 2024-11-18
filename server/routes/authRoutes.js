const express = require('express');
const { getAuthUrl, googleCallback } = require('../controllers/authController');
const router = express.Router();

router.get('/google-url', getAuthUrl);
router.get('/google-callback', googleCallback);

module.exports = router;
