const express=require('express');
const router=express.Router();

//requiring the controller
const questionController=require('../controllers/questionController');
const optionController=require('../controllers/optionController');

//calling the specific action of the controller according to the routes
router.post('/create',questionController.create);
router.get('/:id',questionController.showAllQuestions);
router.delete('/:id/delete',questionController.deleteQuestion);
router.post('/:id/options/create',optionController.create);

module.exports=router;