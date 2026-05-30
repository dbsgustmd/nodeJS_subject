import Subscription from '../models/Subscription.js';

// @desc    Get all user subscriptions
// @route   GET /api/subscriptions
// @access  Private
const getSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find({ userId: req.user._id });
  res.json(subscriptions);
};

// @desc    Create a new subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = async (req, res) => {
  const { serviceName, price, category, nextBillingDate, autoRenew, isActive } = req.body;

  try {
    const subscription = new Subscription({
      userId: req.user._id,
      serviceName,
      price,
      category,
      nextBillingDate,
      autoRenew,
      isActive,
    });

    const createdSubscription = await subscription.save();
    res.status(201).json(createdSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a subscription
// @route   PUT /api/subscriptions/:id
// @access  Private
const updateSubscription = async (req, res) => {
  const { serviceName, price, category, nextBillingDate, autoRenew, isActive } = req.body;

  try {
    const subscription = await Subscription.findById(req.params.id);

    if (subscription) {
      if (subscription.userId.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'User not authorized' });
        return;
      }

      subscription.serviceName = serviceName || subscription.serviceName;
      subscription.price = price !== undefined ? price : subscription.price;
      subscription.category = category || subscription.category;
      subscription.nextBillingDate = nextBillingDate || subscription.nextBillingDate;
      subscription.autoRenew = autoRenew !== undefined ? autoRenew : subscription.autoRenew;
      subscription.isActive = isActive !== undefined ? isActive : subscription.isActive;

      const updatedSubscription = await subscription.save();
      res.json(updatedSubscription);
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (subscription) {
      if (subscription.userId.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'User not authorized' });
        return;
      }

      await subscription.deleteOne();
      res.json({ message: 'Subscription removed' });
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get subscription statistics
// @route   GET /api/subscriptions/stats
// @access  Private
const getSubscriptionStats = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id, isActive: true });

    const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.price, 0);

    const categoryStats = subscriptions.reduce((acc, sub) => {
      if (!acc[sub.category]) {
        acc[sub.category] = 0;
      }
      acc[sub.category] += sub.price;
      return acc;
    }, {});

    res.json({
      totalMonthly: parseFloat(totalMonthly.toFixed(2)),
      categoryStats,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionStats,
};
