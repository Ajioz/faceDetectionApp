const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controller/register');
const signin = require('./controller/signin');
const rank = require('./controller/rank');
const user = require('./controller/users');

const db = knex({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'Ajioz',
        password: 'Onoriode1!',
        database: 'smart_brain'
    }   
});

app.use(bodyParser.json());
app.use(cors());

//Get All users
app.get('/api/users', (req, res) => { user.handleUsers(req, res, db)});

//Signin
app.post('/api/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

//Register
app.post('/api/register', (req, res) => { register.handleRegister (req, res, db, bcrypt)});

//profile/:userId
app.get('/api/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

//image check rank
app.put('/api/user/rank', (req, res) => { rank.handleRank(req, res, db) });

//image fetch
app.post('/api/user/rankurl', (req, res) => { rank.handleApiCall(req, res) });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));




/*
--> Planning our server, a practise you should get comfortable with <--
/res = to query
/signin             = POST  --> Success/fail
/register           = POST  --> user
/profile/:userId    = GET   --> user
/image/grading      = PUT   --> user

*/

/*
    const database = {
        users:[
            {
                id: 1,
                name: 'John',
                email: 'john@gmail.com',
                password: 'cookies',
                entries: 0,
                joined: new Date()
            }, 
            {
                id: 2,
                name: 'mark',
                email: 'mark@gmail.com',
                password: 'rootie',
                entries: 0,
                joined: new Date()
            }    
        ]
    }
*/