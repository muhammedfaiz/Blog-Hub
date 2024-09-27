const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const connect = require("./db/config");
const cors = require("cors");

dotenv.config();
connect();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/user",userRoute);
app.use("/api/post",postRoute);



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

