import React from 'react';
import { Link } from 'react-router-dom';
import questionsData from './questions.json';
import { CHAPTERNAMES } from './chapter-name-mapping';

const ChapterSelection = () => {
  const chapters = Object.keys(questionsData.questions_per_chapter);

  return (
    <div>
      <h2>Select a Chapter</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link to={`/quiz/${chapter}`}>{CHAPTERNAMES[`${chapter}`]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterSelection;
