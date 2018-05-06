

const handleProfile = (req, res, db)=>{
  if()
  db.select('*').from('users')
    .where('id', '=', req.params.id)
    .then(user=>{
      if(user.length){
        return res.json(user[0])
      } else {
        res.status(400).json('user not found')
      }
    })
    .catch(err=>res.status(400).json('can not find the user'))
}


module.exports= {
  handleProfile
}
