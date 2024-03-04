import React, { useState } from "react";
import Detail from "./Detail";
import ViewTimesheet from "./ViewScorecard";
import img from "../assets/altimg.jpg"
import backg from "../assets/bg.jpg"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios  from "axios";
import { toast } from "react-toastify";


const EmployeeCard = ({ employeeData }) => {
  useEffect(()=>{

    const fetchWeekRange = async () => {
      console.log(employeeData)
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
            "userid": employeeData.userid,
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
          sessionStorage.setItem(`${employeeData.userid}ranges`,JSON.stringify(data.dateRanges)) 
          //use josn parse to fetch data 
          console.log(JSON.parse(sessionStorage.getItem(`${employeeData.userid}ranges`)) )   
        //  toast.success(`login fetch week range successfully,${data.dateRanges}`);
       }
     
      }
        catch(error){
          toast.error("Error in fetching week range")
        }
    }
    fetchWeekRange();
  },[])
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isTimesheetVisible, setIsTimesheetVisible] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);

  const handleDetailToggle = () => {
    setIsDetailVisible(!isDetailVisible);
    console.log(isDetailVisible)
  };

  const handleShowDetails = () => {
    setSelectedEmployee(employeeData);
    handleDetailToggle();
  };
  const handleTimesheetToggle = () => {
    setIsTimesheetVisible(!isTimesheetVisible);
  };

  const handleShowTimesheetDetails = () => {
    // setSelectedEmployee(employeeData);
    handleTimesheetToggle();
  };

  return (
    <div className=" w-1/4">
    <Link to='/newadmin' state={{ employee: employeeData }}>
    <div className="mt-6 border border-slate-300 transition-all rounded-md bg-white hover:cursor-pointer">
      <div className="flex flex-col gap-3">
        <div style={{backgroundColor:"#66A5AD"}} className="w-full bg-gradient-to-r from-teal-100 to-teal-300 pb-4" >
       
       {
        employeeData.image?<img src={employeeData.image} alt=""  className="w-36 mt-3 mx-auto h-36 rounded-full"/>:<img src={img} alt=""  className="w-36 mt-3 mx-auto h-36 rounded-full"/>
       }
        

        </div>
        <div className="flex gap-3 p-2 px-4">
        <div>
          <p className="leading-7 font-bold">Name:</p>
          <p className="leading-7 font-bold">User Id:</p>
          <p className="leading-7 font-bold">Email:</p>
          {/* <p className="leading-7 font-bold">Score:</p> */}
        </div>
        <div>
          <p className="leading-7 font-medium">{employeeData.name}</p>
          <p className="leading-7 font-medium">{employeeData.userid}</p>
          <p className="leading-7 font-medium">{employeeData.email}</p>
          {/* <img src={employeeData.image}></img> */}
          {/* <p className="leading-7 font-medium"></p> */}
        </div>
      </div>
      <button style={{backgroundColor:"#66A5AD"}} className="rounded-sm bg-pink-500 px-3 py-2 mx-4 mb-4 text-white">Details</button>
      </div>
      {/* <div className="flex  flex-col gap-1 mt-5 justify-center">
        <button 
          className='w-full  text-white bg-cyan-600 hover:bg-cyan-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2'         

          onClick={handleShowDetails}
        >
          Details
        </button>
        <button 
          className='w-full  text-white bg-cyan-600 hover:bg-cyan-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2'         
          onClick={handleShowTimesheetDetails}
        >
Scorecard        </button>
      </div> */}
      {/* <div
          className={
            isDetailVisible 
              ? `bg-transparent fixed inset-0 flex z-50 backdrop-filter backdrop-blur-sm`
              : ""
          }
        >
      <div
          className={
            isTimesheetVisible 
              ? `bg-transparent fixed inset-0 flex z-50 backdrop-filter backdrop-blur-sm`
              : ""
          }
        >

      {isDetailVisible && (
        <div className="fixed -top-18 left-1/3 z-10">
          <Detail employee={selectedEmployee} func={handleShowDetails} />
        </div>
      )}
      {isTimesheetVisible && (
        <div className="fixed w-1/2 top-20  left-1/4 z-10">
          <ViewTimesheet employee={employeeData} func={handleShowTimesheetDetails}/>
        </div>
      )}
      </div>
      </div> */}
    </div>
    </Link>
    </div>
  );
};

export default EmployeeCard;
