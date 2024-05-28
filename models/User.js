// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  // Debugging: Log the password before hashing
  console.log('Password before hashing:', this.password);

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Debugging: Log the password after hashing
  console.log('Password after hashing:', this.password);

  next();
});

module.exports = mongoose.model('User', UserSchema);