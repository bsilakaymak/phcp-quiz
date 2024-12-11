import React from 'react';
import questionsData from "../data/questions.json"
import { Link } from 'react-router-dom';
import {CHAPTERNAMES} from '../data/chapter-name-mapping';
import Container from '../components/Container';
const Review = () => {
    
    const chapters = Object.keys(questionsData.questions_per_chapter);

    return (
      <Container>
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
      </Container>

    );
};

export default Review;