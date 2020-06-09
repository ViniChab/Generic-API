const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');

const app = express();
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'generic-schema',
});

app.use(morgan('short'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/users', (req, res) => {
  const users = [
    {
      firstName: 'Vinícius',
      lastName: 'Chab',
    },
    {
      firstName: 'Caroline',
      lastName: 'Raiser',
    },
  ];
  res.json(users);
});

app.get('/user/:id', (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      res.json(rows);
    }
  );
});

app.listen(1600, () => {
  console.log('API started');
});
