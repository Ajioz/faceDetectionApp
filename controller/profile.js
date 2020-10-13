const handleProfile = (req, res, db) => {

const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user=>{
        user.length ? res.json(user[0]) : res.status(404).json('No such User');
    }).catch(err=>  res.status(404).json('Error Getting User'))       //Return 404 if not existing
}

module.exports = {
    handleProfile
}