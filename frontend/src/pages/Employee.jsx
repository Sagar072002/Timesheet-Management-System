import React, { useState } from "react";
import logo from "../assets/user_img.jpg"
import { Link } from "react-router-dom";

const Employee = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const boxShadowStyle1 = {
    transition: 'box-shadow 0.3s ease',
    boxShadow: isHovered1
      ? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      : 'none',
  };
  const boxShadowStyle2 = {
    transition: 'box-shadow 0.3s ease',
    boxShadow: isHovered2
      ? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      : 'none',
  };
  const boxShadowStyle3 = {
    transition: 'box-shadow 0.3s ease',
    boxShadow: isHovered3
      ? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      : 'none',
  };
  const boxShadowStyle4 = {
    transition: 'box-shadow 0.3s ease',
    boxShadow: isHovered4
      ? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      : 'none',
  };
  return (
    <div className=" flex ">
      <div className="w-1/4 bg-gray-500  p-6 pt-10">
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
        <Link to="/profile">  <button className="px-8 py-4 rounded bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white">
            Edit Profile
          </button>
          </Link>
          <button className="px-8 py-4 rounded bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white">
            Logout
          </button>
        </div>
      </div>
      <div className="p-10 bg-blue-gray-200 h-full w-3/4 bg-gray-300">
        <h2 className="font-bold text-2xl uppercase text-center">Employee Dashboard</h2>
        <div className=" flex gap-6 h-1/2 p-8 m-3 mb-1 justify-center items-center">
        <div className="w-1/2 h-60 bg-white rounded-md flex justify-center items-center text-2xl font-bold uppercase transition-all duration-300 ease hover:cursor-pointer"  style={boxShadowStyle1}
      onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}>TimeSheet</div>
            <div className="w-1/2 h-60 bg-white rounded-md flex justify-center items-center text-2xl font-bold uppercase transition-all duration-300 ease hover:cursor-pointer"  style={boxShadowStyle2}
      onMouseEnter={() => setIsHovered2(true)}
      onMouseLeave={() => setIsHovered2(false)}>ScoreCard</div>
        </div>
        <div className=" flex gap-6 h-1/2 p-8 m-3 mt-0 mb-1 justify-center items-center">
        <div className="w-1/2 h-60 bg-white rounded-md flex justify-center items-center text-2xl font-bold uppercase transition-all duration-300 ease hover:cursor-pointer"  style={boxShadowStyle3}
      onMouseEnter={() => setIsHovered3(true)}
      onMouseLeave={() => setIsHovered3(false)}>Tasks</div>
        <div className="w-1/2 h-60 bg-white rounded-md flex justify-center items-center text-2xl font-bold uppercase transition-all duration-300 ease hover:cursor-pointer"  style={boxShadowStyle4}
      onMouseEnter={() => setIsHovered4(true)}
      onMouseLeave={() => setIsHovered4(false)}>
        <Link to="/contact">Contact</Link>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
