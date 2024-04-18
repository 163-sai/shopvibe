const express = require('express');
const router = express.Router();
const userController = require('../../controllers/login/userController');

// Register endpoint
router.post('/register', userController.registerUser);

// Login endpoint
router.post('/login', userController.loginUser);

//Logout endpoint
router.post('/logout', userController.logoutUser);

// Profile endpoint
router.get('/profile', userController.getUserProfile);

//Track Order
router.get('/api/orders/:orderId', userController.trackorder);

module.exports = router;



{/*
const express = require('express');
const router = express.Router();


// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

*/}