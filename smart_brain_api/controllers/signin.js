
const handlerSignin = (req, res, db, bcrypt)=>{
  if(!req.body.email || !req.body.password){
    return res.status(400).json('incorrect form submit')
  }
  db.select('email','hash').from('login')
    .where('email', '=', req.body.email)
    .then(data=>{
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if(isValid){
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user=>{
            res.json(user[0])
          })
          .catch(err=>res.status(400).json('user not found'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(er=>res.status(400).json('wrong credentials'))
}



module.exports={
  handlerSignin: handlerSignin
}
