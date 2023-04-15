const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');

  const db = admin.firestore();

app.post('/api/create-products',async (req,res)=>{
  try {
    //db.collection(constants.productSpecs).doc(constants.productSpecs).collection(constants.productSpecs).doc(constants.productSpecs).delete();
    await db.collection(constants.productSpecs).doc(constants.productSpecs).delete()
    
    //const ref = db.collection(constants.productSpecs).doc(documentId)
    //await db.recursiveDelete(ref) 
    const response = await db.collection(constants.productSpecs).doc(req.body.id).set(req.body);
    res.send(response);
} catch (error) {
    res.send(error);
}
});

app.get('/api/getproducts',async (req,res)=>{
  try {
    console.log("token",req.header('authorization'))
   const token = req.header('authorization');
    // admin.auth().verifyIdToken(token).then(decodedIdToken => {
    //   console.log('ID Token correctly decoded', decodedIdToken);
    //   admin.auth().getUser(decodedIdToken.uid).then((userRecord) => {
    //    return resolve(userRecord);
    //   }).catch(error => {
    //    console.error('Error while getting Firebase User record:', error);
    //    return reject({code: 403, error: 'Unauthorized'});
    //   });
    //  }).catch(error => {
    //   console.error('Error while verifying Firebase ID token:', error);
    //   return reject({code: 403, error: 'Unauthorized'});
    //  });


   
  const userRef = db.collection(constants.productSpecs);
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