const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/AuthController");

// router.get('/', (req, res) => {
//     res.status(200).send("welcome to our website using routes!")
// })

router.post("/signup", signup);
router.post("/login", login);

// router.route("/").get((req, res) => {
//   res.status(200).send("welcome to our website using routes!");
// });

module.exports = router;
