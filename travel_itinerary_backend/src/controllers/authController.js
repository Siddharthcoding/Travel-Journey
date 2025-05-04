import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your_default_jwt_secret', {
    expiresIn: '7d'
  });
};

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user data (excluding password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user data
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
}; 


// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.id;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    await user.save();
    
    // Return updated user data (excluding password)
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Error changing password' });
  }
};

// Update notification preferences
export const updateNotifications = async (req, res) => {
  try {
    const { preferences } = req.body;
    const userId = req.user.id;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update notification preferences
    user.notificationPreferences = preferences;
    await user.save();
    
    res.json({
      message: 'Notification preferences updated successfully',
      preferences: user.notificationPreferences
    });
  } catch (err) {
    console.error('Update notifications error:', err);
    res.status(500).json({ message: 'Error updating notification preferences' });
  }
};

// Update payment method
export const updatePaymentMethod = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const userId = req.user.id;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // For this example, we'll just acknowledge the request
    res.json({
      message: 'Payment method updated successfully'
    });
  } catch (err) {
    console.error('Update payment method error:', err);
    res.status(500).json({ message: 'Error updating payment method' });
  }
};
