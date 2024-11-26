import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TaskProvider } from './TaskContext'; 
import { auth } from './Config';
import Login from './Login';
import Signup from './Signup';
import TaskManager from './Taskmanager';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <TaskProvider>
    <Router>
      <Routes>
      
        {!isLoggedIn ? (
  <>
    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </>
) : (
  <>
    <Route path="/" element={<Navigate to="/taskmanager" />} />
    <Route path="/taskmanager" element={<TaskManager />} />
  </>
)}

      </Routes>
    </Router>
    </TaskProvider>
  );
};

export default App;
