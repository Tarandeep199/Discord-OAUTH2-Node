require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const path = require('path')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001;
const discordStrategy =require('./strategies/discordstrategy')

const db = require('./db/database')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


//Routes
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret:'randomSecret',
    cookie:{
        maxAge:60000*60*24
    },
    saveUninitialized:false,
    resave:false,   
    name:'discord.oauth2',
    store: new MongoStore({mongooseConnection:mongoose.connection})
}))
 

//passport
app.use(passport.initialize())
app.use(passport.session())


//Middleware
app.use('/auth',authRoute)
app.use('/dashboard',dashboardRoute)



app.get('/',isAuthorized,(req,res)=>{
    res.render('home')
})

function isAuthorized(req,res,next){
    if(req.user){
        console.log('user is logged in')
        res.redirect('/dashboard')
    
    }
    else{
        console.log('user is not logged in')
        next()
    }
}





app.listen(PORT,()=>{
    console.log(`Serving on ${PORT}`)
})