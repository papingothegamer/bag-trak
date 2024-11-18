const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addBag,
  getActiveBags,
  getBagHistory,
  updateBagStatus,
  getBagDetails,
  updateBagLocation
} = require('../controllers/bagController');

// Verify imports
console.log('Route handlers:', { addBag, getActiveBags, getBagHistory, updateBagStatus, getBagDetails, updateBagLocation });

// All routes are protected
router.use(protect);

// Define routes with explicit middleware array
router.post('/', [protect], addBag);
router.get('/active', protect, async (req, res) => {
  try {
    console.log('Fetching active bags for user:', req.user._id);
    const bags = await Bag.find({ 
      userId: req.user._id,
      isActive: true 
    });
    console.log('Found bags:', bags);
    res.json(bags);
  } catch (error) {
    console.error('Error fetching active bags:', error);
    res.status(500).json({ 
      message: 'Error fetching active bags',
      error: error.message 
    });
  }
});
router.get('/history', [protect], getBagHistory);
router.get('/:bagId', [protect], getBagDetails);
router.put('/:bagId/status', [protect], updateBagStatus);
router.put('/:bagId/location', protect, updateBagLocation);

module.exports = router;