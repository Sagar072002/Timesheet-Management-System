import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { RxHamburgerMenu,RxCross2 } from "react-icons/rx";
import { FaCamera, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Scorecard = () => {
  const [ham,setHam]=useState(true)
  const n=useNavigate();
  useEffect(
    ()=>{
      if(sessionStorage.getItem('auth')==="false"){
        n('/')
      }

    },[]
  )
  const handleLogout = () => {
    toast.success("Log out successfully");
    sessionStorage.setItem("auth", "false");
    // sessionStorage.setItem("accessToken", "");
    //   sessionStorage.setItem("refreshToken", "");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("password", "");
    setTimeout(() => {
      n("/");
    }, 4000); // Adjust the delay as needed
  };
  const [isVisible, setIsVisible] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [fetchedData, setFetchedData] = useState(null); // State to store fetched data

    

    const handleSubmit = async () => {
        // Check if both fields are filled
        if (!selectedYear || !selectedMonth) {
            toast.error("Please select both year and month.");
            return;
        }

        // Retrieve the employee ID
        const userId = sessionStorage.getItem('userName');
    
        // Print user ID, month number, and year to console
        console.log("User ID:", userId);
        console.log("Month:", selectedMonth);
        console.log("Year:", selectedYear);
    
        try {
            // Make the axios POST request with the selected year, month, and employee ID
            const response = await axios.post('http://localhost:3000/getscore', {
                "userid": userId,
                "year": selectedYear,
                "month": selectedMonth
            });
    
            // Handle the response data
            const data = response.data;
            if (response.status === 200) {
                setFetchedData(data);
                toast.success("Fetch successful!");
            } else {
                toast.error("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error in fetching");
        }
    };

    // Function to handle year selection
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Function to handle month selection
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    if (!isVisible) {
        return null; // If isVisible is false, return null to render nothing
    }
  return (
    <div className='flex'>
      <ToastContainer/>
      <div className={ham?`w-1/6 flex flex-col p-3 bg-cyan-600 bg-opacity-35   h-lvh`:`hidden`}>
      {ham?<RxCross2 className="absolute top-2 left-52 text-3xl" onClick={()=>{setHam(false)}}/>:<></>}
        <div className=" justify-center relative mt-10 mb-4 rounded-full flex">
        {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down mt-2 rounded-full"/>:<FaUser className="ml-5 mt-5 w-14 h-14" />}
          
        </div>
        <p className="text-center font-bold text-lg">Hii {JSON.parse(sessionStorage.getItem('data')).name}</p>
        <div className="mt-16 text-xl  flex flex-col gap-8  text-center w-full justify-center items-center">
          <Link  to= '/newemp'>Current Timesheet</Link>
          <Link to='/timesheetList' >Timesheet List</Link>
          <div className='w-full'>
          <Link to='/scorecard'><p className='text-white text-center bg-cyan-600 px-8 py-3 w-full rounded-md font-bold'>Score Card</p></Link>
          </div>
          <Link to='/profile'>Edit Profile</Link>
          <button
            className="px-6 py-3 rounded-sm border font-medium bg-white text-black mt-5  hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
      <div className={ham?"w-5/6":'w-full'}>
        {ham?<></>:<RxHamburgerMenu className="ml-4 mt-4 text-3xl" onClick={()=>{setHam(true)}}/>}
        <div className='flex flex-col w-2/4 items-center mx-auto'>
          <div className="w-2/3 flex flex-col mt-3  gap-2 ">
            <div className="w-full flex flex-col gap-8">
              <h1 className="flex justify-center p-2 text-black font-['Plus Jakarta Sans'] font-semibold   w-full text-2xl">View Score Card</h1>
              <div className="flex flex-row justify-between gap-4">
              
                <select
                  id="year"
                  className="py-2 border w-2/5 rounded-sm text-black outline-none"
                  onChange={handleYearChange}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {/* <label htmlFor="month" className="font-bold">
                  Select Month:
                </label> */}
                <select
                  id="month"
                  className="py-2  w-3/5 border rounded-sm outline-none text-black"
                  onChange={handleMonthChange}
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <br />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className={`bg-cyan-600 w-1/3 mx-auto items-center text-white px-4 h-10 rounded-sm ${
                  !selectedYear || !selectedMonth
                    ? "cursor-not-allowed opacity-50 "
                    : "text-white"
                }`}
                disabled={!selectedYear || !selectedMonth}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="text-center text-2xl font-semibold font-['Plus Jakarta Sans']  pb-5">
              Result:
            </p>
            {/* Render fetched data */}
            {fetchedData && fetchedData.length > 0 ? (
              <div className="text-white rounded-md">
                {/* <p className="font-bold mb-3">Weekly Scores:</p> */}
                <div className="rounded-lg overflow-hidden z-10 shadow-md">
                  <table className=" w-full rounded-lg">
                    <thead className="bg-cyan-600 w-full">
                      <tr>
                        <th
                          scope="col"
                          className="py-2 px-6 text-base font-normal uppercase font-['Plus Jakarta Sans'] "
                        >
                          <span className=""> Week Number</span>
                        </th>
                        <th
                          scope="col"
                          className="py-2 px-6 text-base font-normal uppercase font-['Plus Jakarta Sans'] "
                        >
                          <span className=""> Score</span>
                        </th>
                        <th
                          scope="col"
                          className="py-2 px-6 text-base font-normal uppercase font-['Plus Jakarta Sans'] "
                        >
                          <span className=""> Date Range</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchedData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b-2 border-cyan-600 text-black font-normal font-['Plus Jakarta Sans']"
                        >
                          <td className="px-4 py-2 text-center">
                            {item.week_number}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {item.score}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {item.date_range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="min-w-full flex justify-center text-center text-2xl font-semibold font-['Plus Jakarta Sans'] ">
                No data available
              </div>
            )}
          </div>
          </div>
      </div>
    </div>
  )
}

export default Scorecard