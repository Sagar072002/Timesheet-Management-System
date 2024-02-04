import React from "react";
import logo from "../assets/user_img.jpg"
import { Link } from "react-router-dom";

const Admin = () => {
 
  return (
    <div className=" flex ">
      <div className="w-1/4  bg-gray-500  p-6 pt-10">
        <div className="pl-20 mb-5">
          <img className="w-24 h-24 rounded-full" src={logo} alt="" />
        </div>
        <div className="p-5 text-white font-bold">
          <h2 className="text-2xl mb-7 uppercase font-bold">Personal Information</h2>
          <div className=" flex gap-10">
          <div className="uppercase">
              <p className="leading-10">Name</p>
              <p className="leading-10">Employee ID </p>
              <p className="leading-10">Email</p>
              <p className="leading-10">Phone</p>
              <p className="leading-10">Gender </p>
              <p className="leading-10">Age</p>
              <p className="leading-10">Address</p>
            </div>
            <div className="right">
              <p className="leading-10">Sagar</p>
              <p className="leading-10">GEU-20201076</p>
              <p className="leading-10">abc@gmail.com</p>
              <p className="leading-10">9999999999</p>
              <p className="leading-10">Male</p>
              <p className="leading-10">22</p>
              <p className="leading-10">Uttarakhand,India</p>
            </div>
          </div>
        </div>
        <div className="buttons flex gap-4 mt-5">
        <Link to="/profile"> <button className="px-8 py-4 rounded bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white">
       Edit Profile 
          </button>
          </Link>
          <button className="px-8 py-4 rounded bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white">
            Logout
          </button>
        </div>
      </div>
      <div className="p-4 bg-blue-gray-200 h-full w-3/4 bg-gray-300 overflow-auto">
  <h2 className="font-bold text-2xl uppercase text-center">Admin Dashboard</h2>
  <div className="mt-4 flex justify-center p-4">
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-3.5"
      type="search"
      name=""
      id=""
      placeholder="Search Employee here..."
    />
  </div>
  <div className="max-h-[500px] overflow-auto">
  <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>
       <div className="flex mt-6 bg-slate-200 p-4 justify-between">
        <p>Sagar Negi</p>
        <p>GEU-20216976</p>
        <p>negis2673@gmail.com</p>
        <p>Timesheet</p>
      <p>Scorecard</p>  
       </div>

  </div>
</div>
    </div>
  );
};

export default Admin;








