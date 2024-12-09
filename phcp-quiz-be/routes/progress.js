const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Save user progress by chapter
router.post("/progress", authMiddleware, async (req, res) => {
  const { chapter, currentQuestion, answeredQuestions, wrongAnswers } =
    req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the chapter progress
    if (!user.progress.has(chapter)) {
      user.progress.set(chapter, {
        currentQuestion: 0,
        answeredQuestions: [],
        wrongAnswers: [],
      });
    }

    // Get the chapter progress data
    const chapterProgress = user.progress.get(chapter);

    // Update the chapter's progress
    chapterProgress.currentQuestion = currentQuestion; // Set the current question index for the chapter
    chapterProgress.answeredQuestions = answeredQuestions; // Set the answered questions for the chapter
    chapterProgress.wrongAnswers = wrongAnswers; // Set the wrong answers for the chapter

    // Save the updated user progress
    await user.save();
    res.status(200).json({ message: "Progress saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
