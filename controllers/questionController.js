const Question=require('../model/question');
const Option=require('../model/option');


module.exports.create = async (req,res) => {
    try{
        //creating the question
        let question  = await Question.create({
                title:req.body.title,
                vote:false
            });
        return res.status(200).json({
            message:'Question Created Successfully',
            data:question
        });
    }catch(err){
        return res.status(500).json({
            message:`Error while craeting the question`,
            data:err
        });
    }
}


module.exports.deleteQuestion=async (req,res) => {
    try{
            let question = await Question.findById(req.params.id);
            if(question){
                // if the question has vote then it cannot be deleted
                if(question.vote){
                    return res.status(400).json({
                    message:'The question you want to delete cannot be deleted as it has been voted',
                    });
                }else{
                    // deleting all the options 
                    console.log('deleting otions');
                    await  Option.deleteMany({question:question._id});

                    // deleting our question'
                    console.log('deleting question');
                    question=await Question.findByIdAndDelete(req.params.id);
            
                    return res.json(200,{
                        message:'question deleted',
                    });
                }
            }else{
                    return res.status(400).json({
                        message:'Specified question does not exists',
                });
            }
    }catch(err){
        return res.status(500).json({
                message:`Error while deleting the question from the server`,
                data:err
            });
    }
}


module.exports.showAllQuestions=async (req,res) => {
    try{
         // finding all the questions and returning
        let question = await Question.findById(req.params.id).populate({path:'option'});

        if(question){
            return res.status(200).json({
                    message:'Here is the questions',
                    data:question
                });
        }else{
            return res.status(400).json({
                    message:'Question does not does not exists',
                });
        }
    }catch(err){
        return res.status(500).json({
                message:'Error from the server ',
                data:err
            });
    }
}