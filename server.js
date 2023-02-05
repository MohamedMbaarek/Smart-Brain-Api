const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require('./controllers/image');
const profile = require("./controllers/profile");


const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cfe3hmen6mpu0uaq318g-a',
      port : 5432,
      user : 'smart_brain_database_f1p1_user',
      password : 'uFOggKlm9xFIz2mNjTueioduicIDFvmM',
      database : 'smart_brain_database_f1p1'
    }
  });

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)}) 
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleAPIcall(req,res)})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
