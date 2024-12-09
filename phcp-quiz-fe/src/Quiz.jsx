import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from './questions.json';
import ProgressBar from './ProgressBar';
import SingleQuestion from './SingleQuestion';
import {CHAPTERNAMES} from "./chapter-name-mapping"

const Quiz = ({ isMixed = false }) => {
  const { chapter } = useParams();
  const localStorageKey = isMixed
    ? 'mixedQuizProgress'
    : `${chapter}QuizProgress`;

  const savedProgress = JSON.parse(localStorage.getItem(localStorageKey));

  const [currentIndex, setCurrentIndex] = useState(savedProgress ? savedProgress.currentIndex : 0);
  const [userAnswers, setUserAnswers] = useState(savedProgress ? savedProgress.userAnswers : []);
  const [wrongAnswers, setWrongAnswers] = useState(savedProgress ? savedProgress.wrongAnswers : []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const allQuestions = isMixed
    ? questionsData.questions_mixed
    : questionsData.questions_per_chapter[chapter] || [];

  const currentQuestion = allQuestions[currentIndex];

  useEffect(() => {
    if (savedProgress) {
      setCurrentIndex(savedProgress.currentIndex);
      setUserAnswers(savedProgress.userAnswers);
      setWrongAnswers(savedProgress.wrongAnswers);
    }
  }, [localStorageKey]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        currentIndex,
        userAnswers,
        wrongAnswers,
      })
    );
  }, [currentIndex, userAnswers, wrongAnswers, localStorageKey]);

  const handleAnswer = (optionKey) => {
    const correct = optionKey === currentQuestion.correct_answer;
    setSelectedOption(optionKey);
    setShowFeedback(true);

    const updatedAnswers = [...userAnswers, { ...currentQuestion, isCorrect: correct }];
    setUserAnswers(updatedAnswers);

    if (!correct) {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      setCurrentIndex(currentIndex + 1);
    }, 1500);
  };

  const answeredQuestions = userAnswers.length;
  const totalQuestions = allQuestions.length;
  const percentageAnswered = (answeredQuestions / totalQuestions) * 100;

  return (
    <div>
      <h2>{isMixed ? 'Mixed Questions' : `Practice Questions: ${CHAPTERNAMES[`${chapter}`]}`}</h2>
      {currentIndex < allQuestions.length ? (
        <div>
          <ProgressBar
            progress={Math.round(percentageAnswered)}
            correctAnswers={userAnswers.length - wrongAnswers.length}
            wrongAnswers={wrongAnswers.length}
            totalQuestions={totalQuestions}
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
            You answered {userAnswers.filter((a) => a.isCorrect).length}/{allQuestions.length} questions correctly.
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
