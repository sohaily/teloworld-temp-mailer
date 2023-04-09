const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');

  const db = admin.firestore();

app.post('/api/create-cities',async (req,res)=>{
  try {
    //console.log(req.body)
     const response = await db.collection(req.body.id).doc(req.body.id).set(req.body);
    res.send(response);
} catch (error) {
    res.send(error);
}
});

app.get('/api/getcities',async (req,res)=>{
  try {
  const userRef = db.collection(constants.saudiaCities);
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
  
module.exports = app;