const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');
const db = admin.firestore();

app.post('/create-profile',async (req,res)=>{
    try {
      console.log(req.body)
      const id = req.body.email;
  const profileJson ={
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phoneNumber:req.body.phone,
    city:req.body.city,
    state:req.body.state,
    postCode:req.body.postCode,
    address:req.body.address,
    paymentMethod:req.body.payment,
    role:"user"
  
  }
  //const response = await db.collection("users-profile")add(userJson); //this is used for add record with unique key
  const response = await db.collection(constants.userProfile).doc(id).set(profileJson);
  res.send(response);
  } catch (error) {
      res.send(error);
  }
  });
  app.post('/create-bulk-profile',async (req,res)=>{
    try {
    //  console.log(req.body)
      req.body.forEach(async element => {
        const profileJson ={
          firstName:element.firstName,
          lastName:element.lastName,
          email:element.email,
          phoneNumber:element.phone,
          city:element.city,
          state:element.state,
          postCode:element.postCode,
          address:element.address,
          paymentMethod:element.payment,
          role:"user"
        
        }
        //const response = await db.collection("users-profile")add(userJson); //this is used for add record with unique key
        const response = await db.collection(constants.userProfile).doc(req.body.email).set(profileJson);
      });
     //  const response = await db.collection(constants.userProfile).add(req.body);
      res.send("save");
  } catch (error) {
      res.send(error);
  }
  });
  // app.post('',async(req,res)=>{
  //   admin.auth().updateUser(uid, { disabled: true })
  // })
  app.get('/read/user-profiles',async (req,res)=>{
    try {
    const userRef = db.collection(constants.userProfile);
    const response = await userRef.get();
    const resArr = [];
    response.forEach(doc =>{
      resArr.push(doc.data())
    });
    res.send(resArr);
  } catch (error) {
      res.send(error);
  }
  });
  app.get('/getbyId/user-profiles/:id',async (req,res)=>{
    try {
    const userRef = db.collection(constants.userProfile).doc(req.params.id);
    const response = await userRef.get();
  
    res.send(response.data());
  } catch (error) {
      res.send(error);
  }
  });
  app.post('/update-profile',async (req,res)=>{
    try {
      const id = req.body.id;
      const newName= "teadfas"
     const userRef = await db.collection(constants.userProfile).doc(id).update({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      phoneNumber:req.body.phone,
      city:req.body.city,
      state:req.body.state,
      postCode:req.body.postCode,
      address:req.body.address,
      paymentMethod:req.body.payment
  
  });
  
  res.send(userRef);
  } catch (error) {
      res.send(error);
  }
  });

  module.exports = app;