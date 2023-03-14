const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'images');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get('/', async function(req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', { users: users });
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function(req,res){
  //multer 사용할 라우터, 특정 라우터에만 적용되는 미들웨어 사용 예!
  const uploadedImageFile = req.file;
  const userData = req.body;

  const result = await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path
  })
  console.log(result);

  res.redirect('/');
})

module.exports = router;