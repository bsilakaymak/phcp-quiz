import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from '../data/questions.json';
import ProgressBar from '../components/ProgressBar';
import SingleQuestion from '../components/SingleQuestion';
import { CHAPTERNAMES } from '../data/chapter-name-mapping';
import Container from '../components/Container';

const ChapterReview = ({ isMixed = false }) => {
  const { chapter } = useParams();
  const localStorageKey = isMixed
    ? 'mixedQuizProgress'
    : `${chapter}QuizProgress`;

  const savedProgress = JSON.parse(localStorage.getItem(localStorageKey));

  const allQuestions = isMixed
    ? questionsData.questions_mixed
    : questionsData.questions_per_chapter[chapter] || [];

    const [wrongAnswers, setWrongAnswers] = useState(savedProgress ? savedProgress.wrongAnswers : []);
    const [userAnswers] = useState(savedProgress ? savedProgress.userAnswers : []);
    const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (savedProgress) {
        setWrongAnswers(savedProgress.wrongAnswers);
    }
  }, [localStorageKey]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        ...savedProgress,  
        wrongAnswers,      
      })
    );
  }, [wrongAnswers, localStorageKey]);
  

  const filteredWrongAnswers = allQuestions.filter(
    (q) => savedProgress?.wrongAnswers.includes(q.id))
  
  const currentQuestion =  filteredWrongAnswers[0];

  const handleAnswer = (optionKey) => {
    const correct = optionKey === currentQuestion.correct_answer;
    setSelectedOption(optionKey);
    setShowFeedback(true);

    if (correct) {
        setWrongAnswers((prevWrongAnswers) =>
          prevWrongAnswers.filter((id) => id !== currentQuestion.id) 
        );
      } 
    setTimeout(() => {
      setShowFeedback(false); 
      setSelectedOption(null); 
    }, 1500); 
  };

  const answeredQuestions = userAnswers?.length;
  const totalQuestions = allQuestions.length;
  const percentageAnswered = (answeredQuestions / totalQuestions) * 100;

  return (
    <Container>
      <h2>{isMixed ? 'Mixed Questions Review' : `Chapter Review: ${CHAPTERNAMES[`${chapter}`]}`}</h2>
      <ul>
        <li>Total Questions: <strong>{allQuestions.length}</strong></li>
        <li>Answered Questions: <strong>{userAnswers?.length}</strong></li>
        <li>Correct Answers: <strong>{userAnswers?.length - wrongAnswers.length}</strong></li>
        <li>Wrong Answers: <strong>{wrongAnswers?.length}</strong></li>
      </ul>
      
        <ProgressBar
          correctAnswers={userAnswers?.length - wrongAnswers?.length}
          totalQuestions={allQuestions.length}
          wrongAnswers={wrongAnswers.length}
          progress={Math.round(percentageAnswered)}
        />
      {wrongAnswers.length > 0 ? (
        <div>
          <SingleQuestion
            question={currentQuestion}
            handleAnswer={handleAnswer}
            showFeedback={showFeedback}
            selectedOption={selectedOption}
          />
        </div>
      ) : (
        <div>
          <h3>Nothing to review...</h3>
          <p>
            You answered {userAnswers?.length - wrongAnswers?.length}/{totalQuestions} questions correctly.
          </p>
        </div>
      )}
    </Container>
  );
};

export default ChapterReview;

