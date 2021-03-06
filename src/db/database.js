const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

module.exports = mongoose.connect(db,
    {useNewUrlParser:true,useUnifiedTopology: true})
        .then(()=>{
            console.log('connected to db')
        }
    )