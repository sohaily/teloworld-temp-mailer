const { Router } = require('express');
var constants = require('../config/constants');
const app = Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const uuid = require('uuid-v4');
const firebsae = require("firebase/app");
const { getStorage, ref, uploadBytes,getDownloadURL,listAll  } = require("firebase/storage");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const memoStorage = multer.memoryStorage();
 const upload = multer({ storage:multer.memoStorage });


const admin = require('firebase-admin');
var bucket = admin.storage().bucket();

const firebaseConfig = {
    apiKey: "AIzaSyCX-hTfiVBTsVotB1zc2_waJ8sCLNaMNpk",
    authDomain: "telo-35b09.firebaseapp.com",
    databaseURL: "https://telo-35b09-default-rtdb.firebaseio.com",
    projectId: "telo-35b09",
    storageBucket: "telo-35b09.appspot.com",
    messagingSenderId: "489798828879",
    appId: "1:489798828879:web:53602b62e7adb2ffe33b3a"
  };
  

  firebsae.initializeApp(firebaseConfig);

  const storage = getStorage();

app.post("/api/file/save-file",upload.single("filename"),async(req,res)=>{    
    const storageRef = ref(storage, `files/${req.file.originalname}`);
    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
      res.send(snapshot.ref)
    });
});

// app.get('/picture/:id', async (req, res) => {
//     getDownloadURL(ref(storage, `files/`+req.params.id))
//     .then((downloadURL) => {
//         res.send(downloadURL);
//     });
//   });
app.post('/picture/:id', async (req, res) => {
    getDownloadURL(ref(storage, req.body.folderName+`/`+req.params.id))
    .then((downloadURL) => {
        res.send(downloadURL);
    });
  });
  app.get('/root_picture/:id', async (req, res) => {
    getDownloadURL(ref(storage, `/`+req.params.id))
    .then((downloadURL) => {
        res.send(downloadURL);
    });
  });
  app.post('/videos/:id', async (req, res) => {
    getDownloadURL(ref(storage, req.body.folderName+`/`+req.params.id))
    .then((downloadURL) => {
        res.send(downloadURL);
    });
  });

app.get('/api/file/getImages',async (req,res)=>{
  try {
  
  res.send("file store is working");
} catch (error) {
    res.send(error);
}
});



  
module.exports = app;