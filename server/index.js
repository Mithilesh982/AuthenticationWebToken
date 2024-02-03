const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const Connection = require("./Database/Connection.js");
const userData = require("./Schema/UserData.js");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));

const PORT = 4001;
Connection();

  app.post("/UserRegistration", async (req, res) => {
    try {
      const userMail = req.body.userMail;
      const userPassword = req.body.userPassword;
      const userDOB = req.body.userDOB;
      const userName = req.body.userName;
  
      const newUser = new userData({
        name: userName,
        DOB: userDOB,
        email: userMail,
        password: userPassword,
      });
  0
      await newUser.save();
  
      console.log("Data saved successfully");
      
      // Respond with a success message
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      
      // Respond with an error message
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  

  app.post("/authentication", async (req, res) => {
    const mail= req.body.mail
    const password = req.body.password
    try {

        let user= userData.findOne({mail:mail,password:password})
      if (user) {
        // Generate a token upon successful authentication
        const token = jwt.sign({ userId: user._id }, "mithilesh", { expiresIn: "1h" });
  
        // Send the token in the response
        res.status(200).json({ message: "Authentication successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.get('/allUsers', async (req, res) => {
    try {
      // Check for the presence and validity of the token
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please login first." });
      }
  
      jwt.verify(token, "mithilesh", (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token. Please login first." });
        }
  
        // Token is valid, proceed to fetch and send data
        const userList =  userData.find().lean();
        res.status(200).json(userList);
      });
    } catch (error) {
      console.error("Error during data retrieval:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
// const data = new userData({
//     name:"mack",
//     DOB :"10/20/20",
//     email:"hbkbxbdxhksd@gmail.com",
//     password:"heooll"
// })

// data.save().then((res)=>{
//     console.log("info saved ", res)
// }).catch((err)=>{
//     console.log("error occoured", err)
// })

// console.log(userData.find().lean())
app.listen(PORT, () => {
  console.log(`Server running good on : ${PORT}`);
});
