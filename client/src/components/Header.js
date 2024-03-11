
import React from 'react'
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import gptLogo from "../assets/chatgpt.svg";
import gptLogo2 from "../assets/chatgptlogo-removebg-preview.png";

function Header({darkMode, toggleDarkMode}) {
  return (
    <>
      <header
        className={`w-full flex items-center justify-between ${
          darkMode
            ? "bg-gray-800 border-b border-b-[#3C3C434D]"
            : "bg-white border-b border-b-[#e6ebf4]"
        } sm:px-8 px-4 py-4 `}
      >
        <Link to="/">
        <div className="upperSideTop" style={{marginTop: "20px"}}>
              <img
                src={darkMode ? gptLogo : gptLogo2}
                alt="logo"
                className="logo"
                style={{ width: "30px", height: "30px" }}
              />
              <span
                className={`brand ${
                  darkMode ? "text-[#666e75]" : "text-[#222328]"
                } text-[32px]`}
              >
                ImageForge
              </span>
              </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className={`font-inter font-medium px-4 py-5 rounded-md ${
              darkMode ? "bg-[#6469ff] text-white" : "bg-[#6469ff] text-white"
            }`}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <Link
            to="/chat-interface"
            className={`font-inter font-medium px-4 py-5 rounded-md ${
              darkMode ? "bg-[#6469ff] text-white" : "bg-[#6469ff] text-white"
            }`}
          >
            Start Chatting
          </Link>

          <Link
            to="/create-post"
            className={`font-inter font-medium px-4 py-5 rounded-md ${
              darkMode ? "bg-[#6469ff] text-white" : "bg-[#6469ff] text-white"
            }`}
          >
            Create Image
          </Link>
        </div>
      </header>
    </>
  )
}

export default Header;