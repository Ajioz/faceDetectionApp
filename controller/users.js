const handleUsers = (req, res, db) => {
    return db.select('*').from('users')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json('Bad Request'))   
}
module.exports = {
    handleUsers
}