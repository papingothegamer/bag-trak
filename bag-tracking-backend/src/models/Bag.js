const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  flightNumber: {
    type: String,
    required: true
  },
  bagTag: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['checked-in', 'in-transit', 'arrived', 'claimed', 'lost'],
    default: 'checked-in'
  },
  lastKnownLocation: {
    type: {
      latitude: Number,
      longitude: Number,
      timestamp: Date
    },
    required: false
  },
  trackingHistory: [{
    status: String,
    location: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
  estimatedArrival: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Bag', bagSchema);