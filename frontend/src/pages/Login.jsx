// This part is contributed by Akanksha
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../index.css";
import Fpm from "../components/forgotpassmail";
import { MdEmail } from 'react-icons/md';


const Login = () => {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [isvisible,setIsvisible]=useState(false)
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const n = useNavigate();
  
  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle forgot password
  function fp(){
    setIsvisible(!isvisible)    
  }

  // to check user authentication status
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const uname = sessionStorage.getItem("userName");
        const admin = sessionStorage.getItem("userType");

        if (sessionStorage.getItem("auth") === "true" && sessionStorage.getItem("useremail") !== "") 
        {          
          if (admin) {
            n("/admin");
          } 
          else {
            n("/newemp");
          }
        }
        
      } 
      catch (error) {}
    };
    fetchData();
  }, []);

  // Function to fetch week range timesheet
  const fetchWeekRange = async () => {
    try
    {
      const response = await axios.post('http://localhost:3000/daterange',
        {
          "userid": sessionStorage.getItem("userName"),
        }         
      );   
      const data= response.data;
      console.log("week_ranges",data)
      if(response.status!==200)
      {
        console.log(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
      }
      if(response.status===200)
      {
        sessionStorage.setItem("date_ranges",JSON.stringify(data.dateRanges))  
      }   
    }
    catch(error)
    {
      toast.error("Error in fetching week range")
    }
  }

  // Function to handle login
  const handleLogin = async () => {
    var uemail=""
    var password=""
    if(active)
    {
      uemail = document.getElementById("email1").value;
     password= document.getElementById("password1").value;
    }
    else
    {
      uemail = document.getElementById("email").value;
      password = document.getElementById("password").value;
    }
    try 
    {
      if (uemail === "") toast.error("email id cannot be empty");
      if (password === "") toast.error("Password cannot be empty");
      sessionStorage.setItem("useremail", uemail);
      sessionStorage.setItem("password", password);
      try 
      {
        const response = await axios.post("http://localhost:3000/login", {
          email: uemail,
          password: password,
        });
        if (response.status !== 200) 
        {
          const uemail = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          if (uemail === "" && password === "")
            toast.error("Invalid credentials");
        }        
        if(response.data.user.is_admin!==active)
        {
          if(active)
          {
            toast.error("Invalid User")
            setTimeout(() => {
              toast.error("Account not found in Admin Data");
            }, 500);
            setTimeout(() => {
              toast.info("Try as an Employee")
            }, 1500);
            return false
          }
          else
          {
            toast.error("Invalid User")
            setTimeout(() => {
              toast.error("Account not found in  Employee Data")
            }, 500);
            setTimeout(() => {
              toast.info("Try as an Admin")
            }, 1500);
            return false
          }
        }
        sessionStorage.setItem("data", JSON.stringify(response.data.user));
        const d = JSON.parse(sessionStorage.getItem("data"));
        const responseData = response.data.user;
        setData(responseData);

        if (response.status === 200) 
        {
          const uname = responseData.userid;
          const admin = responseData.is_admin;
          toast.success("Login successfully");
          sessionStorage.setItem("auth", "true");
          sessionStorage.setItem("2fa", responseData.twofa);
          sessionStorage.setItem("userName", uname);
          sessionStorage.setItem("userType", admin);

          const scoreresponse = await axios.post("http://localhost:3000/userscore", {
            id: response.data.user.userid,
          });
          sessionStorage.setItem("score", scoreresponse.data.score);
          fetchWeekRange();
          setTimeout(() => {
            if (admin) {
              n("/admin");
            } else {
              n("/newemp");
            }
          }, 4000); // Adjust the delay as needed
        }
      } 
      catch (error) {
        toast.error("Invalid Credentials");
      }
    } catch (error) {}
  };

  const handleEmployeeSelect = (option) => {
    setSelectedOption(option);
  };

  // JSX structure for the Login component
  return (
    <>
      <section className="logindiv" style={{backgroundColor:"#EDF4F2"}}>
        <ToastContainer />
        <div className={`wrapper ${active ? 'active' : ''}`}>
          <span className="bg-animate"></span>
          <span className="bg-animate2"></span>
          {/* Employee Login */}
          <div className="form-box login">
            <h2 className="animation mb-5" style={{ '--i': 0, '--j': 21 }}>Sign in</h2>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <label htmlFor="">Email</label>
              <div className='flex mt-2 bg-white rounded-sm justify-center items-center'>
                <MdEmail className='mx-3 mr-1 text-xl' />
                <input type="email" name="email" id="email" placeholder="Your email id"/>
              </div>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <label htmlFor="">Password</label>
              <div className='flex mt-2 bg-white rounded-sm justify-center items-center'>
                <FaLock className='mx-3 mr-1 text-xl' />
                <input
                  placeholder="Your Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className='mx-3 text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className='mx-3 text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            {/* Forgot password link */}
            {isvisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                <div className="bg-white p-8 rounded-lg ">
                  <Fpm func={fp} mail={"email3"}/>
                </div>
              </div>
            )}

            <button
              onClick={fp}
              className="text-sm -ml-20 mb-3 font-bold animation text-cyan-500 hover:underline "
              style={{ '--i': 3, '--j': 24 }}
            >
              Forgot password?
            </button>
            <button type="submit" className="btn animation" style={{ '--i': 4, '--j': 25 }} onClick={handleLogin}>
              Login
            </button>
            {/* Account registration link */}
            <div className="logreg-link animation" style={{ '--i': 5, '--j': 26 }}>            
              <p className="text-md font-medium text-white">
                  Don’t have an account yet ? &nbsp;
                <Link
                to="/register"
                className="font-bold text-cyan-500 hover:underline "
                >
                  Sign up
                </Link>
              </p>                  
            </div>
          </div>
          <div className="info-text login">
            <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Employee Login</h2>
            {/* Switch to Admin login */}
            <p className="animation text-lg  text-slate-800 font-bold mt-6 mr-10" style={{ '--i': 1,'--j':21 }}>Are you an admin?
              <a className="register-link hover:cursor-pointer hover:underline text-white font-medium ml-2" onClick={handleRegisterClick}>
                Sign in
              </a>
            </p>
          </div>
          {/* Admin Login */}
          <div className="form-box register">
            <h2 className="animation mb-2" style={{ '--i': 0, '--j': 21 }}>Sign in</h2>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <label htmlFor="">Email</label>
              <div className='flex mt-2 bg-white rounded-sm justify-center items-center'>
                <MdEmail className='mx-3 mr-1 text-xl' />
                <input type="email" name="email1" id="email1"  placeholder="Your email id"/>
              </div>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <label htmlFor="">Password</label>
              <div className='flex mt-2 bg-white rounded-sm justify-center items-center'>
                <FaLock className='mx-3 mr-1 text-xl' />
                <input
                  placeholder="Your password"
                  type={showPassword ? 'text' : 'password'}
                  name="password1"
                  id="password1"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className='mx-3 text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className='mx-3 text-xl cursor-pointer'
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            {/* Forgot password link */}
            {isvisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                <div className="bg-white p-8 rounded-lg ">
                  <Fpm func={fp} mail={"email4"}/>
                </div>
              </div>
            )}

            <button
              onClick={fp}
              className="text-sm -ml-20 mb-3 font-bold animation text-cyan-500 hover:underline "
              style={{ '--i': 3, '--j': 24 }}
            >
              Forgot password?
            </button>
            <button type="submit" className="btn animation" style={{ '--i': 4, '--j': 25 }} onClick={handleLogin}>
              Login
            </button>
            {/* Account registration link */}
            <div className="logreg-link animation" style={{ '--i': 5, '--j': 26 }}>              
              <p className="text-md font-medium text-white">
                Don’t have an account yet ? &nbsp;
                <Link
                  to="/register"
                  className="font-bold text-cyan-500 hover:underline "
                >
                  Sign up
                </Link>
              </p>                  
            </div>
          </div>
          <div className="info-text register">
            <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Admin Login</h2>          
            <p className="animation text-lg  text-slate-800 font-bold mt-6 mr-10" style={{ '--i': 18,'--j':1 }}>Are you an Employee?
              <a className="login-link hover:cursor-pointer hover:underline text-white font-medium ml-2" onClick={handleLoginClick}>Sign in</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;