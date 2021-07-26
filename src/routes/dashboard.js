const router = require('express').Router()

function isAuthorized(req,res,next){
    if(req.user){
        console.log('user is logged in')
        console.log(req.user)
        next()
    
    }

    else{
        console.log('user is not logged in')
        res.redirect('/')
    }
}


router.get('/',isAuthorized,(req,res)=>{
    console.log(req.user.username)
    res.render('dashboard',{userName :req.user.username})
})


module.exports = router