const express=require('express');
const router=express.Router();

//requiring the controller
const optionController = require('../controllers/optionController');

//calling the specific action of the controller according to the routes
router.delete('/:id/delete',optionController.deleteOption);
router.put('/:id/add_vote',optionController.addVote);


module.exports=router;