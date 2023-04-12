const { 
    firebase,
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
 } = require("firebase/auth");

 const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');
  const db = admin.firestore();
  const auth = getAuth();
 app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
       createUserWithEmailAndPassword(auth,email, password)
      .then(function(userCredential){
        const user = userCredential.user;
        if(user && user.emailVerified === false){
           sendEmailVerification(user).then(()=>{
                console.log(user)
            console.log("email verification sent to user");
            res.status(201).json("email verification sent to user");
          });
        }
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.log(errorCode, errorMessage);
      });
    //  await sendEmailVerification();
    //   res.status(201).json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });
  
  app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await signInWithEmailAndPassword(auth,email, password);
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });
  module.exports = app;
  