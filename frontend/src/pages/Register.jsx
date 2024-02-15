import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaUser,FaPhoneAlt,FaBabyCarriage,FaLock,FaSearchLocation} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import {CgGenderMale} from "react-icons/cg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Register = () => {
   
  // // useEffect(
  // // ()=>{
  // //        if (sessionStorage.getItem("auth") === "true" && sessionStorage.getItem("userName") !=="") {
  // //          n("/Employee");
  // //        }

  // // },[]
  // // )

  const n=useNavigate()


  const handleregister=async ()=>{
    
    const name=document.getElementById('name').value
    const empid=document.getElementById('employeeid').value
    const gender=document.getElementById('gender').value
    const pass1=document.getElementById('password').value
    const pass2=document.getElementById('confirm-password').value
    const email=document.getElementById('email').value
    const ph=document.getElementById('phone').value
    const age=document.getElementById('age').value
    const add=document.getElementById('address').value
    const admin=document.getElementById('isAdmin').checked
     
    if(name===""){
toast.error("Name cannot be empty")
    }
    if(empid===""){
toast.error("Employee ID cannot be empty")
    }
    if(gender===""){
toast.error("Gender cannot be empty")
    }
    if(pass1===""){
toast.error("Password cannot be empty")
    }
    if(pass2===""){
toast.error("Confirm Password cannot be empty")
    }
    if(email===""){
toast.error("Email cannot be empty")
    }
    if(ph===""){
toast.error("Phone cannot be empty")
    }
    if(age===""){
toast.error("Age cannot be empty")
    }
    if(add===""){
toast.error("Address cannot be empty")
}
if(pass1!==pass2){
      toast.error("Passwords do not match")

    }
    // if(!document.getElementById('employeeid').value.startsWith("A") && !document.getElementById('employeeid').value.startsWith("E")){
    //   toast.error("User ID should start with either 'A' or 'E'")
    // }

    //  if(document.getElementById('isAdmin').checked)
    //    {
        
    //      if(!document.getElementById('employeeid').value.startsWith("A"))
    //      {
    //        toast.error("Uncheck the Checkbox to register as Employee")
    //        return;
    //      }
    //    }
    //    else
    //    {
     
    //      if(!document.getElementById('employeeid').value.startsWith("E"))
    //      {
    //       toast.error("Check the Checkbox to register as Admin")
    //       return;
    //      }
    //    }
    try{
    const response = await axios.post('http://localhost:3000/register',
      {
       
          'userid':empid,//"username":empid use this username is a mandatory one 
          "name":name,
          "gender":gender,
          "email":email,
          "phone_number":ph,
          "age":age,
          "address":add,
          'password':pass1,
          're_password':pass2,
          'is_admin':admin,
      }     
    );
    
    const data= response.data;
    console.log(data)
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

     toast.success("Registration successful!");
    
    

    // Delay redirect to ensure success message is shown
    setTimeout(() => {
      n('/');
    }, 4000); // Adjust the delay as needed
  }
    
    }
    catch(error){
      console.log(admin);
      toast.error("User Already Exists")
    }
    
    // console.log(data.errors.username[0])
    // toast.error(data.message)
    
    // const data=await response.json()
    // console.log(data)
    // console.log(data.errors.username[0])
    // console.log(data.message)

  }
 
  return (
    <section className="bg-gray-50 p-3">
      <ToastContainer/>
    <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-md shadow min-w-[730px]  md:mt-0 sm:max-w-md xl:p-0 ">
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
                className="block mb-2 text-sm font-bold text-gray-900 "
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
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                User ID &nbsp;
              <span className='text-slate-500 font-medium'></span>
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
                <FaUser className='mr-3' />

              <input
                type="text"
                name="employeeid"
                id="employeeid"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full  "
                placeholder="User ID"
                required=""
              />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Gender
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
             <CgGenderMale className='mr-3 text-xl'/>
              <select                 className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md 0 outline-none block w-full "
 name="gender" id="gender">
  <option className='rounded-none text-gray-900'  value="">Select a category</option>
  <option className='rounded-none text-gray-900' value="Male">Male</option>
  <option className='rounded-none text-gray-900' value="Female">Female</option>
  <option className='rounded-none text-gray-900' value="Other">Other</option>
</select>
   </div>
            </div>
            
             <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Password<span className="text-slate-500 font-medium">(Atleast 8 characters and Alphanumeric)</span>
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
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Confirm password
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaLock className='mr-3' />
              <input
                type="password"
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
                className="block mb-2 text-sm font-bold text-gray-900 "
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
                className="block mb-2 text-sm font-bold text-gray-900 "
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
                className="block mb-2 text-sm font-bold text-gray-900 "
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
                className="block mb-2 text-sm font-bold text-gray-900 "
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
            <input type="checkbox" name="isAdmin" id="isAdmin" />
        <span className="text-md font-md text-gray-500 pl-2 pb-3">Register as Admin</span>
        </div>
      <p className="text-md font-light text-gray-500 pb-3">
              Already have an account?{" "}
              <Link
               to="/"
                className="font-bold text-blue-600 hover:underline "
              >
                Login here
              </Link>
            </p>
    </div>

            <button
              type="submit"
              onClick={handleregister}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-md text-sm px-5 py-3 text-center"
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