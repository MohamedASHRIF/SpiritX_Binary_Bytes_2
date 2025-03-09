const mongoose = require('mongoose');


// User schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure the username is unique
      minLength: [8, 'Username must be at least 8 characters'],
    },
    password: {
      type: String,
      required: true,
     
    },
    role: {
      type: String,
      enum: ['admin', 'customer'], // Only allow 'admin' or 'customer'
      default: 'customer', // Default role is customer
    },
  },
  { timestamps: true }
);

// Compare password for login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
