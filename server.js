const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("welcome to our website!")
})

app.listen(port, () => {
    console.log(`Server is running at Port no: ${port}`);
});