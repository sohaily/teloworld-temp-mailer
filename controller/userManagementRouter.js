const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('firebase-admin');

  const db = admin.firestore();
 // const allUsers: firebase.auth.UserRecord[] = [];


app.post('/api/create-cities',async (req,res)=>{
  try {
    //console.log(req.body)
     const response = await db.collection(req.body.id).doc(req.body.id).set(req.body);
    res.send(response);
} catch (error) {
    res.send(error);
}
});

app.get('/api/getAllUsers',async (req,res)=>{
    admin.auth().listUsers()
    .then(function(listUsersResult) {
    //   listUsersResult.users.forEach(function(userRecord) {
    //     console.log('user', userRecord.toJSON());
    //   });
      res.send(listUsersResult.users)
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
  });
 
module.exports = app;