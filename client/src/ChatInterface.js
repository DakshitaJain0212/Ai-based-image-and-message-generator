import './App.css';
import addBtn from "./assets/add-30.png"
import gptLogo from "./assets/chatgpt.svg"
import gptLogo2 from "./assets/chatgptlogo-removebg-preview.png"

import msgIcon from "./assets/message.svg"
// import home from "./assets/home.svg"
// import saved from "./assets/bookmark.svg"
// import rocket from "./assets/rocket.svg"
import sendBtn from "./assets/send.svg"
// import axios from 'axios';
import userIcon from "./assets/user-icon.png"
import gptImgLogo from "./assets/chatgptLogo.svg"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {  OpenAI } from "openai";
function ChatInterface({ darkMode,toggleDarkMode}) {
    const navigate=useNavigate();
  const [input , setInput]=useState("");
  const [response , setResponse]=useState("");
  const [itemarr , setItemArr]=useState([]);
// let arr=[]
  // const handleSend=async()=>{
  //   console.log("i click");
  //   const res=await openaiFun(input);
  //   console.log(res);
  // }
// const {BASE_URL}=process.env;


console.log(darkMode);
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
  apiKey:"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",
  dangerouslyAllowBrowser: true
});

async function getAiResponse() {
  let obj={
        question:input
      }
  // const openai = new OpenAIApi(configuration);
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: input,
    max_tokens: 1024,
    // n: 1,
    // stop: null,
    // temperature: 0.7
  });
  console.log("==>",completion.choices[0].text)
  obj.answer=completion.choices[0].text;
  itemarr.push(obj);
  setInput("");
}
// getAiResponse();





useEffect(()=>{
console.log("itemarr",itemarr);
},[itemarr]);
  return (
    <>
    <div className='App' >
      <div className='sideBar'>
        <div className='upperSide'>
        <div className='upperSideTop'>
          <img src={darkMode?gptLogo:gptLogo2} alt='logo' className='logo' style={{width:"100px",height:"50px"}}/>
          <span className={`brand ${darkMode?"text-[#666e75]":"text-[#222328]"} text-[32px]`}>ChatGPT</span>
          <span>
          <label className="inline-flex items-center cursor-pointer " style={{marginLeft: "500px"}}>
          <input
            type="checkbox"
            value=""
            className="sr-only peer "
            onChange={toggleDarkMode}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
          </span>
          </div>
          <button className='midBtn'><img src={addBtn} alt='new chat' className={`addBtn `} />New Chat</button>
          <div className='upperSideBottom'>
            <button className={` ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"} query`}><img src={msgIcon} alt='Query'/>What is Programming?
            </button>
            <button className={` ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"} query`} ><img src={msgIcon} alt='Query'/>How to use an API?
            </button>
           
          </div>
         
        </div>
       
          <div className='lowerSide'>
            <div className={`listItems ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"}`} onClick={()=>navigate("/",)} style={{cursor:"pointer"}}>
                <i className={`fa fa-home listitemsImg ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"}`} style={{fontSize:"25px"}}></i>
              {/* <img src={home} className={`listitemsImg ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"}`} alt=''/> */}
              Home
            </div>
            {/* <div className='listItems'>
              <img src={saved} className='listitemsImg' alt=''/>
            saved
            </div>
            <div className='listItems'>
              <img src={rocket} className='listitemsImg' alt=''/>
           upgrade to pro
            </div>
         */}
          </div>


      </div>
      <div className='main'>
        <div className='chats'>
          {
            itemarr.map((item,index)=>(
              <>
              <div key={index}>
              <div className='chat'>
            <img className='chatImg' src={userIcon} alt=''/>
            <p className={`txt ${darkMode?"text-[rgba(222, 222, 222, 1)]":"text-[#000]"}`}>{item.question}</p>

          </div>
          <div className={`chat bot  ${darkMode?"bg-[#f9fafe]":""}`} >
            <img className='chatImg' src={gptImgLogo} alt=''/>
            <p className='txt' >{item.answer}</p>

          </div>
              </div>
        
              </>
            ))
          }
        
         

        </div>
        <div className='chatFooter'>
          <div className={`inp  `}>

<input type='text' name='' id='' placeholder='send a message...' value={input} onChange={(e)=>setInput(e.target.value)}   style={darkMode?{}:{color:"#fff"}}/>
<button className='send' 
onClick={()=>getAiResponse()}
><img src={sendBtn} alt='send'/></button>
          </div>
          <p>chatgpt may produce incorrect result  within the text according to a chosen order.</p>

        </div>
      </div>
    </div>

    </>
   
  );
}

export default ChatInterface;
