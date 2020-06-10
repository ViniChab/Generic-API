const express = require('express');
const router = require('./http/users.js');

const app = express();
app.use(router);
app.use(express.static('src/pages'));

app.get('/', (req, res) => {
  res.send('Hello world');
});


app.listen(1600, () => {
  console.log('API restarted');
});
