import React, { useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaUser,FaPhoneAlt,FaBabyCarriage,FaLock,FaSearchLocation} from "react-icons/fa"
import {MdEmail, MdVisibility, MdVisibilityOff} from "react-icons/md"
import {CgGenderMale} from "react-icons/cg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {

  const n=useNavigate()
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  // Function to handle image change
  const handleImageChange = (e) => {
    try
    {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      var size = e.target.files[0].size;
      // Check if the image size is within the limit
      if(size/1000>52){
        toast.error("Upload an image with file size less than 50kb");
        return false
      }
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = error => {
        console.log("error ",error);
      }
    }
    catch{}
  };

  // Function to handle registration
  const handleregister=async ()=>{
    // Fetch values from input fields
    const name=document.getElementById('name').value
    const empid=""
    const gender=document.getElementById('gender').value
    const pass1=document.getElementById('password').value
    const pass2=document.getElementById('confirm-password').value
    const email=document.getElementById('email').value
    const ph=document.getElementById('phone').value
    const age=document.getElementById('age').value
    const add=document.getElementById('address').value
    const admin=document.getElementById('isAdmin').checked
    const im=document.getElementById('photo').value

    // Validation checks
    if(im===""){
    toast.error("Upload your image");
    return false
    }
    if(name===""){
      toast.error("Name cannot be empty")
      return false
    }
    if(gender===""){
      toast.error("Gender cannot be empty")
      return false
    }
    if(pass1===""){
      toast.error("Password cannot be empty")
      return false
    }
    if(pass2===""){
      toast.error("Confirm Password cannot be empty")
      return false
    }
    if(email===""){
      toast.error("Email cannot be empty")
      return false
    }
    if(ph===""){
      toast.error("Phone cannot be empty")
      return false
    }
    if(age===""){
      toast.error("Age cannot be empty")
      return false
    }
    if(add===""){
      toast.error("Address cannot be empty")
      return false
    }
    if(add.length<20){
      toast.error("Invalid Address")
      return false
    }
    if(pass1!==pass2){
      toast.error("Passwords do not match")
      return false

    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      toast.error("Enter a vaild Email")
      return false
    }
    if(ph.length<10 && ph.length>10){
      toast.error("Enter a vaild Phone Number")
      return false
    }
    if(age>="60" || age<"18" ){
      toast.error("Enter a vaild Age")
      return false
    }    
    const passregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passregex.test(pass1)){
      toast.error("Enter a vaild Password")
      toast.info("Password must have \n\nAt least one lowercase letter \n\nAt least one uppercase letter\n\nAt least one digit\n\n At least one special character from the set @$!%*?&\n\nMinimum length of 8 characters.",);
      return false
    }
    
    try
    {
      // Make API request for registration
      const response = await axios.post('http://localhost:3000/register',
      {       
        'userid':empid,
        "name":name,
        "gender":gender,
        "email":email,
        "phone_number":ph,
        "age":age,
        "address":add,
        'password':pass1,
        're_password':pass2,
        'is_admin':admin,
        'reset_link':false,
        'image':image,
      });
    
      const data= response.data;
      if(response.status!==200)
      {
        console.log(
          `${response.status}\n${response.statusText}\n${data.message}`
        )
      }
      if(response.status===200)
      {
        toast.success("Registration successful!");    
        // Delay redirect to ensure success message is shown
        setTimeout(() => {
          n('/');
        }, 4000); // Adjust the delay as needed
      }
        
    }
    catch(error)
    {
      toast.error("User Already Exists")
    }
    
  }

  // JSX structure for the Register component
  return (
    <section className="" >
      <ToastContainer/>
      <div className=" flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full border-2 rounded-md shadow min-w-[730px]  md:mt-0 sm:max-w-md xl:p-0">
          <div className="px-2 space-y-4 md:space-y-4 sm:p-8" style={{backgroundColor:"#1995AD"}}>
            <h1 className="text-xl -mt-5 font-bold leading-tight tracking-tight text-center text-white md:text-2xl ">
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-2" action="#">
              <div className="flex w-full gap-8">
                <div className="flex flex-col gap-5 w-full">
                  <div className=''>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Name
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <FaUser className='mr-3' />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full  "
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Gender
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <CgGenderMale className='mr-3 text-xl'/>
                      <select                 className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md 0 outline-none block w-full "
                        name="gender" id="gender">
                        <option className='rounded-none text-black'  value="">Select a category</option>
                        <option className='rounded-none text-black' value="Male">Male</option>
                        <option className='rounded-none text-black' value="Female">Female</option>
                        <option className='rounded-none text-black' value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Password<span className="text-white font-medium"> (Min. 8 characters and Alphanumeric)</span>
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                  <FaLock className="mr-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full "
                    required
                  />
                  {/* Eye icon to toggle password visibility */}
                  {showPassword ? (
                    <MdVisibilityOff onClick={togglePasswordVisibility} className="cursor-pointer mt-1" />
                  ) : (
                    <MdVisibility onClick={togglePasswordVisibility} className="cursor-pointer mt-1" />
                  )}
                  </div>
                  </div>

                  <div>
  <label htmlFor="confirm-password" className="block mb-2 text-sm font-bold text-white ">
    Confirm password
  </label>
  <div className="flex bg-slate-50 border p-3 rounded">
    <FaLock className='mr-3' />
    <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm-password"
      id="confirm-password"
      placeholder="••••••••"
      className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full "
      required
    />
    {/* Eye icon to toggle confirm password visibility */}
    {showConfirmPassword ? (
      <MdVisibilityOff onClick={toggleConfirmPasswordVisibility} className="cursor-pointer mt-1" />
    ) : (
      <MdVisibility onClick={toggleConfirmPasswordVisibility} className="cursor-pointer mt-1" />
    )}
  </div>
</div>


                  <div>
                    <label htmlFor="photo" className="block mb-2 text-sm font-bold text-white">
                      Upload your image
                    </label>
                    <input type="file" id="photo" onChange={handleImageChange} className="block mb-2 text-sm font-bold text-white" />
                  </div>
                </div>
              
                <div className='flex flex-col gap-5 w-full'>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Email
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <MdEmail className='mr-3' />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-transparent border-none border-b-gray-300 text-black sm:text-sm -md outline-none block w-full "
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Phone
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <FaPhoneAlt className='mr-3' />
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full "
                        placeholder="Your Phone"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Age
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <FaBabyCarriage className='mr-3' />

                      <input
                        type="number"
                        name="age"
                        id="age"
                        className="bg-transparent border-none border-b-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full  "
                        placeholder="Your age"
                        required
                      />
                    </div>
                  </div>
                  <div >
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-bold text-white "
                    >
                      Address
                    </label>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <FaSearchLocation className="mr-3 mt-2"/>
                      <textarea
                        type="text"
                        name="address"
                        id="address"
                        rows={3}
                        placeholder="Your address"
                        className="mb-3 bg-transparent resize-none border-none border-gray-300 text-slate-600 sm:text-sm -md outline-none block w-full p-2.5 "
                        required
                        />
                    </div>
                    <br></br>                    
                  </div>
                </div>
              </div>
              
              {/* Admin checkbox and Login link */}
              <div className="flex  justify-between">
                <div>
                  <input type="checkbox" name="isAdmin" id="isAdmin" />
                  <span className="text-md font-bold text-white pl-2 pb-1">Register as Admin</span>
                </div>
                <p className="text-md font-bold text-white pb-1">
                  Already have an account?
                  <Link
                  to="/"
                    className="font-bold ml-1 text-cyan-100 hover:underline "
                  >
                    Login here
                  </Link>
                </p>
              </div>

              {/* Register button */}
              <div className='flex justify-end'>
                <button
                  type="submit"
                  onClick={handleregister}
                  // className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-md text-sm px-5 py-3 text-center"
                  className="w-1/3  text-white bg-cyan-500 hover:bg-cyan-400 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 ">
                    Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  )
}

export default Register




