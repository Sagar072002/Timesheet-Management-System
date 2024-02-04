import React, { useState } from 'react';
import logo from "../assets/user_img.jpg";


const Profile = () => {

  return (
    <section className="bg-gray-50 p-3">
    <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-md shadow min-w-[650px]  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="px-2 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-xl -mt-5 font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
            Edit User Profile
          </h1>
          <form className="space-y-4 md:space-y-2" action="#">
          <div className="flex justify-center mb-5">
  <input
    type="file"
    accept="image/*"
    className="hidden"
    id="logoInput"
  />
  <label htmlFor="logoInput" className="cursor-pointer">
    <img src={logo} className="h-16 w-16 rounded-full" alt="" />
  </label>
</div>
            <div className="flex w-full gap-5">
           <div className="flex flex-col gap-5 w-full">
           <div className=''>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Your Name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="employeeid"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Employee ID
              </label>
              <input
                type="text"
                name="employeeid"
                id="employeeid"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Employee ID"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
             
              <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " name="cars" id="cars">
  <option className='rounded-none'  value="">Selet a category</option>
  <option className='rounded-none' value="Male">Male</option>
  <option className='rounded-none' value="Female">Female</option>
  <option className='rounded-none' value="Other">Other</option>
</select>
            </div>
            
             <div>
              <label
                htmlFor="current-password"
                className="block mb-2 mt-2 text-sm font-medium text-gray-900 "
              >
                Current Password
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                required=""
              />
            </div>
            <div >
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                New Password
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                placeholder="••••••••"
                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                required=""
              />
            </div>
           </div>
           
           
            <div className='flex flex-col gap-5 w-full'>
          
             <div>
               <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Your Email"
                required=""
              />
             </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Your Phone"
                required=""
              />
            </div>
            <div>
               <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Your age"
                required=""
              />
             </div>
            <div >
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <textarea
                type="text"
                name="address"
                id="address"
                rows={6}
                placeholder="Your address"
                className=" mb-3 resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                required=""
              />
            </div>
            </div>
            </div>
            
            
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-3 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Profile