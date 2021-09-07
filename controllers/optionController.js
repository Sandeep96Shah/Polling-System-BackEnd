const Options = require("../model/option");
const Question = require("../model/question");

module.exports.create = async (req, res) => {
  try {
    // finding question by by the req.params.id
    let question = await Question.findById(req.params.id);

    if (question) {
      //unique id is set for all the options in the question
      let id = question.option.length + 1;
      let vote = 0;

      //setting the url to vote
      let url = `http://localhost:8000/options/${id}/add_vote`;

      //creating the option for the question
      let option = await Options.create({
        id: id,
        question: question._id,
        text: req.body.text,
        votes: vote,
        link: url,
      });

      //pusing the option for the specified question
      question.option.push(option);
      question.save();

      return res.status(200).json({
        message: "Option for the question is created successfully",
        data: option,
      });
    } else {
      return res.status(400).json({
        message: "Specified question does not exists in the database",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the Server side",
      data: err,
    });
  }
};

module.exports.deleteOption = async (req, res) => {
  try {
    let option = await Options.findById(req.params.id);
    if (option) {
      // checeking here if option have votes or not
      let v = Number(option.votes);
      // if vote is 0 then delete it
      if (v === 0) {
        option = await Options.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          message: "Option has been deleted Successfully",
        });
      } else {
        return res.status(400).json({
          message: "Option has been voted, so it cannot be deleted",
        });
      }
    } else {
      return res.status(400).json({
        message: "Option doen not exists in the database",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the Server side",
      data: err,
    });
  }
};

module.exports.addVote = async (req, res) => {
  try {
    // finding option by id to check if exits or not
    let option = await Options.findById(req.params.id);

    // if option exits
    if (option) {
      // getting previous votes and adding 1 to it
      let v = Number(option.votes) + 1;

      // updating the votes in the option
      option = await Options.findByIdAndUpdate(
        { _id: req.params.id },
        { votes: v }
      );

      // make vote in question true so that we can not delete it.
      let question = await Question.findByIdAndUpdate(
        { _id: option.question },
        { vote: true }
      );

      return res.status(200).json({
        message: "Chosen option have been voted successfully",
        data: option,
      });
    } else {
      return res.status(400).json({
        message: "Option cannot be voted as it does not exists in the database",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the Server side",
      data: err,
    });
  }
};
