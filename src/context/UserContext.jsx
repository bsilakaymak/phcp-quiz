import React, { createContext, useState, useEffect } from "react";
//to be used later
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({
    currentChapter: 1,
    currentQuestionIndex: 0,
    answeredQuestions: [],
    wrongAnswers: [],
  }); 
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setProgress(storedUser.progress || progress);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user && !intervalId) {
      const id = setInterval(() => {
        console.log("Saving progress...");
        saveProgressToLocalStorage();
      }, 10000); // Save progress every 10 seconds (later an api call )
      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user, intervalId]);

  const saveProgressToLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, progress }));
  };

  const login = (userData) => {
    setUser(userData);
    setProgress(userData.progress || progress);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setProgress({
      currentChapter: 1,
      currentQuestionIndex: 0,
      answeredQuestions: [],
      wrongAnswers: [],
    });
    localStorage.removeItem("user");
  };

  const handleAnswer = (question, selectedOption) => {
    const isCorrect = question.correct_answer === selectedOption;
    const updatedProgress = {
      ...progress,
      answeredQuestions: [...progress.answeredQuestions, question],
      wrongAnswers: isCorrect
        ? progress.wrongAnswers
        : [...progress.wrongAnswers, question],
      currentQuestionIndex: progress.currentQuestionIndex + 1,
    };

    setProgress(updatedProgress);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        progress,
        login,
        logout,
        handleAnswer,
        saveProgressToLocalStorage,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
