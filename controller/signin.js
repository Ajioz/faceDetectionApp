const handleSignin = (req, res, db, bcrypt) => {

const { password, email } = req.body; 

if( !email || !password){
    return res.status(400).json('Bad Submission');
}

db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data =>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(!isValid){return res.status(400).json('Wrong Credentials')}
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user =>  res.json(user[0]))
        .catch(err => res.status(400).json('User Doesnt Exist'))  
    }).catch(err => res.status(400).json('Poor Entry Method'))  
}

module.exports = {
    handleSignin
}