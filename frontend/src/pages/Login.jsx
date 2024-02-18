import authService from "./Auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../index.css";

const Login = () => {
  const [access1, setAccess1] = useState("");
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState('');


  const n = useNavigate();
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

  const handleLogin = async () => {
    const uemail = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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
        sessionStorage.setItem("data", JSON.stringify(response.data.user));
        const d = JSON.parse(sessionStorage.getItem("data"));
        console.log("session", d, response.data.user);
        const responseData = response.data.user;
        setData(responseData);
        // toast.error("15");
        // console.log(responseData);
        if (response.status === 200) {
          const uname = responseData.userid;
          const admin = responseData.is_admin;
          console.log("uname2", uname);
          toast.success("Login successfully");
          sessionStorage.setItem("auth", "true");
          sessionStorage.setItem("userName", uname);
          sessionStorage.setItem("userType", admin);

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
      <section className="back">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full border-2 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className=" space-y-4  sm:px-8 sm:py-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-white md:text-2xl ">
                Sign in
              </h1>
              <div className="space-y-4 md:space-y-4">
                <div>
                  <span className="text-white text-sm font-medium ">Login as</span>  
                  <div className="flex gap-10 my-4">
                    <div
                      className={`flex justify-center  items-center w-40 h-20 border-white border hover:bg-cyan-600 hover:border-transparent hover:cursor-pointer text-white font-medium rounded-sm ${
                        selectedOption === "Employee" ? "bg-cyan-600 border-transparent" : ""
                      }`}
                      onClick={() => handleEmployeeSelect("Employee")}
                    >
                      Employee
                    </div>
                    <div
                      className={`flex justify-center items-center w-40 h-20 border-white border hover:bg-cyan-600 hover:border-transparent hover:cursor-pointer text-white font-medium rounded-sm ${
                        selectedOption === "Admin" ? "bg-cyan-600 border-transparent" : ""
                      }`}
                      onClick={() => handleEmployeeSelect("Admin")}
                    >
                      Admin
                    </div>{" "}
                  </div>
                  <label
                    htmlFor="email"
                    className="text-white block mb-2 text-sm font-medium  "
                  >
                    Email <span className="text-red-600"></span>
                  </label>
                  <div className="flex bg-slate-50 border p-3 rounded">
                    <FaUser className="mr-3" />

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                      placeholder="Your user id"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-white block mb-2 text-sm font-medium  "
                  >
                    Password
                  </label>
                  <div className="flex bg-slate-50 border p-3 rounded mb-3">
                    <FaLock className="mr-3" />

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
               <span className="text-cyan-500  font-bold hover:underline hover:cursor-pointer text-sm  ">Forgot password?</span>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full  text-white bg-cyan-600 hover:bg-cyan-500 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Sign in
                </button>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
