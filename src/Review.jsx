import React from 'react';
import questionsData from "./questions.json"
import { Link } from 'react-router-dom';
import {CHAPTERNAMES} from './chapter-name-mapping';
const Review = () => {
    
    const chapters = Object.keys(questionsData.questions_per_chapter);

    return (
        <div style={{textAlign:'left'}}>
           <strong>Review per chapter</strong>
           <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link to={`/review/${chapter}`}>{CHAPTERNAMES[`${chapter}`]}</Link>
          </li>
        ))}
      </ul>
      <strong>Review mixed questions</strong>
      <ul>
          <li>
            <Link to={`/review/mixed`}>Mixed Questions</Link>
          </li>
      
      </ul>
        </div>
    );
};

export default Review;