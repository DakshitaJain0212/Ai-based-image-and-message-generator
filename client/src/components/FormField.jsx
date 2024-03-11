import React,{useState, useRef} from "react";
import mic from '../assets/mic.png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition' 
import { message } from 'antd';
const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  darkMode,
  input,
  setInput
}) => {
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleClick = () => {
    if (isListening) {
    SpeechRecognition.stopListening();
  } else {
    SpeechRecognition.startListening({ continuous: true });
      setInput(transcript);
  }
  setIsListening(!isListening);
  }

const handleInputChange = (event) => {
  setInput(event.target.value);
};


  return (
    // <div>
    //   <div
    //     className={`mt-3 flex items-center gap-2 mb-2 ${
    //       darkMode ? "dark" : ""
    //     }`}
    //   >
    //     <label
    //       htmlFor={name}
    //       className={`block text-sm font-medium leading-6 ${
    //         darkMode ? "text-gray-300" : "text-gray-900"
    //       }`}
    //     >
    //       {labelName}
          
    //     </label>
    //     {isSurpriseMe && (
    //       <button
    //         type="button"
    //         onClick={handleSurpriseMe}
    //         className={`font-semibold text-xs ${
    //           darkMode ? "bg-[#ECECF1] text-black " : " bg-gray-800 text-white"
    //         } py-1 px-2 rounded-[5px]`}
    //       >
    //         Surprise Me
    //       </button>
    //     )}
    //     <img src={mic} alt="" style={{}} height={20} width={20}/>
    //   </div>

    //   <input
    //     type={type}
    //     id={name}
    //     name={name}
    //     placeholder={placeholder}
    //     value={value}
    //     onChange={handleChange}
    //     required
    //     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 ${
    //       darkMode
    //         ? "bg-[#48484AFF] border-[#48484AFF] text-white focus:border-[#48484AFF] "
    //         : ""
    //     }`}
    //   />
    // </div>

    
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
            <div
        className={`mt-3 flex items-center gap-2 mb-2 ${
          darkMode ? "dark" : ""
        }`}
      >
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                {labelName}
              </label>
              {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className={`font-semibold text-xs ${
              darkMode ? "bg-[#ECECF1] text-black " : " bg-gray-800 text-white"
            } py-1 px-2 rounded-[5px]`}
          >
            Surprise Me
          </button>
        )}
        </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md" style={{width: "700px"}}>
                  <input
                    type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleInputChange}
                        required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                    
                  />
                  <img 
                  src={mic} 
                  alt="" 
                  style={{ marginTop: "5px" ,height: "25px"}} 
                  height={10} 
                  width={20}
                  onClick={handleClick}
                  />
                </div>
                {isListening && <p className="text-red-500">Microphone is on</p>}
              </div>
            </div>
            </div>
  );
};

export default FormField;


// bg-blue-500 hover:bg-blue-600