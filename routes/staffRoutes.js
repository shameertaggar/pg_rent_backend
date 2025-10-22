// routes/staffRoutes.js

const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const staffController = require('../controllers/staffController');

router.post('/', authenticateJWT, staffController.createStaff);
router.get('/', authenticateJWT, staffController.getAllStaff);
router.get('/:id', authenticateJWT, staffController.getStaffById);
router.put('/:id', authenticateJWT, staffController.updateStaff);
router.delete('/:id', authenticateJWT, staffController.deleteStaff);

module.exports = router;
