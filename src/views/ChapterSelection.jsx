import React from 'react';
import { Link } from 'react-router-dom';
import questionsData from '../data/questions.json';
import { CHAPTERNAMES } from '../data/chapter-name-mapping';
import Container from '../components/Container';

const ChapterSelection = () => {
  const chapters = Object.keys(questionsData.questions_per_chapter);

  return (
    <Container>
    <div style={{textAlign:'left'}}>
      <h2>Select a Chapter</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link to={`/quiz/${chapter}`}>{CHAPTERNAMES[`${chapter}`]}</Link>
          </li>
        ))}
      </ul>
    </div>
    </Container>
  );
};

export default ChapterSelection;
