import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, CreatePost } from "./pages";
import ChatInterface from "./pages/ChatInterface";
import Header from "./components/Header";
import CommunityPage from "./pages/CommunityPage";

const App = () => {
  // State variable to track dark mode
  const [darkMode, setDarkMode] = useState(false);

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
          <Route path="/home" element={< CommunityPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />

          <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />

          <Route
            path="/create-post"
            element={<CreatePost darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/chat-interface"
            element={<ChatInterface darkMode={darkMode} toggleDarkMode={toggleDarkMode}  />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
