import addBtn from "../assets/add-30.png";
import gptLogo from "../assets/chatgpt.svg";
import gptLogo2 from "../assets/chatgptlogo-removebg-preview.png";
import "./ChatInterface.css";
import msgIcon from "../assets/message.svg";
// import home from "./assets/home.svg"
// import saved from "./assets/bookmark.svg"
// import rocket from "./assets/rocket.svg"
import sendBtn from "../assets/send.svg";
import mic from "../assets/mic.png";
// import axios from 'axios';
import userIcon from "../assets/user-icon.png";
import gptImgLogo from "../assets/chatgptLogo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "openai";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
function ChatInterface({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [inputItem, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [itemarr, setItemArr] = useState([]);
  useEffect(()=>{
    let token=localStorage.getItem('token');
    if(!token){
      navigate("/login");
    }
      },[])
  // let arr=[]
  // const handleSend=async()=>{
  //   console.log("i click");
  //   const res=await openaiFun(input);
  //   console.log(res);
  // }
  // const {BASE_URL}=process.env;

  // const getRes=()=>{
  //   let obj={
  //     question:input
  //   }
  // axios
  // .post(`http://localhost:3001/getresponse`,{message:input},
  // {
  //   headers:{
  //     "Content-Type":"Application/json"
  //   }
  // }).then((response)=>{
  //   if(response.data.success===false)
  //   {
  //      alert("something went wrong");
  //   }else{
  //     obj.answer=response.data.result;
  //     itemarr.push(obj);
  //     setResponse(response.data.data);
  //     console.log("response",response.data.result);
  //     setInput("");
  //   }
  // })
  // }
  const openai = new OpenAI({
    // apiKey:"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",
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  async function getAiResponse() {
    let obj = {
      question: inputItem,
    };
    // const openai = new OpenAIApi(configuration);
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: inputItem,
      max_tokens: 1024,
      // n: 1,
      // stop: null,
      // temperature: 0.7
    });
    console.log("==>", completion.choices[0].text);
    obj.answer = completion.choices[0].text;
    itemarr.push(obj);
    setInput("");
  }
  // getAiResponse();

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    console.log("itemarr", itemarr);
  }, [itemarr]);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setInput("");
    setInput(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
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
    console.log(inputItem);
  };
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`w-full h-full flex flex-col md:flex-row ${
          darkMode ? "bg-black" : ""
        }`}
        style={{height:"100vh"}}
      >
        {/* <div className={`sideBar w-full md:w-1/4 lg:w-1/5 bg-${darkMode ? 'gray-800' : 'gray-200'} text-${darkMode ? 'white' : 'black'} transition-colors duration-500`}>
        <div className="upperSide p-4">
         
          <div className="upperSideTop">
              <img
                src={darkMode ? gptLogo : gptLogo2}
                alt="logo"
                className="logo"
                style={{ width: "50px", height: "50px" }}
              />
              <span
                className={`brand ${
                  darkMode ? "text-[#666e75]" : "text-[#222328]"
                } text-[32px]`}
              >
                AnswerCraft
              </span>
              </div>
          <div className="upperSideBottom space-y-2 mt-4">
          <button
                className={` ${
                  darkMode ? "text-[rgba(222, 222, 222, 1)]" : "text-[#000]"
                } query`}
              >
                <img src={msgIcon} alt="Query" />
                What is Programming?
              </button>
              <button
                className={` ${
                  darkMode ? "text-[rgba(222, 222, 222, 1)]" : "text-[#000]"
                } query`}
              >
                <img src={msgIcon} alt="Query" />
                How to use an API?
              </button>
          </div>
        </div>

        <div className="lowerSide mt-auto p-4 space-y-2">
          <div
            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded p-2 transition-all"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <button 
            className="w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700 rounded p-2 transition-all"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div> */}

        {/* <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-0">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card> */}

        <div className={`main flex-9 p-4 ${darkMode ? "bg-black" : ""}`}>
          <div className={`chats space-y-4 w-full max-w-5xl`}>
            {itemarr.map((item, index) => (
              <div key={index}>
                <div className="chat m-4 px-10 flex align-center center ">
                  <img
                    className={`object-cover w-12 h-12 mr-8 rounded-full `}
                    src={userIcon}
                    alt="user"
                  />
                  <p
                    className={`txt ${darkMode ? "text-white" : "text-[#000]"}`}
                  >
                    {item.question}
                  </p>
                </div>
                <div
                  className={`chat bot ${
                    darkMode ? "bg-gray-800 text-white " : ""
                  } m-4 px-10 flex align-center rounded-lg center`}
                >
                  <img
                    className="object-cover w-12 h-12 mr-8 rounded-full"
                    src={gptImgLogo}
                    alt=""
                  />
                  <p className="txt">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chatFooter mt-4">
            <div className={`inp flex items-center bg-gray-800 text-white `}>
              <img
                src={mic}
                alt=""
                style={{ marginLeft: "7px", marginTop: "5px", height: "25px" }}
                height={10}
                width={27}
                onClick={handleClick}
              />
              {/* <input
                type="text"
                placeholder="send a message..."
                name={inputItem}
                value={inputItem}
                onChange={(e) =>handleInputChange}
                className="flex-1 p-2"
              /> */}
              <input
                type="text"
                placeholder="send a message..."
                name={inputItem}
                value={inputItem}
                onChange={(e) => handleInputChange(e)}
                className="flex-1 p-2"
              />
              <button className="send p-2" onClick={() => getAiResponse()}>
                <img src={sendBtn} alt="send" />
              </button>
            </div>
          </div>
        </div>

        {/* <div className={`main flex-9 p-4 ${darkMode ? "bg-black" : ""}`}>
          <div className="chats space-y-4 w-full max-w-5xl ">
            {itemarr.map((item, index) => (
              <div key={index}>
                <div className="chat m-4 px-10 flex align-center center">
                  <img
                    className={`object-cover w-12 h-12 mr-8 rounded-full `}
                    
                    src={userIcon}
                    alt="user"
                  />
                  <p
                    className={`txt ${
                      darkMode ? "text-white" : "text-[#000]"
                    }`}
                  >
                    {item.question}
                  </p>
                </div>
                <div className={`chat bot ${darkMode ? "bg-gray-800 text-white " : ""} m-4 px-10 flex align-center rounded-lg center`}>
                  <img className="object-cover w-12 h-12 mr-8 rounded-full" src={gptImgLogo} alt="" />
                  <p className="txt">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chatFooter">
            <div className="inp " style={{width: "68rem"}}>
              <input
                type="text"
                placeholder="send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-[calc(100% - 3rem)] outline-none p-7 text-white"
              />
              <button className="send p-2 bg-transparent border-none" onClick={() => getAiResponse()}>
                <img src={sendBtn} alt="send" />
              </button>
            </div>
            <p
              className={`mt-2 text-xs ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              chatgpt may produce incorrect result within the text according to
              a chosen order.
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ChatInterface;
