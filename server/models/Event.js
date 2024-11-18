
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  googleEventId: { type: String, required: true }, 
  summary: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  attendees: [{ email: String }],
});

module.exports = mongoose.model('Event', eventSchema);
