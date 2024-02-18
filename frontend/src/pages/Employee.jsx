import React, { useState,useEffect } from "react";
import Profile from "../components/Profile";
import {FaUser} from "react-icons/fa"
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Timesheet from "../components/Timesheet";
import TimesheetList from "./TimesheetList";

const Employee = () => {
  const n = useNavigate();
  const [username, setUsername] = useState("");

  const [profilevalue, setProfileValue] = useState("");

  useEffect(
    ()=>{
      const fetchedUsername = sessionStorage.getItem("userName");
      console.log("Fetched username:",fetchedUsername);
    setUsername(fetchedUsername);
    displayData();
            if(sessionStorage.getItem("auth") === "true" &&sessionStorage.getItem("userName")[0]==='A' ){
            n("/admin")

            }
           else if (sessionStorage.getItem("auth") === "true" && sessionStorage.getItem("userName") !=="") {
             n("/Employee");
           }
           else{
            n("/");
           }
  
    },[]
    )

  const displayData = async() => {
    // const d=JSON.parse(sessionStorage.getItem("data"))
    // console.log(d.user.name)
    
    // console.log("DATAS",d);
    // console.log("Displaying data");
    try{
      const named = sessionStorage.getItem("userName");
      const url = `http://localhost:3000/users/${named}`;
      console.log("userid:",named)
      const response = await axios.get(url,
        {
         
        }     
      );
      
      const data=response.data
      console.log(data)
      setProfileValue(data)
      if(response.status!==200){
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        console.log(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
      }
  
        // response.status
      //   toast.success(
      //     `${response.status}\n${response.statusText}\n${data.message}`
      //  )
      if(response.status===200){
  
       //toast.success("Registration successful!");
      
       console.log('Fetched values:');
      
  
      
    }
      
      }
      catch(error){
        toast.error(error.message)
      }
  }  
  const handleLogout=()=>{
    toast.success("Log out successfully")
    sessionStorage.setItem('auth',"false")
    // sessionStorage.setItem("accessToken", "");
    //   sessionStorage.setItem("refreshToken", "");
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

  const updateProfileValue = (updatedProfile) => {
    setProfileValue(updatedProfile);
  };
  
  return (
    <div className="back  w-full p-4 pt-7">
      <ToastContainer/>
      <div className="">
    <div className="">
  <h1 class="uppercase text-center pt-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-5xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500">Employee Dashboard</span> </h1>

  <div className="">
  <span className="text-white font-medium text-lg mr-2 absolute right-28 top-14">Hii, {JSON.parse(sessionStorage.getItem("data")).name}</span>
  </div>
  
  <FaUser onClick={toggleProfileVisibility} className=' w-8 h-8  text-white text-xl absolute right-14 top-12' />
        </div>
        {isProfileVisible && (
          <div className=" bg-slate-200 z-10 border border-slate-400 rounded absolute right-0 top-15 max-w-[500px] p-5 pt-2 h-32">
            <div className="border-white  bg-slate-600 rounded-full p-2 flex justify-center">
                          <FaUser             onClick={toggleProfileVisibility}
            className="text-2xl text-white"
           />
</div>
            <div className="editprofilediv mt-3 text-lg" >
              <p className="border-b font-medium border-red-700 py-1 px-2 hover:text-red-700 hover:cursor-pointer" onClick={function(event){ toggleProfileDivVisibility(); displayData()}}>Edit Profile</p>
              <button className="px-4 font-medium hover:text-red-700 hover:cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
        {isProfileDivVisible && (
          <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-10">
            <Profile
              profilevalue={profilevalue.user}
              onUpdateProfile={updateProfileValue}
            />
          </div>
        )}

        </div>
        <div>
        

        </div>
   
     <Timesheet/> 
   <TimesheetList/>
      
    </div>
  );
};

export default Employee;

