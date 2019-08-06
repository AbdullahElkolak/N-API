const Joi = require('joi'); //moudle
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const db = mongoose.connection

app.use(express.json()); //method

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true })
db.on('error', (error) => console.error(error))
db.once('open', () => console.log ('connected to database'))


const users = 
[
  {
    id:1, 
    name: 'john Mike',
    username:'Johnny',
    email:'johnbanthall.com',
    Adress:{
      street:'11/6',
      city:'NewYork',
      zipcode:'12345'
    }
  },

  {
    id:2, 
    name: 'Mike Hardy',
    username:'Miky',
    email:'Mikehardy.com',
    Address:{
      street:'35/29',
      city:'Brooklyn',
      zipcode:'12344'
    }
  },

  {
    id:3, 
    name: 'Chris gary',
    username:'gary',
    email:'Chrisgary.com',
    Address:{
      street:'88/19',
      city:'Los Angelos',
      zipcode:'3344'
    }
  }
];

app.get('/', (req, res) => {
  res.send('RESTful dd');
});

app.get('/api/users/', (req, res) => {
  res.send(...users);
});

app.get('/api/users/:id', (req, res) => { 
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send('The users with the given ID was not found');
  res.send(user);
});

app.post('/api/users', (req, res) => {
  const {error} = validateUser(req.body); // getting result that error
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = {
    id: users.length + 1,
    name: req.body.name,
    username: req.body.username
  };
  users.push(user);
  res.send(users);
});

app.put('/api/users/:id', (req, res) => {
  //Look up thr user
  //if not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send('The users with the given ID was found');
  
  //validate user
  //If invalid, return 400 - bad req
  const {error} = validateUser(req.body); // getting result that error
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  
  user.name = req.body.name;//update user
  res.send(user); //return the update user
});

app.delete('/api/users/:id', (req, res) =>{
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send('The users with the given ID was not found');
  
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return result = Joi.validate(user, schema);
}

port = process.env.PORT || 4000;
  app.listen(port, function () {
 console.log('RESTful API started on'+port)
});

 

