import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

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
      <header
        className={`w-full flex justify-between item-center ${
          darkMode
            ? "bg-[#2C2C2EFF] border-b border-b-[#3C3C434D]"
            : "bg-white border-b border-b-[#e6ebf4]"
        } sm:px-8 px-4 py-4 `}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <label className="inline-flex items-center cursor-pointer " style={{marginLeft: "500px"}}>
          <input
            type="checkbox"
            value=""
            className="sr-only peer "
            onChange={toggleDarkMode}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>

        <Link
          to="/create-post"
          className={`font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md ${
            darkMode ? "bg-[#3A3BC] text-black" : "bg-[#6469ff] text-white"
          }`}
        >
          Create
        </Link>
      </header>
      <main
        className={`sm:p-8 px-4 py-8 w-full ${
          darkMode ? "bg-[hsla(240,6%,25%,1)]" : "bg-[#f9fafe]"
        } min-h-[calc(100vh-73px)]`}
      >
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route
            path="/create-post"
            element={<CreatePost darkMode={darkMode} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
