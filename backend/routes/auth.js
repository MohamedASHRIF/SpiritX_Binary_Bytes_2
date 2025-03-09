const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');




// Helper function for password validation
const validatePassword = (password) => {
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexSpecialChar = /[\d\W]/;
  return regexLowercase.test(password) && regexUppercase.test(password) && regexSpecialChar.test(password);
};

// Signup route
router.post('/signup', async (req, res) => {
  const { role = "customer",username, password, confirmPassword } = req.body;

  // Validate if all fields are provided
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Check password strength
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.' });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    // Hash password before saving it to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: 'Signup successful! Please login.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/check-username', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ isUnique: false });
    }
    return res.json({ isUnique: true });
  } catch (err) {
    return res.status(500).json({ message: "Error checking username." });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this username. Please sign up first..' });
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered password:", password);
console.log("Hashed password from DB:", user.password);
console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,        // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production',  // Only use HTTPS in production
      sameSite: 'Strict',    // Strict cookie policy for CSRF protection
      maxAge: 3600000,       // 1 hour expiration time
    });
    console.log(token);


     // Return success with user role
     res.status(200).json({
      success: true,
      token,
      message: 'Login successful!',
      role: user.role || 'customer', // Send user role, default to 'customer' if not available
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
});

// Admin route to manage users or other admin-only data
router.get('/admin-dashboard', verifyAdmin, async (req, res) => {
  try {
    // Admin-specific functionality
    res.json({ message: 'Welcome to the admin dashboard!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
