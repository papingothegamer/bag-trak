const User = require('../models/User');

const updateFCMToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fcmToken },
      { new: true }
    );

    res.json({ 
      success: true, 
      message: 'FCM token updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating FCM token',
      error: error.message 
    });
  }
};

module.exports = {
  updateFCMToken
};