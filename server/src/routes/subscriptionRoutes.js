import express from 'express';
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionStats,
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getSubscriptions).post(protect, createSubscription);
router.get('/stats', protect, getSubscriptionStats);
router
  .route('/:id')
  .put(protect, updateSubscription)
  .delete(protect, deleteSubscription);

export default router;
