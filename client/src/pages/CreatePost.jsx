import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { message } from "antd";
import Navbar from '../components/Navbar'


const CreatePost = ({ darkMode,toggleDarkMode }) => {
  console.log(darkMode);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputItem , setInput] = useState("");
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    setInput(randomPrompt);
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = JSON.stringify({...form});
    console.log(val);
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

       const res =  await response.json();
        message.success('Success');
        navigate('/home');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      message.error('Please generate an image with proper details');
    }
  };

  
  const handleChange = (e) => {
    
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  return (
    <>
     {/* <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> */}
     <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
     
      <div className={`overflow-hidden ${darkMode ? "bg-black": ""} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-2">
           
              <p className={`mt-2 text-3xl font-bold tracking-tight ${darkMode ? "text-gray-300" : "text-gray-900"} sm:text-4xl`}>Create</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Create imaginative and vistually stunning images and
          share them with the community!
              </p>
              <form className="mt-12 max-w-3xl " onSubmit={handleSubmit}>

              <label htmlFor="username" className={`block text-sm font-medium leading-6  ${darkMode ? "text-gray-400" : "text-gray-900"}`}>
                Your Name
              </label>

              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md" style={{width: "700px"}}>
                  <input
                    type='text'
                        id='name'
                        placeholder="John Doe"
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        required
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'} placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 `}
                    
                  />
                  
                </div>
              </div>

            <FormField
            labelName="Prompt"
            text="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            darkMode={darkMode}
            setForm={setForm}
            form={form}
            setInput={setInput}
            inputItem={inputItem}
          />
          
          <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={` ${
              darkMode ? "bg-[#ECECF1] text-black " : " bg-gray-800 text-white"
            }  font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
          </form>

          </div>


<div className="relative w-[1rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[34rem] md:-ml-4 lg:-ml-0 mr-3" 
      
      >

  {form.photo ? (
      <img
        src={form.photo}
        alt={form.prompt}
        className=" object-cover rounded-xl"
      />
    ) : (
      <img
        src={preview}
        alt="preview"
        className={` object-cover opacity-40 rounded-xl ${darkMode ? "text-white bg-white" : ""}`}
      />
    )}

    {generatingImg && (
      <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-xl">
        <Loader />
      </div>
    )}
</div>
        </div>
      </div>
    </div> 
  



    </>
  );
};

export default CreatePost;
