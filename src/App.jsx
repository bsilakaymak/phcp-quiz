import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './views/Quiz';
import ChapterSelection from './views/ChapterSelection';
import Review from './views/Review';
import ChapterReview from './views/ChapterReview';
import Register from './views/Register';
import { UserProvider } from './context/UserContext';

const handleReset = () => {
  const confirmReset = window.confirm(
    'Are you sure you want to reset your progress? This action cannot be undone.'
  );
  if (confirmReset) {
    localStorage.clear()
  }
}

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div>
        <h1>Psychology practice questions</h1>
        <nav>
          <Link to="/">Select Chapter</Link> | <Link to="/general-review">Review</Link> 
        {/* | <Link to="/register">Register to save your progress</Link> */}

        </nav>
        <Routes>
          <Route path="/" element={<ChapterSelection />} />
          <Route path="/phcp-quiz" element={<ChapterSelection />} />
          <Route path="/general-review" element={<Review />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review/:chapter" element={<ChapterReview />} />
          <Route path="/quiz/:chapter" element={<Quiz />} />
        </Routes>

        <div><button style={{ padding:"8px", background: "none", border: "1px solid red", color: "red" }} onClick={handleReset}>RESET PROGRESS</button></div>

      </div>
    </Router>
    </UserProvider>
  );
};

export default App;

