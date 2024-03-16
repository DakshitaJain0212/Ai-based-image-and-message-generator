import React,{useState, useEffect} from "react";
import mic from '../assets/mic.png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition' 
import { message } from 'antd';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  inputItem , 
  setInput,
  isSurpriseMe,
  handleSurpriseMe,
  darkMode,
  setForm,
  form
}) => {
  const { transcript, browserSupportsSpeechRecognition ,resetTranscript} = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
    setInput("");
    setInput(transcript);
  }, [transcript]);


  if (!browserSupportsSpeechRecognition) {
    return null
  }

const handleClick = () => {
  console.log(transcript);
  if (isListening) {
    SpeechRecognition.stopListening();
    SpeechRecognition.abortListening();
    // resetTranscript();
  } else {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
   
  }
  setIsListening(!isListening);

};

const handleInputChange = (event) => {
  setInput("");
  setInput(event.target.value);
  
  setForm({ ...form, [event.target.name]: event.target.value });
  console.log(form);
  console.log(inputItem);
};



  return (
  

    
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
            <div
        className={`mt-3 flex items-center gap-2 mb-2 ${
          darkMode ? "dark" : ""
        }`}
      >
              <label htmlFor="username" className={`block text-sm font-medium leading-6  ${darkMode ? "text-gray-400" : "text-gray-900"}`}>
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
                        value={inputItem}
                        onChange={handleInputChange}
                        required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                    
                  />
                 <MicrophoneIcon
                   class="h-6 w-6 text-gray-500"  
                   style={{ marginTop: "5px" ,height: "25px"}}
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