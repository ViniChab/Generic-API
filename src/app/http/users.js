const express = require('express');
const router = express.Router();
const knexConfig = require('../config/knex-config.js');
const morgan = require('morgan');

router.use(morgan('short'));
router.use(express.json());

router.get('/users', (req, res) => {
  /* Default GET for a 'users' table */
  const knex = require('knex')(knexConfig);
  knex
    .from('users')
    .select('*')
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    })
    .finally(() => {
      knex.destroy();
      res.end();
    });
});

router.get('/user/:id', (req, res) => {
  /* Default GET by ID for a 'users' table */
  knex = require('knex')(knexConfig);
  knex
    .from('users')
    .select('*')
    .where('id', '=', req.params.id)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    })
    .finally(() => {
      knex.destroy();
      res.end();
    });
});

router.post('/user_create', (req, res) => {
  /* Default POST for a 'users' table */
  knex = require('knex')(knexConfig);
  knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    })
    .then((data) => {
      res.json({ success: true, message: 'ok' });
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    })
    .finally(() => {
      knex.destroy();
      res.end();
    });
});

router.delete('/user_delete/:id', (req, res) => {
  /* Default DELETE for a 'users' table */
  knex = require('knex')(knexConfig);
  knex('users')
    .del()
    .where('id', '=', req.params.id)
    .then((data) => {
      res.json({ success: true, message: 'ok' });
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    })
    .finally(() => {
      knex.destroy();
      res.end();
    });
});

router.put('/update_user/:id', (req, res) => {
  /* Default PUT for a 'users' table */
  /* Here, if no ID is found in the database, an error is returned */
  knex = require('knex')(knexConfig);
  knex
    .select('*')
    .from('users')
    .where('id', '=', req.params.id)
    .then((data) => {
      if (!data.length)
        return res.json({
          success: false,
          message: 'The selected ID does not exist',
        });
      knex('users')
        .update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        })
        .where('id', '=', req.params.id)
        .then((data) => {
          res.json({ success: true, message: 'ok' });
          res.end();
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
          res.end();
        })
        .finally(() => {
          knex.destroy();
          res.end();
        });
    });
});

module.exports = router;
