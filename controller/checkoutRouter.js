const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');

  const db = admin.firestore();
  
app.get('/api/order/checkout',async (req,res)=>{
  try {
  const userRef = db.collection(constants.orderManagement);
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
app.post('/api/order/create-checkout',async (req,res)=>{
  try {
    console.log(req.body)
    const id = req.body.id;
    const jsonObj ={
      cartItems:req.body.cartItems,
      totalPrice:req.body.totalPrice,
      subtotalPrice:req.body.subtotalPrice,
      totalQty:req.body.totalQty,
      city:req.body.city,
      cityId:req.body.cityId,
      address:req.body.address,
      phone:req.body.phone,
      email:req.body.email,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      state:req.body.state,
      postCode:req.body.postCode,
      orderId:req.body.orderId,
      orderRefId:req.body.orderRefId          
    }
    const response = await db.collection(constants.orderManagement).add(jsonObj);
    res.send(response);
} catch (error) {
    res.send(error);
}

});

  
module.exports = app;