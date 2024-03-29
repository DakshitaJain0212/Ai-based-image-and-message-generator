import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, CreatePost } from "./pages";
import ChatInterface from "./pages/ChatInterface";
import Header from "./components/Header";
import CommunityPage from "./pages/CommunityPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnMore from "./pages/LearnMore";

const App = () => {
  // State variable to track dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Function to toggle dark mode
  const toggleDarkMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  return (
    <BrowserRouter>
      <main
        className={` ${
          darkMode ? "bg-[rgb(3, 0, 31)]" : "bg-[#f9fafe]"
        }  min-h-screen`}
      >
        <Routes>
          <Route
            path="/home"
            element={
              <CommunityPage
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />

          <Route
            path="/"
            element={
              <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />

          <Route
            path="/create-post"
            element={
              <CreatePost darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/chat-interface"
            element={
              <ChatInterface
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/learnmore"
            element={
              <LearnMore darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/login"
            element={
              <Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/register"
            element={
              <Register darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
