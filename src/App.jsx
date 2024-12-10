import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './Quiz';
import ChapterSelection from './ChapterSelection';
import Review from './Review';
import ChapterReview from './ChapterReview';
import Register from './Register';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div>
        <h1>PHCP Practice questions</h1>
        <nav>
          <Link to="/">Select Chapter</Link> | <Link to="/mixed">Mixed Questions</Link> | <Link to="/general-review">Review</Link> 
        {/* | <Link to="/register">Register to save your progress</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<ChapterSelection />} />
          <Route path="/general-review" element={<Review />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review/:chapter" element={<ChapterReview />} />
          <Route path="/review/mixed" element={<ChapterReview isMixed />} />
          <Route path="/quiz/:chapter" element={<Quiz />} />
          <Route path="/mixed" element={<Quiz isMixed />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;

