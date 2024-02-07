import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaUser,FaPhoneAlt,FaBabyCarriage,FaLock,FaSearchLocation} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import {CgGenderMale} from "react-icons/cg"

const Register = () => {

  const n=useNavigate()


  const handleregister=async ()=>{
    if(document.getElementById('password').value===""){
      alert("Name Cannot Be Empty")
    }
    if(document.getElementById('employeeid').value===""){
      alert("Password Cannot Be Empty")
    }
    if(document.getElementById('confirm-password').value===""){
      alert("Confirm Passsword Cannot Be Empty")
    }
    // console.log(document.getElementById('name').value)
    // console.log(document.getElementById('employeeid').value)
    // console.log(document.getElementById('gender').value)
    // console.log(document.getElementById('password').value)
    // console.log(document.getElementById('confirm-password').value)
    // console.log(document.getElementById('email').value)
    // console.log(document.getElementById('phone').value)
    // console.log(document.getElementById('age').value)
    // console.log(document.getElementById('address').value)
    const name=document.getElementById('name').value
    const empid=document.getElementById('employeeid').value
    const gender=document.getElementById('gender').value
    const pass1=document.getElementById('password').value
    const pass2=document.getElementById('confirm-password').value
    const email=document.getElementById('email').value
    const ph=document.getElementById('phone').value
    const age=document.getElementById('age').value
    const add=document.getElementById('address').value
    const response = await fetch('api/v1/auth/users/',
      {
        method:'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          'employeeid':empid,//"username":empid use this username is a mandatory one 
          "name":name,
          "gender":gender,
          "email":email,
          "phone_number":ph,
          "age":age,
          "address":add,
          'password1':pass1,
          'password2':pass2,
        })
      }     
    );
    
      const data=await response.json()
      console.log(data)
      if(!response.ok){
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        alert(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
      }
      if(response.ok){

        // response.status
        alert(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
       
        n('/')
      
      }
      // console.log(data.errors.username[0])
      console.log(data.message)
    
    // const data=await response.json()
    // console.log(data)
    // console.log(data.errors.username[0])
    // console.log(data.message)

  }
 
  return (
    <section className="bg-gray-50 p-3">
    <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-md shadow min-w-[650px]  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="px-2 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-xl -mt-5 font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
            Create an account
          </h1>
          <div className="space-y-4 md:space-y-2" action="#">
            <div className="flex w-full gap-8">
           <div className="flex flex-col gap-5 w-full">
           <div className=''>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaUser className='mr-3' />
              <input
                type="text"
                name="name"
                id="name"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full  "
                placeholder="Your Name"
                required=""
              />
              </div>
            </div>
            <div>
              <label
                htmlFor="employeeid"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Employee ID
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
                <FaUser className='mr-3' />

              <input
                type="text"
                name="employeeid"
                id="employeeid"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full  "
                placeholder="Employee ID"
                required=""
              />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
             <CgGenderMale className='mr-3 text-xl'/>
              <select                 className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md 0 outline-none block w-full "
 name="gender" id="gender">
  <option className='rounded-none text-gray-900'  value="">Selet a category</option>
  <option className='rounded-none text-gray-900' value="Male">Male</option>
  <option className='rounded-none text-gray-900' value="Female">Female</option>
  <option className='rounded-none text-gray-900' value="Other">Other</option>
</select>
   </div>
            </div>
            
             <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaLock className='mr-3' />

              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                required=""
              />
              </div>
            </div>
            <div >
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaLock className='mr-3' />
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                required=""
              />
                            </div>

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
              <div className="flex bg-slate-50 border p-3 rounded">
              <MdEmail className='mr-3' />

              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                placeholder="Your Email"
                required=""
              />
 </div>

             </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaPhoneAlt className='mr-3' />

              <input
                type="number"
                name="phone"
                id="phone"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                placeholder="Your Phone"
                required=""
              />
                            </div>

            </div>
            <div>
               <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Age
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaBabyCarriage className='mr-3' />

              <input
                type="number"
                name="age"
                id="age"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full  "
                placeholder="Your age"
                required=""
              />
                            </div>

             </div>
            <div >
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaSearchLocation className="mr-3 mt-2"/>
              <textarea
                type="text"
                name="address"
                id="address"
                rows={4}
                placeholder="Your address"
                className="mb-3 bg-transparent resize-none border-none border-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full p-2.5 "
                required=""
                />
                </div>
            </div>
            </div>
            </div>
            
            <div className="flex pt-4 justify-between">
              <div>
            <input type="checkbox" name="" id="" />
        <span className="text-md font-md text-gray-500 pl-2 pb-3">Register as Admin</span>
        </div>
      <p className="text-md font-light text-gray-500 pb-3">
              Already have an account?{" "}
              <Link
               to="/"
                className="font-medium text-blue-600 hover:underline "
              >
                Login here
              </Link>
            </p>
    </div>

            <button
              type="submit"
              onClick={handleregister}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-3 text-center"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Register