const Bag = require('../models/Bag');
const { emitBagUpdate, emitLocationUpdate } = require('../services/socketService');
const { sendPushNotification, sendBagStatusNotification } = require('../services/notificationService');

// Add a new bag
const addBag = async (req, res) => {
  try {
    const {
      airline,
      flightNumber,
      bagTag,
      origin,
      destination,
      estimatedArrival
    } = req.body;

    const bag = await Bag.create({
      userId: req.user._id,
      airline,
      flightNumber,
      bagTag,
      origin,
      destination,
      estimatedArrival,
      trackingHistory: [{
        status: 'checked-in',
        location: origin
      }]
    });

    res.status(201).json(bag);
  } catch (error) {
    res.status(500).json({ message: 'Error adding bag', error: error.message });
  }
};

// Get all active bags for user
const getActiveBags = async (req, res) => {
  try {
    const bags = await Bag.find({ 
      userId: req.user._id,
      isActive: true 
    }).sort({ checkInTime: -1 });
    
    res.json(bags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bags', error: error.message });
  }
};

// Get bag history
const getBagHistory = async (req, res) => {
  try {
    const bags = await Bag.find({ 
      userId: req.user._id,
      isActive: false 
    }).sort({ checkInTime: -1 });
    
    res.json(bags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bag history', error: error.message });
  }
};

// Update bag status
const updateBagStatus = async (req, res) => {
  try {
    const { bagId } = req.params;
    const { status, location } = req.body;

    const bag = await Bag.findOne({ 
      _id: bagId,
      userId: req.user._id 
    });

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    bag.status = status;
    bag.trackingHistory.push({
      status,
      location,
      timestamp: new Date()
    });

    if (status === 'claimed') {
      bag.isActive = false;
    }

    await bag.save();

    // Send both socket update and notification
    if (req.io) {
      req.io.to(`user_${req.user._id}`).emit('bagStatusChanged', {
        bagId: bag._id,
        status,
        location,
        timestamp: new Date()
      });
    }

    // Send push notification
    try {
      await sendBagStatusNotification(
        req.user._id,
        status,
        location,
        bag._id
      );
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Continue even if notification fails
    }

    res.json(bag);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Error updating bag status', error: error.message });
  }
};

// Get single bag details
const getBagDetails = async (req, res) => {
  try {
    const bag = await Bag.findOne({
      _id: req.params.bagId,
      userId: req.user._id
    });

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    res.json(bag);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bag details', error: error.message });
  }
};

// Add location update function
const updateBagLocation = async (req, res) => {
  try {
    const { bagId } = req.params;
    const { latitude, longitude, locationName } = req.body;

    const bag = await Bag.findOne({
      _id: bagId,
      userId: req.user._id
    });

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    bag.lastKnownLocation = {
      latitude,
      longitude,
      timestamp: new Date()
    };

    await bag.save();

    // Emit location update
    emitLocationUpdate(req.app.get('io'), req.user._id, bagId, {
      latitude,
      longitude,
      locationName,
      timestamp: new Date()
    });

    res.json(bag);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error: error.message });
  }
};

module.exports = {
  addBag,
  getActiveBags,
  getBagHistory,
  updateBagStatus,
  getBagDetails,
  updateBagLocation
};