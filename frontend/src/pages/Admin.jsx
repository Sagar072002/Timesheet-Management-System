import React, { useState, useEffect } from "react";
import logo from "../assets/user_img.jpg";
import Profile from "../components/Profile";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profilevalue, setProfileValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  
  useEffect(() => {
    const fetchedUsername = sessionStorage.getItem("userName");
    setUsername(fetchedUsername);
    fetchAllEmployees();
    displayData();
    console.log("hell",sessionStorage.getItem("auth"))
    if (sessionStorage.getItem("auth") === "false") {
      navigate("/");
    }
    else if(sessionStorage.getItem("auth") === "true" &&sessionStorage.getItem("userName")[0]==='E' ) 
    {
      console.log("UNauth",sessionStorage.getItem("userName"))
      navigate("/Employee")
    }
  }, []);
  const displayData = async() => {
    console.log("Displaying data");
    try{
      const named = sessionStorage.getItem("userName");
      const url = `http://localhost:3000/users/${named}`;
      console.log("userid:",named)
      const response = await axios.get(url,
        {
         
        }     
      );
      
      const data=response.data
      console.log(data)
      setProfileValue(data)
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
  
       //toast.success("Registration successful!");
      
       console.log('Fetched values:');
      
  
      
    }
      
      }
      catch(error){
        toast.error(error.message)
      }
  }

  const fetchAllEmployees = async() => {
    console.log("Displaying data");
    try{
      //const named = sessionStorage.getItem("userName");
      const url = `http://localhost:3000/users`;
      //console.log("userid:",named)
      const response = await axios.get(url,
        {
         
        }     
      );
      
      const data=response.data
      console.log(data)
      //setProfileValue(data)
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
  
       //toast.success("Registration successful!");
      
       console.log('all users:',data);

    }
      
      }
      catch(error){
        toast.error(error.message)
      }
  }

  const handleLogout = () => {
    toast.success("Log out successfully")

    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("admin", "false");
    //sessionStorage.setItem("accessToken", "");
    //sessionStorage.setItem("refreshToken", "");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("password", "");
    setTimeout(() => {
      navigate('/');
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

  useEffect(() => {
    const filtered = [1, 2, 3, 4].filter((index) => {
      const employeeData = {
        name: `Employee ${index}`,
        employeeID: `ID-${index}`,
        email: `employee${index}@example.com`,
        totalScore: 20, 
      };
      return (
        employeeData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employeeData.employeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employeeData.email.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    });
    setFilteredEmployees(filtered);
  }, [searchQuery]);

  return (
    <div className="relative flex">
      <ToastContainer/>
      <div className="p-4 bg-blue-gray-200 w-full bg-gray-300">
        <div className="flex justify-between px-5">
          <p></p>
          <h2 className="font-bold text-2xl uppercase text-center">
            Admin Dashboard
          </h2>
          <span className="text-white mr-2 absolute right-28 top-5">
            Hii, {profilevalue.name}
          </span>
          <img
            src={logo}
            onClick={toggleProfileVisibility}
            className="w-10 h-10 mix-blend-color-burn"
            alt=""
          />
        </div>

        {isProfileVisible && (
          <div className=" bg-slatehoi-200 border border-slate-400 rounded absolute right-0 top-19 max-w-[500px] p-5 pt-2 h-32">
            <div className="flex justify-center">
              <img
                src={logo}
                className="w-10 h-10 mix-blend-color-burn"
                alt=""
              />
            </div>
            <div className="editprofilediv mt-3 text-lg">
              <p
                className="border-b border-red-700 py-1 px-2 hover:cursor-pointer"
                onClick={function(event){ toggleProfileDivVisibility(); displayData()}}
              >
                Edit Profile
              </p>
              <button onClick={handleLogout} className="px-4 hover:cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        )}
        {isProfileDivVisible && (
          <div className=" bg-transparent absolute left-1/2 -top-8 w-20 z-10">
            <Profile
             profilevalue={profilevalue.user}
             onUpdateProfile={updateProfileValue} // Pass the function to update profile value
            />
          </div>
        )}
        <div className="mt-4 flex justify-center p-4 ">
          <input
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-slate-600 focus:border-slate-600 block w-3/4 p-3.5"
            type="search"
            name=""
            id=""
            placeholder="Search Employee by name or employee ID or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="py-1 px-5 h-screen flex overflow-auto gap-5">
          {filteredEmployees.map((index) => (
            <EmployeeCard
              key={index}
              employeeData={{
                name: `Employee ${index}`,
                employeeID: `ID-${index}`,
                email: `employee${index}@example.com`,
                totalScore: 20, 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
