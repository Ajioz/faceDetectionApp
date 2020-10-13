const handleRegister = (req, res, db, bcrypt) => {
    
    const{ name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);

    if(!name || !email || !password){
        return res.status(400).json('Bad Submission');
    }

    db.transaction(trx => {
        return trx('login').returning('*').insert({
            hash, email
        }).returning('email')
        .then(loginEmail => {
            return trx('users').returning('*').insert({
             email: loginEmail[0],
             name: name, 
             joined: new Date()
         }).then(user =>  res.json(user[0]))
       }).then(trx.commit).catch(trx.rollback)
     }).catch(err => res.status(400).json('User Already Exist'))
 }

 module.exports = {
     handleRegister
 }