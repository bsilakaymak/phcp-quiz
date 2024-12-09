const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [
    {
      chapterId: { type: String, required: true },
      chapterName: { type: String, required: true },
      currentQuestionId: { type: String, required: true },
      answeredQuestions: { type: [String], default: [] },
      wrongAnswers: { type: [String], default: [] },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
