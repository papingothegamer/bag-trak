const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { sendBagStatusNotification } = require('../services/notificationService');

router.post('/test-notification', protect, async (req, res) => {
  try {
    const result = await sendBagStatusNotification(
      req.user._id,
      'test-status',
      'Test Location',
      'test-bag-id'
    );
    res.json({ 
      success: true, 
      message: 'Test notification sent',
      result 
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
