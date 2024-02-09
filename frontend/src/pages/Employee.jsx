import React, { useState,useEffect } from "react";
import logo from "../assets/user_img.jpg"
import Timesheet from "../components/Timesheet";
import Profile from "../components/Profile";
// import Scorecard from "../components/Scorecard";
import {FaUser} from "react-icons/fa"
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

const Employee = () => {
  const n = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(
    ()=>{
      const fetchedUsername = sessionStorage.getItem("userName");
    setUsername(fetchedUsername);
          //  if (sessionStorage.getItem("auth") === "true" && sessionStorage.getItem("userName") !=="") {
          //    n("/Employee");
          //  }
          //  else{
          //   n("/");
          //  }
  
    },[]
    )
  const handleLogout=()=>{
    toast.success("Log out successfully")
    sessionStorage.setItem('auth',"false")
    sessionStorage.setItem("accessToken", "");
      sessionStorage.setItem("refreshToken", "");
      sessionStorage.setItem("userName", "");
      sessionStorage.setItem("password", "");
      setTimeout(() => {
        n('/');
      }, 4000); // Adjust the delay as needed

  }
  
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfileVisibility = () => {
    setProfileVisible(!isProfileVisible);
  };

  const [isProfileDivVisible, setProfileDivVisible] = useState(false);

  const toggleProfileDivVisibility = () => {
    setProfileDivVisible(!isProfileDivVisible);
  };
  return (
    <div className="bg-slate-500 w-full">
      <ToastContainer/>
      <div className="">
    <div className="">
  <h2 className="font-bold text-2xl uppercase text-center pt-4 text-white">Employee Dashboard</h2>
  <div className="">
  <span className="text-white mr-2 absolute right-28 top-5">Hii, {username}</span></div>
  <FaUser onClick={toggleProfileVisibility} className=' w-8 h-8  text-white text-xl absolute right-14 top-3' />
        </div>
        {isProfileVisible && (
          <div className=" bg-slate-200 border border-slate-400 rounded absolute right-0 top-19 max-w-[500px] p-5 pt-2 h-32">
            <div className="flex justify-center">
              <img
                src={logo}
                className="w-10 h-10 mix-blend-color-burn"
                alt=""
              />
            </div>
            <div className="editprofilediv mt-3 text-lg" >
              <p className="border-b border-red-700 py-1 px-2 hover:cursor-pointer" onClick={toggleProfileDivVisibility}>Edit Profile</p>
              <button className="px-4 hover:cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
        {isProfileDivVisible && (
          <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-10">
            <Profile/>
          </div>
        )}
        </div>
        <div className="flex">
      <div className=" w-3/4">
        <Timesheet/>
      </div>
      {/* <div className="">
        <Scorecard/>
      </div> */}
      </div>
    </div>
  );
};

export default Employee;
