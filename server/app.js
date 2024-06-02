const express = require("express");
const app = express();
const dotenv = require('dotenv');
const router = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
const connect = require("./config/db")

connect.connect()
dotenv.config();

const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());   //this ERR, when i forgot this line :TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined. 
app.use(cookieParser());

app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.status(200).send("welcome to our website!")
})


app.listen(port, () => {
    console.log(`Server is running at Port no: ${port}`);
});