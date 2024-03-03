import React from 'react';
import welcome from '../assets/welcome.webp'
import { FaCamera, FaUser } from 'react-icons/fa';

const NewEmploye = () => {
  return (
    <div className="w-full h-lvh flex">
        <div className="w-1/5 bg-slate-200 flex flex-col p-3 pl-10">
            <div className="ml-12 mt-8 relative bg-white p-2 w-28 h-28 rounded-full flex" >
            <FaUser className='ml-5 mt-5 w-14 h-14'/>
            <FaCamera className='text-xl absolute right-0 bottom-0' />
            </div>
            <p className='ml-16 mt-4 font-bold text-lg'>Hii Sagar</p>
            <div className='mt-16 text-xl  flex flex-col gap-8 justify-center items-center'>
                <p>Current Timesheet</p>
                <p>Timesheet List</p>
                <p>Edit Profile</p>
                <p>Logout</p>
            </div>
            <div className="-ml-10 mt-24 font-bold text-xl ">
                <p className='text-center
                '>©2023-2024</p>
                <p className='text-center
                '>All rights reserved</p>
            </div>
        </div>
        <div className="w-4/5 bg-black flex justify-center items-center">
            <img src={welcome} className='w-2/4 h-2/4' alt="" />
        </div>
    </div>
  )
}

export default NewEmploye