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

  const [profilevalue, setProfileValue] = useState("");

  useEffect(
    ()=>{
      const fetchedUsername = sessionStorage.getItem("userName");
    setUsername(fetchedUsername);
    displayData();
          //  if (sessionStorage.getItem("auth") === "true" && sessionStorage.getItem("userName") !=="") {
          //    n("/Employee");
          //  }
          //  else{
          //   n("/");
          //  }
  
    },[]
    )

  const displayData = async() => {
    console.log("Displaying data");
    try{
      const named = sessionStorage.getItem("userName");
      const url = `api/v1/users/get/${named}`;
      console.log("Name:",named)
      const response = await fetch(url,
        {
          method:'GET',
          headers: {"Content-type": "application/json; charset=UTF-8"},
          // body: JSON.stringify({
          //   'employeeid':empid,//"username":empid use this username is a mandatory one 
          //   "name":name,
          //   "gender":gender,
          //   "email":email,
          //   "phone_number":ph,
          //   "age":age,
          //   "address":add,
          //   'password':pass1,
          //   're_password':pass2,
          // })
        }     
      );
      
      const data=await response.json()
      console.log(data)
      setProfileValue(data)
      if(!response.ok){
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
      if(response.ok){
  
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
  const updateProfileValue = (updatedProfile) => {
    setProfileValue(updatedProfile);
  }
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
  <span className="text-white mr-2 absolute right-28 top-5">Hii, {profilevalue.name}</span></div>
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
              <p className="border-b border-red-700 py-1 px-2 hover:cursor-pointer" onClick={ toggleProfileDivVisibility}>Edit Profile</p>
              <button className="px-4 hover:cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
        {isProfileDivVisible && (
          <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-10">
            <Profile
              profilevalue={profilevalue}
              onUpdateProfile={updateProfileValue} // Pass the function to update profile value
            
            />
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

