const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'd3v@nerd',
    database: 'test',
  },
});

let initialPath = path.join(__dirname, 'public');
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(initialPath, 'register.html'));
});

app.post('/register-user', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json('Fill all the fields');
  } else {
    db('users')
      .insert({
        name: name,
        email: email,
        password: password,
      })
      .returning(['name', 'email'])
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        if (err.detail.includes('already exists')) {
          res.json('Email already exists');
        } else {
          res.status(500).json('Error registering user');
        }
      });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json('Email and password are required');
    return;
  }

  db.select('name', 'email')
    .from('users')
    .where({
      email: email,
      password: password,
    })
    .then((data) => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.json('Email or password is incorrect');
      }
    })
    .catch((err) => {
      res.status(500).json('Error logging in');
    });
});

app.listen(5500, () => {
  console.log('Listening on port 5500...');
});
