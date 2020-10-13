const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '68c97fca8e634f099e29942d5e8b24f9'
});

const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    }).catch(err => { res.status(400).json('API not responding')})
}

const handleRank = (req, res, db) => {

    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    }).catch(err=>  res.status(404).json('Unable to get Entry Count'))      
}

module.exports = {
    handleRank,
    handleApiCall
}