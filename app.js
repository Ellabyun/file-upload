const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
//정적경로 설정시, 실제 경로에서 /images 경로가 생략되므로 prefix로 추가
app.use('/images', express.static('images'));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
