// const User = require('../models/User'); // Import User model
// const bcrypt = require('bcryptjs'); // Library for hashing passwords
// const jwt = require('jsonwebtoken'); // Library for generating JWT tokens
// require("dotenv").config();

// // User registration
// exports.register = async (req, res) => {
    
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(400).send('All fields are required');
//         }
//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         // Create new user
//         user = new User({ username, email, password });
//         await user.save();

//         // Create JWT payload
//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // User login
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if user exists
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });``
//         }

//         // Create JWT payload
//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };
