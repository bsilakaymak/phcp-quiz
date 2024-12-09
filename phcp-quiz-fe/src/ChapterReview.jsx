import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from "./questions.json";
import ProgressBar from './ProgressBar';
import SingleQuestion from './SingleQuestion';

const ChapterReview = () => {
    const { chapter } = useParams();
    const [showFeedback, setShowFeedback] = useState()
    const localStorageKey = chapter === "mixed"
        ? 'mixedQuizProgress'
        : `${chapter}QuizProgress`;

    const savedProgress = JSON.parse(localStorage.getItem(localStorageKey));

    const [userAnswers, setUserAnswers] = useState(savedProgress ? savedProgress.userAnswers : []);
    const [wrongAnswers, setWrongAnswers] = useState(savedProgress ? savedProgress.wrongAnswers : []);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null)
    const totalQuestions = questionsData.questions_per_chapter[chapter].length;
    const currentQuestion = wrongAnswers[currentQuestionIndex];

    const handleAnswer = (optionKey) => {
        const correct = optionKey === currentQuestion.correct_answer
        setSelectedOption(optionKey)
        setShowFeedback(true)
    
        if (correct) {
    
            const updatedWrongAnswers = wrongAnswers.filter((question) => question.question !== currentQuestion.question);
            console.log(updatedWrongAnswers)
            setWrongAnswers(updatedWrongAnswers);

            const updatedProgress = { ...savedProgress, wrongAnswers: updatedWrongAnswers };
            localStorage.setItem(localStorageKey, JSON.stringify(updatedProgress));
        }
    
        // Whether correct or not, track the answer in userAnswers
        const updatedAnswers = [...userAnswers, { ...currentQuestion, isCorrect: correct }];
        setUserAnswers(updatedAnswers);
    
        setTimeout(() => {
            setSelectedOption(null);
            setShowFeedback(false);
    
            if (currentQuestionIndex < wrongAnswers.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }, 1500);
    };


    return (
        <>
            <div>
                <li>Total Questions: {totalQuestions}</li>
                <li>Answered Questions: {userAnswers.length}</li>
                <li>Correct answers: {userAnswers.length - wrongAnswers.length}</li>
                <li>Wrong answers: {wrongAnswers.length}</li>
                <ProgressBar
                    correctAnswers={userAnswers.length - wrongAnswers.length}
                    totalQuestions={totalQuestions}
                    wrongAnswers={wrongAnswers.length}
                    progress={Math.round((userAnswers.length / totalQuestions) * 100)}
                />
            </div>
            WRONGLY ANSWERED QUESTIONS
            <div>
                {/* Display only the current question */}
                {currentQuestion && (
                    <SingleQuestion 
                        showFeedback={showFeedback}
                        selectedOption={selectedOption}
                        question={currentQuestion}
                        handleAnswer={handleAnswer}
                    />
                )}
            </div>
          
        </>
    );
};

export default ChapterReview;
