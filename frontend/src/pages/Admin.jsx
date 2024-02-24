import React, { useState, useEffect } from "react";
import logo from "../assets/user-icon.webp";
import Profile from "../components/Profile";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../index.css";
import { FaUser } from "react-icons/fa";
import ViewTimesheet from "../components/ViewTimesheet";
import { RxCross2 } from "react-icons/rx";
import Twofa from "./twofa";
const Admin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profilevalue, setProfileValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]); // Store the original list of employees
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchedUsername = sessionStorage.getItem("userName");
    console.log("Fetched username:", fetchedUsername);
    setUsername(fetchedUsername);
    fetchAllEmployees();
    displayData();
    // console.log("hell",sessionStorage.getItem("auth"))
    if (sessionStorage.getItem("auth") === "false") {
      navigate("/");
    } else if (
      sessionStorage.getItem("auth") === "true" &&
      sessionStorage.getItem("userName")[0] === "E"
    ) {
      console.log("UNauth", sessionStorage.getItem("userName"));
      navigate("/Employee");
    }
  }, []);

  const displayData = async () => {
    try {
      const named = sessionStorage.getItem("userName");
      const url = `http://localhost:3000/users/${named}`;
      const response = await axios.get(url);
      const data = response.data;
      // console.log(data)
      setProfileValue(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const url = `http://localhost:3000/users`;
      const response = await axios.get(url);
      const data = response.data.users; // Extract the array of users from the object

      // console.log("Fetched employees:", data);
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    toast.success("Log out successfully");
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("admin", "false");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("password", "");
    setTimeout(() => {
      navigate("/");
    }, 4000); // Adjust the delay as needed
  };

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfileVisibility = () => {
    setProfileVisible(!isProfileVisible);
  };
  const updateProfileValue = (updatedProfile) => {
    setProfileValue(updatedProfile);
  };

  const [isProfileDivVisible, setProfileDivVisible] = useState(false);
  const toggleProfileDivVisibility = () => {
    setProfileDivVisible(!isProfileDivVisible);
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim(); // Trim whitespace
    setSearchQuery(query);

    const filtered = employees.filter((employee) => {
      // Convert name and email to lowercase for case-insensitive comparison
      const lowercaseQuery = query.toLowerCase();
      const employeeName = employee.name.toLowerCase();
      const employeeid = employee.userid.toLowerCase();
      const employeeEmail = employee.email ? employee.email.toLowerCase() : "";

      // Check if the query is present in the lowercase versions of name or email
      const nameMatch = employeeName.includes(lowercaseQuery);
      const emailMatch = employeeEmail.includes(lowercaseQuery);
      const idMatch = employeeid.includes(lowercaseQuery);

      // Return true if any of the matches are found
      return nameMatch || idMatch || emailMatch;
    });

    // Set filteredEmployees based on the query
    setFilteredEmployees(filtered);
  };

  return (
    <div className="relative h-full  flex">
      <ToastContainer />
      <Twofa className="w-full bg-white" visible={sessionStorage.getItem("2fa")}/>
      <div className="back p-4 pt-6 bg-blue-gray-200 w-full bg-gray-300">
        <div className="flex justify-between px-5">
          <p></p>
          <h1 className="uppercase text-center pt-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500">
              Admin Dashboard
            </span>{" "}
          </h1>

          <span className="text-lg text-white mr-2 absolute right-20 top-16">
            Hii, {JSON.parse(sessionStorage.getItem("data")).name}
          </span>
          {/* <img
            src={logo}
            onClick={toggleProfileVisibility}
            className="w-10 h-10 mix-blend-color-burn"
            alt=""
          /> */}
          <div className="border-white  rounded-full p-2 mt-8">
            <FaUser
              onClick={toggleProfileVisibility}
              className="text-2xl text-white"
            />
          </div>
        </div>
        <div
          className={
            isProfileVisible
              ? `bg-transparent fixed right-0 top-20 inset-0 flex z-50 backdrop-filter backdrop-blur-sm `
              : isProfileDivVisible?`bg-transparent fixed right-0 top-24 inset-0 flex z-50 backdrop-filter backdrop-blur-sm`:"bg-transparent fixed flex"
          }
        >
          {isProfileVisible && (
            <div className=" bg-slate-200 border border-slate-400 rounded absolute right-0 max-w-[500px] p-5 pt-2 h-32">
              <div className="border-white  bg-slate-600 rounded-full p-2 flex justify-center">
                <FaUser
                  onClick={toggleProfileVisibility}
                  className="text-2xl text-white"
                />
              </div>

              <div className="editprofilediv mt-3 text-lg">
                <p
                  className="border-b font-medium hover:text-red-700 border-red-700 py-1 px-2 hover:cursor-pointer"
                  onClick={() => {
                    toggleProfileDivVisibility();
                    displayData();
                  }}
                >
                  Edit Profile
                </p>
                <button
                  onClick={handleLogout}
                  className="px-4 font-medium hover:text-red-700 hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {isProfileDivVisible && (
            <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-0 ">
              <Profile
                profilevalue={profilevalue.user}
                onUpdateProfile={updateProfileValue} // Pass the function to update profile value
                func={toggleProfileDivVisibility}
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center p-4 ">
          <input
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-slate-600 focus:border-slate-600 block w-3/4 p-3.5"
            type="search"
            name=""
            id=""
            placeholder="Search Employee by name or employee ID or email..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-wrap justify-start py-1 px-5 ml-10 gap-8">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard key={index} employeeData={employee} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
