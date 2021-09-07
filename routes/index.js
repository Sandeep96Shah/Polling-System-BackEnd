const express=require('express');

const router=express.Router();

//middleware for the questions related routes
router.use('/questions',require('./question'));

//middleware for the options related routes
router.use('/options',require('./option'));

router.get('/', (req,res) => {
    return res.send('<h1>Welcome To Polling System!</h1>')
})

module.exports=router;