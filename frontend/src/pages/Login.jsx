
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
  const [access1, setAccess1] = useState("");
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [isvisible,setIsvisible]=useState(false)
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    console.log(active)
    setActive(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const n = useNavigate();
  function fp(){
    setIsvisible(!isvisible)
  
  
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uname = sessionStorage.getItem("userName");
        const admin = sessionStorage.getItem("userType");
        console.log("uname1", uname);
        const accessToken = access1;

        if (
          sessionStorage.getItem("auth") === "true" &&
          sessionStorage.getItem("useremail") !== ""
        ) {
          // console.log("uname1",uname);

          // if(uname.startsWith("A")){
          //   // alert("hello admin")
          //   n("/admin");
          // }
          // else if(uname.startsWith("E"))
          // {
          //   // alert("hello emp")
          //   n("/employee");
          // }
          // else
          // {
          //   n("/");
          // }
          // alert("hello rithik")
          if (admin) {
            n("/admin");
          } else {
            n("/employee");
          }
        }
        //toast.error(sessionStorage.getItem("userName") !="")
        // console.log("Access Token:", `${accessToken}`);
        //   const response = await fetch("api/v1/auth/jwt/verify/", {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //     "Content-Type": "application/json",
        //   },
        //   body:JSON.stringify({token:`${accessToken}`})

        // });

        // if (!response.ok) {
        //   const username = document.getElementById("email").value;
        //   const password = document.getElementById("password").value;
        //   const errorResponseData = await response.json();
        //   // console.log("Request failed:", errorResponseData);
        //   if(username!=="" && password!=="")
        //               toast.error('Invalid credentials');

        //   // throw new Error("Request failed");
        // }
        // // console.log("response",response);
        // const responseData = await response.json();
        // setData(responseData);
        // // toast.error("15");
        // // console.log(responseData);
        // if (response.ok === true)
        // {
        //   // console.log("uname2",uname);
        //   toast.success("Login successfully")
        //   sessionStorage.setItem("auth", "true");
        //   setTimeout(() => {
        //     if(uname.startsWith("A")){
        //       // alert("hello admin")
        //       n("/admin");
        //     }
        //     else if(uname.startsWith("E"))
        //     {
        //       // alert("hello emp")
        //       n("/employee");
        //     }
        //     else{
        //       n("/");
        //     }
        //   }, 4000); // Adjust the delay as needed
        // }
      } catch (error) {
        // console.log("Request failed:", error);
      }
    };

    fetchData();
  }, [access1]);

  //getrabge timesheet function
  const fetchWeekRange = async () => {
    // var inputDate = new Date(weekDates.monday);
    // console.log("inputDatescore",inputDate)
    // // Format the Date object to "YYYY-MM-DD" format
    // const sdate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
    //   .toString()
    //   .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    // console.log("sdate",sdate)
    try{
      const response = await axios.post('http://localhost:3000/daterange',
        {
          "userid": sessionStorage.getItem("userName"),
          //"start_date": sdate,
        }     
    
      );
   
      const data= response.data;
      console.log("week_ranges",data)

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
        sessionStorage.setItem("date_ranges",JSON.stringify(data.dateRanges)) 
        //use josn parse to fetch data 
        console.log(JSON.parse(sessionStorage.getItem("date_ranges")) )   
      //  toast.success(`login fetch week range successfully,${data.dateRanges}`);
     }
   
    }
      catch(error){
        toast.error("Error in fetching week range")
      }
  }


  const handleLogin = async () => {
    var uemail=""
    var password=""
    if(active)
    {
      uemail = document.getElementById("email1").value;
     password= document.getElementById("password1").value;

    }
    else{
      uemail = document.getElementById("email").value;
      password = document.getElementById("password").value;
    }
    // toast.error(authService.login(username, password));
    try {
      if (uemail === "") toast.error("email id cannot be empty");
      if (password === "") toast.error("Password cannot be empty");
      // const { access, refresh } = await authService.login(username, password);
      // setAccess1(access);
      // console.log("Access Token:", access);
      // sessionStorage.setItem("accessToken", access);
      // sessionStorage.setItem("refreshToken", refresh);
      sessionStorage.setItem("useremail", uemail);
      sessionStorage.setItem("password", password);
      // console.log("Access Token:", access);
      // console.log("Refresh Token:", refresh);

      try {
        //toast.error(sessionStorage.getItem("userName") !="")
        // console.log("Access Token:", `${accessToken}`);
        const response = await axios.post("http://localhost:3000/login", {
          email: uemail,
          password: password,
        });
        // sessionStorage.setItem("data", JSON.parse(response.data));
        // console.log(sessionStorage.getItem("data"),response.data);
        console.log("response", response);
        if (response.status !== 200) {
          const uemail = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          //const errorResponseData = await response.json();
          // console.log("Request failed:", errorResponseData);
          if (uemail === "" && password === "")
            toast.error("Invalid credentials");

          // throw new Error("Request failed");
        }
        
        if(response.data.user.is_admin!==active){
          if(active){
            toast.error("Invalid User")
            setTimeout(() => {
              toast.error("Account not found in Admin Data");
            }, 500);
            setTimeout(() => {
              toast.info("Try as an Employee")
            }, 1500);
            return false
          }
          else{
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
        console.log("session", d, response.data.user);
        const responseData = response.data.user;
        setData(responseData);
        console.log("data",data)
        console.log("data",responseData.is_admin,active)
        // toast.error("15");
        // console.log(responseData);
        if (response.status === 200) {
          const uname = responseData.userid;
          const admin = responseData.is_admin;
          console.log("uname2", uname);
          toast.success("Login successfully");
          sessionStorage.setItem("auth", "true");
          sessionStorage.setItem("2fa", responseData.twofa);
          sessionStorage.setItem("userName", uname);
          sessionStorage.setItem("userType", admin);

          const scoreresponse = await axios.post("http://localhost:3000/userscore", {
            id: response.data.user.userid,
          });
          // toast.error(scoreresponse.data.score);
          sessionStorage.setItem("score", scoreresponse.data.score);
          fetchWeekRange();
          setTimeout(() => {
            // if(uname.startsWith("A")){
            //   // alert("hello admin")
            //   n("/admin");
            // }
            // else if(uname.startsWith("E"))
            // {
            //   // alert("hello emp")
            //   n("/employee");
            // }
            // else{
            //   n("/");
            // }
            if (admin) {
              n("/admin");
            } else {
              n("/employee");
            }
          }, 4000); // Adjust the delay as needed
        }
      } catch (error) {
        console.log(uemail, password);
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      // toast.error("Login failed:", error);
    }
  };
  const handleEmployeeSelect = (option) => {
    setSelectedOption(option);
    console.log('Selected value:', option);
  };
  return (
    <>
      <section className="logindiv" style={{backgroundColor:"#EDF4F2"}}>
        <ToastContainer />
        

        <div className={`wrapper ${active ? 'active' : ''}`}>
      <span className="bg-animate"></span>
      <span className="bg-animate2"></span>
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
          <button type="submit" className="btn animation" style={{ '--i': 4, '--j': 25 }} onClick={handleLogin}>Login</button>
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
        <p className="animation text-lg  text-slate-800 font-bold mt-6 mr-10" style={{ '--i': 1,'--j':21 }}>Are you an admin?
              <a className="register-link hover:cursor-pointer hover:underline text-white font-medium ml-2" onClick={handleRegisterClick}>Sign in</a>
            </p>
      </div>
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
          <button type="submit" className="btn animation" style={{ '--i': 4, '--j': 25 }} onClick={handleLogin}>Login</button>
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









