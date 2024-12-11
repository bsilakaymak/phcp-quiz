import React from 'react';

const ProgressBar = ({ progress, correctAnswers, wrongAnswers, totalQuestions }) => {
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const wrongPercentage = (wrongAnswers / totalQuestions) * 100;

  return (
    <div style={{ margin: '20px 0', width: '100%' }}>
      {/* Container */}
      <div
        style={{
          width: '100%',
          height: '30px',
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        {/* Correct answers - Green */}
        <div
          style={{
            width: `${correctPercentage}%`,
            height: '100%',
            backgroundColor: 'green',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >

        <div
          style={{
            width: `${correctPercentage}%`,
            height: '100%',
            backgroundColor: 'green',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        </div>
        
        {/* Wrong answers - Red */}
        <div
          style={{
            width: `${wrongPercentage}%`,
            height: '100%',
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: `${correctPercentage}%`, // Start from the right after correct answers
          }}
        />
        
        {/* Remaining unanswered questions - Light gray */}
        <div
          style={{
            width: `${100 - correctPercentage - wrongPercentage}%`,
            height: '100%',
            backgroundColor: '#e0e0e0',
            position: 'absolute',
            top: 0,
            left: `${correctPercentage + wrongPercentage}%`, // Remaining space
          }}
        />
      </div>

      {/* Progress Text */}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {progress}%
      </p>
    </div>
  );
};

export default ProgressBar;
