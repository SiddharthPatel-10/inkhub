const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, {password:0});
    console.log(users);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};