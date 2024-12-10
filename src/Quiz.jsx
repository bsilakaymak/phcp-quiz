import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from './questions.json';
import ProgressBar from './ProgressBar';
import SingleQuestion from './SingleQuestion';
import { CHAPTERNAMES } from './chapter-name-mapping';

const Quiz = ({ isMixed = false }) => {
  const { chapter } = useParams();
  const localStorageKey = isMixed
    ? 'mixedQuizProgress'
    : `${chapter}QuizProgress`;

  const savedProgress = JSON.parse(localStorage.getItem(localStorageKey));

  const allQuestions = isMixed
    ? questionsData.questions_mixed
    : questionsData.questions_per_chapter[chapter] || [];

  const [userAnswers, setUserAnswers] = useState(savedProgress ? savedProgress.userAnswers : []);
  const [wrongAnswers, setWrongAnswers] = useState(savedProgress ? savedProgress.wrongAnswers : []);
 
  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        userAnswers,
        wrongAnswers,
      })
    );
  }, [userAnswers, wrongAnswers, localStorageKey]);
  
  
  const [unansweredQuestions, setUnansweredQuestions] = useState(
    allQuestions.filter(
      (q) => !savedProgress?.userAnswers.includes(q.id) // Filter out answered questions
    )
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Get the current question based on the first unanswered question
  const currentQuestion = unansweredQuestions[0];


  useEffect(() => {
    if (savedProgress) {
      setUserAnswers(savedProgress.userAnswers);
      setWrongAnswers(savedProgress.wrongAnswers);
      setUnansweredQuestions(
        allQuestions.filter(
          (q) => !savedProgress.userAnswers.includes(q.id) // Filter based on question IDs
        )
      );
    }
  }, [localStorageKey]);

  

  const handleAnswer = (optionKey) => {
    const correct = optionKey === currentQuestion.correct_answer;
    setSelectedOption(optionKey);
    setShowFeedback(true);

    // Track the question ID in userAnswers
    const updatedAnswers = [...userAnswers, currentQuestion.id];
    setUserAnswers(updatedAnswers);

    // Add the question ID to wrongAnswers if incorrect
    if (!correct) {
      setWrongAnswers([...wrongAnswers, currentQuestion.id]);
    }

    // Transition to the next question
    setTimeout(() => {
      setShowFeedback(false); // Clear feedback
      setSelectedOption(null); // Clear selected option

      // Remove the answered question from unansweredQuestions
      setUnansweredQuestions((prevUnanswered) =>
        prevUnanswered.filter((q) => q.id !== currentQuestion.id)
      );
    }, 1500); // Adjust timeout as needed
  };

  const answeredQuestions = userAnswers.length;
  const totalQuestions = allQuestions.length;
  const percentageAnswered = (answeredQuestions / totalQuestions) * 100;

  return (
    <div>
      <h2>{isMixed ? 'Mixed Questions' : `Practice Questions: ${CHAPTERNAMES[`${chapter}`]}`}</h2>
      {unansweredQuestions.length > 0 ? (
        <div>
          <ProgressBar
            correctAnswers={userAnswers.length - wrongAnswers.length}
            totalQuestions={totalQuestions}
            wrongAnswers={wrongAnswers.length}
            progress={Math.round(percentageAnswered)}
          />
          <SingleQuestion
            question={currentQuestion}
            handleAnswer={handleAnswer}
            showFeedback={showFeedback}
            selectedOption={selectedOption}
          />
        </div>
      ) : (
        <div>
          <h3>Quiz Completed!</h3>
          <p>
            You answered {userAnswers.filter((id) => allQuestions.find(q => q.id === id && q.correct_answer === id)).length}/{totalQuestions} questions correctly.
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

