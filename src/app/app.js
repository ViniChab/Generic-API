const express = require('express');
const router = require('./http/users.js');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
app.use(router);
app.use(express.static('src/pages'));
app.use(favicon('src/pages/assets/favicon.ico'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages', 'main.html'));
});

app.listen(4100, () => {
  console.log('API restarted');
});
