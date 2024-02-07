import React, {  useState } from "react";
import logo from "../assets/user_img.jpg"
import Profile from "../components/Profile";
import EmployeeCard from "../components/EmployeeCard";

const Admin = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfileVisibility = () => {
    setProfileVisible(!isProfileVisible);
  };

  const [isProfileDivVisible, setProfileDivVisible] = useState(false);

  const toggleProfileDivVisibility = () => {
    setProfileDivVisible(!isProfileDivVisible);
  };
  
  return (
    <div className="relative flex">
     
      <div className="p-4 bg-blue-gray-200 w-full bg-gray-300">
        <div className="flex justify-between px-5">
          <p></p>
  <h2 className="font-bold text-2xl uppercase text-center">Admin Dashboard</h2>
<img src={logo} onClick={toggleProfileVisibility} className="w-10 h-10 mix-blend-color-burn " alt="" />
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
              <p className="px-4 hover:cursor-pointer">Logout</p>
            </div>
          </div>
        )}
        {isProfileDivVisible && (
          <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-10">
            <Profile/>
          </div>
        )}
  <div className="mt-4 flex justify-center p-4 ">
    <input
      className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-slate-600 focus:border-slate-600 block w-full p-3.5"
      type="search"
      name=""
      id=""
      placeholder="Search Employee here..."
    />
  </div>
  <div className="py-1 px-5 h-screen flex overflow-auto gap-5">
          {[1, 2, 3, 4].map((index) => (
            <EmployeeCard key={index} index={index} />
          ))}
         
        </div>
</div>
    </div>
  );
};

export default Admin;








