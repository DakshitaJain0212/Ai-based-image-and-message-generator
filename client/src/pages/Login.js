import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom/dist";


export default function Login() {
  const navigate=useNavigate();
  // const BASE_URL=process.env.BASE_URL;

  const [email , setEmail]=useState("");
  const [password , setPassword]=useState("");
  const login=()=>{
    console.log("in");
   
    axios
    .post(`http://localhost:8080/auth/login`,{
      email:email,
      password:password
    },{
      headers:{
        "Content-Type":"Application/json",
        'version':"1.0.0"
      }
    }).then((response)=>{
      if(response.data.success){
        localStorage.setItem("token",response.data.data.token);
        alert("login successfully");
        navigate("/home")

      }else{
        alert(response.data.message);
      }
    }).catch((error) => {
      alert(error.message);
    })

  }
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form className="space-y-6" action="#" method="POST"> */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>
  
              <div>
                <br/>
             
                <button
                  // type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                  onClick={()=>login()}
                >
                  Sign in
                </button>
              </div>
            {/* </form> */}
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to={`/register`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Register
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  