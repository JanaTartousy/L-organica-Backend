import User from '../models/userModel.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, image } = req.body;

  try {
    const user = await User.create({ username, email, password, image });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, image } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, password, image },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// User registration
export const register = async (req, res) => {
  // Registration logic here
};

// User login
export const login = async (req, res) => {
  
  // Login logic here
};

// User logout
export const logout = async (req, res) => {
  // Logout logic here
};