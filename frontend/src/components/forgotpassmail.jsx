import React from "react";
import { RxCross2 } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Forgotpassmail = ({ func }) => {
  const mailsend= async ()=>{
    const email=document.getElementById('email1').value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length===0){
      toast.warning("Empty Field")
      return false
    }
    else if(!emailRegex.test(email)){
      toast.warning("Enter a vaild Email")
    }
    else
    {
      toast("Sending...")

    // document.getElementById()
    
    const response = await axios.post('mail/forgotpassword',{"email":email}).catch(e=>toast.error(e.response.data.message));
    console.log(response)

    if(response.status===200){
      toast.success("Reset Mail Sent Successfully \n Check your inbox")
      setTimeout(function(){ 
        func();
    }, 4500); 

    }
    if(response.status!==200){
      console.log(response)
      toast.error(response.message)
    }
  }
    // axios.get()

  }
  return (
    <div className="" >
      <ToastContainer />
      <div className="">
        <div className=" bg-white rounded-md shadow   min-h-[200px] min-w-[400px] relative ">
          <h1 className="text-xl font-bold  text-center text-black md:text-2xl pt-5 ">
            Forgot Password
          </h1>
          <div className="absolute top-2 right-2 mt-2 mr-2 hover:bg-slate-400 hover:text-white rounded-full p-1">
            <RxCross2 className="text-2xl" onClick={func} />
          </div>
          <div className="p-10">
            <label
              htmlFor="email1"
              className="text-black block mb-2 text-sm font-medium  "
            >
              Email ID <span className="text-red-600"></span>
            </label>
            <div className="flex bg-slate-200 border p-3 rounded">
              <MdEmail className="mr-3 text-xl" />
              <input
                type="email"
                pattern=".+@example\.com"
                name="email1"
                id="email1"
                className="bg-transparent border-none border-b-gray-500 text-gray-900 sm:text-sm -md outline-none block w-full "
                placeholder="Your email id"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={mailsend}
                className="w-full mt-10 text-white bg-cyan-500 hover:bg-cyan-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Send Mail
              </button>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Forgotpassmail;