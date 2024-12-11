import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from '../data/questions.json';
import ProgressBar from '../components/ProgressBar';
import SingleQuestion from '../components/SingleQuestion';
import { CHAPTERNAMES } from '../data/chapter-name-mapping';
import Container from '../components/Container';

const Quiz = ({ isMixed = false }) => {
  const { chapter } = useParams();
  const localStorageKey = isMixed
    ? 'mixedQuizProgress'
    : `${chapter}QuizProgress`;

  const savedProgress = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  const initialUserAnswers = savedProgress.userAnswers || [];
  const initialWrongAnswers = savedProgress.wrongAnswers || [];

  const allQuestions = isMixed
    ? questionsData.questions_mixed
    : questionsData.questions_per_chapter[chapter] || [];

  const [userAnswers, setUserAnswers] = useState(initialUserAnswers);
  const [wrongAnswers, setWrongAnswers] = useState(initialWrongAnswers);
  const [unansweredQuestions, setUnansweredQuestions] = useState(
    allQuestions.filter((q) => !initialUserAnswers.includes(q.id))
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        userAnswers,
        wrongAnswers,
      })
    );
  }, [userAnswers, wrongAnswers, localStorageKey]);

  const currentQuestion = unansweredQuestions[0];

  const handleAnswer = (optionKey) => {
    const correct = optionKey === currentQuestion.correct_answer;
    setSelectedOption(optionKey);
    setShowFeedback(true);


    const updatedUserAnswers = [...userAnswers, currentQuestion.id];
    setUserAnswers(updatedUserAnswers);


    if (!correct) {
      setWrongAnswers((prev) => [...prev, currentQuestion.id]);
    }


    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setUnansweredQuestions((prev) =>
        prev.filter((q) => q.id !== currentQuestion.id)
      );
    }, 1500);
  };

  const answeredQuestions = userAnswers.length;
  const totalQuestions = allQuestions.length;
  const percentageAnswered = (answeredQuestions / totalQuestions) * 100;

  return (
    <Container>
      <h2>{isMixed ? 'Mixed Questions' : `Practice Questions: ${CHAPTERNAMES[chapter]}`}</h2>
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
            You answered{' '}
            {
              userAnswers.filter((id) =>
                allQuestions.find(
                  (q) => q.id === id && q.correct_answer === id
                )
              ).length
            }
            /{totalQuestions} questions correctly.
          </p>
        </div>
      )}
    </Container>
  );
};

export default Quiz;
