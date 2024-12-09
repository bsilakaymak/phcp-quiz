import React from 'react';
import questionsData from "./questions.json"
import { Link } from 'react-router-dom';
const Review = () => {
    
    const chapters = Object.keys(questionsData.questions_per_chapter);

    return (
        <div>
           Review per chapter
           <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link to={`/review/${chapter}`}>{chapter}</Link>
          </li>
        ))}
      </ul>
      Review mixed questions
      <ul>
          <li>
            <Link to={`/review/mixed`}>mixed</Link>
          </li>
      
      </ul>
        </div>
    );
};

export default Review;