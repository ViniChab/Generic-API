const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'generic-schema',
  },
});

const app = express();
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
  knex
    .from('users')
    .select('*')
    .where('id', '=', req.params.id)
    .then((rows) => {
      console.log(rows);
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
});

app.listen(1600, () => {
  console.log('API started');
});
