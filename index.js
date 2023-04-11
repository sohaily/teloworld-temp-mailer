var nodemailer = require("nodemailer");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const np = require("path");
const dotenv = require("dotenv").config();
const app = express();
const serverless = require('serverless-http');
// var firebaseConfig= require("./config/firebaseConfig")

const admin = require('firebase-admin');
var serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "telo-35b09.appspot.com"
  });
  const db = admin.firestore();

const checkout = require('./controller/checkoutRouter');
const profile = require('./controller/profileRouter');
const fileManagement = require('./controller/fileManagementRouter');
const cities = require('./controller/citiesRouter');
const productsSpecs = require('./controller/productManagementRouter');
const usersManagement = require('./controller/userManagementRouter');





app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(checkout);
app.use(profile);
app.use(fileManagement);
app.use(cities);
app.use(productsSpecs);
app.use(usersManagement);
app.use(express.static("public"));

var orderNo;
var to;
var fname;
var lname;
var email;
var phone;
var message;
var path;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, np.join(__dirname, "/images"));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image");

app.get("/sendemail", function (req, res) {
  res.end("sendemail");
});

app.post("/sendemail", function (req, res) {
  const salesTeamEmail = "a.eid@ucc.ltd";
  //upload(req, res, function (err) {
   // if (err) {
     // return res.end("Error uploading file.");
  //  } else {
    
      to = req.query.to;
      from = req.query.from;
      redirect = req.query.redirect;
      fname = req.body.fname;
      lname = req.body.lname;
      email = req.body.email;
      phone = req.body.phone;
      message = req.body.message;
      path = req.file?.path ? req.file.path :"",// "https://assets.materialup.com/uploads/77a5d214-0a8a-4444-a523-db0c4e97b9c0/preview.jpg";
      orderNo=req.body.orderId;

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "telomailer@gmail.com",//process.env.AUTH_EMAIL,
          pass: "jocyhkohmfsmbleu",//process.env.AUTH_PASS,
        }
      });
      var mailOptions = {
        from: "telomailer@gmail.com",
        to:salesTeamEmail,// to,
        subject: `telo world product order`,
        contentType: "text/html",
        text:
          "name : " +
          fname +
          " " +
          lname +
          "\n" +
          "email :" +email +
          "\n" +
          "phone : " +
          phone +
          "\n" +
          "message : Item purchased " +
          //message +
          "\n",
        // attachments: [
        //   {
        //     path: path,
        //   },
        // ],
        html:`<html>
        <head>
           <style type=3D&quot;text/css&quot;></style>
        </head>
        <body style="background: black;">
           <div>
              <p>
              <div  style="background-color: #df8ac6;">
              <h4 style="padding: 20px;font-size: 2rem;color:white;">Thank you for your order</h4>
         </div>
         <div style="padding:10px;">
             <p  style="color:white;">Your order has been received and is now being processed.Your order detail are <br> shown below for your reference:</p>
       </div>
                 <br/>
    <h3 style="color: red;">Order #${orderNo}(${new Date()})</h3>
                 <br/>
              <table style="border:1px solid white;font-family: arial, sans-serif; border-collapse: collapse; width: 100%;">
                 <tr style=" border-bottom: 1px solid white;">
                 <th style="padding: 10px;color:white;">Product</th>
                 <th style="border-left: 1px solid white;padding: 10px;color:white;">Quantity</th>
                 <th style="border-left: 1px solid white;padding: 10px;color:white;">Price</th>
                 <th style="border-left: 1px solid white;padding: 10px;color:white;">Total</th>
                 <th style="border-left: 1px solid white;padding: 10px;color:white;">Payment Method</th>
                 </tr>
                 ${message}
              </table>
              <br/>
              <br/>
              <p style="color: white;">For more information please kindly visit our website www.teloworld.com<br/>
              or call 8001244407
              </p>
           </div>
        </body>
     </html>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error , " ERROR");
        }
         else {
          console.log("Email sent: " + info.response);
          // if (path !== "https://assets.materialup.com/uploads/77a5d214-0a8a-4444-a523-db0c4e97b9c0/preview.jpg") {
          //   fs.unlink(path, function (err) {
          //     if (err) {
          //       return res.end(err);
          //     } else {
          //       console.log("File deleted successfully!");
          //       return res.redirect(redirect);
          //     }
          //   });
          // }
          // else{
          //   console.log("File deleted successfully!");
          //   return res.redirect(redirect);
          // }
          res.send("Email send successfully:")
        }
      });
    
  });
//});
app.listen(8000) 
// module.exports = app;
// module.exports.handler = serverless(app);
// app.listen(8000, () => {
//   console.log("Server started on port http://localhost:" + process.env.PORT);
// });