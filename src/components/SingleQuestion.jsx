import React from 'react';

const SingleQuestion = ({ question, handleAnswer, showFeedback, selectedOption }) => {
  return (
    <div >
      <p style={{ fontSize: 24, fontWeight: 700 }}>{question.question}</p>
      <ul style={{ listStyle: 'none' }}>
        {Object.entries(question.options).map(([key, option]) => (
          <li style={{ margin: 10 }} key={key}>
            <button
              onClick={() => handleAnswer(key)}
              style={{
                width: '100%',
                border:"2px solid black",
                backgroundColor:
                  showFeedback && key === question.correct_answer
                    ? 'green'
                    : showFeedback && selectedOption === key && key !== question.correct_answer
                    ? 'red'
                    : 'white',
                color:
                  showFeedback &&
                  (key === question.correct_answer || selectedOption === key)
                    ? 'white'
                    : 'black',
                pointerEvents: selectedOption ? 'none' : 'auto',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleQuestion;
