const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const database ={
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Anna',
      email: 'anna@gmail.com',
      password: 'apples',
      entries: 0,
      joined: new Date()
    }

  ]
}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res)=>{
  res.json(database.users)
})

app.post('/signin',(req, res)=>{
  if(req.body.email === database.users[0].email &&
     req.body.password === database.users[0].password){
       res.json(database.users[0])
     } else {
       res.status(404).json('user not found')
     }
})


app.post('/register',(req, res)=>{
  database.users.push({
    id: '125',
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req, res)=>{
  database.users.map(user=>{
    if(user.id === req.params.id){
      return res.json(user)
    }
  })
})

app.put('/image', (req, res)=>{
  database.users.map(user=>{
    if(user.id === req.body.id){
      user.entries++
      return res.json(user.entries)
    }
  })
})



app.listen(3000,()=>{
  console.log('app listening on port 3000')
})
