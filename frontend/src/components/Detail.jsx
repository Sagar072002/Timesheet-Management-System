import React,{useEffect,useState} from 'react';
import {useNavigate } from 'react-router-dom';
import {RxCross2} from "react-icons/rx"

const Profile = () => {
    const [isVisible, setIsVisible] = useState(true);
   
    const handleCrossClick = () => {
      setIsVisible(false);
    };
  
    if (!isVisible) {
      return null; // If isVisible is false, return null to render nothing
    }
  return (
    <section className=" p-3">
    <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
    
      <div className="min-w-[350px] bg-white  rounded-md  min-h-[350px]   md:mt-0 sm:max-w-md xl:p-0 relative border border-slate-400">
          <div className='absolute top-2 right-2 mt-2 mr-2 bg-slate-400 text-white hover:text-slate-700 rounded-full p-1'>
            <RxCross2 className='text-2xl'onClick={handleCrossClick}/>
          </div>
        <div className="flex gap-10 w-full justify-center items-center mt-10">
            <div className="left leading-10">
            <p>Name:</p>
            <p>Employee ID:</p>
            <p>Email:</p>
            <p>Gender:</p>
            <p>Age:</p>
            <p>Phone:</p>
            <p>Address:</p>
           
            </div>
            <div className="right leading-10">
            <p>Sagar Negi</p>
            <p>GEU-123 </p>
            <p>abc@gmail.com</p>
            <p>Male</p>
            <p>22</p>
            <p>9876543212</p>
            <p>India</p>
            </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Profile