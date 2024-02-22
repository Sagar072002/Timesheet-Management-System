import React, { useState } from "react";
import Detail from "./Detail";
import ViewTimesheet from "./ViewScorecard";

const EmployeeCard = ({ employeeData }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isTimesheetVisible, setIsTimesheetVisible] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);

  const handleDetailToggle = () => {
    setIsDetailVisible(!isDetailVisible);
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
    <div className="mt-6 border px-6 shadow-md transition-all rounded-md bg-white hover:cursor-pointer p-4 ">
      <div className="flex gap-5">
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
          {/* <p className="leading-7 font-medium"></p> */}
        </div>
      </div>

      <div className="flex  flex-col gap-1 mt-5 justify-center">
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
      </div>

      {isDetailVisible && (
        <div className="fixed -top-24 left-1/3 z-10">
          <Detail employee={selectedEmployee} />
        </div>
      )}
      {isTimesheetVisible && (
        <div className="fixed w-1/2 top-1/4 max-h-[400px] left-1/3 z-10">
          <ViewTimesheet employee={employeeData}/>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
