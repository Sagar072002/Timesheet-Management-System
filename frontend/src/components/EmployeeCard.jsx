import React, { useState } from "react";
import Detail from "./Detail";

const EmployeeCard = ({ employeeData }) => {
  const [btndetail, setdetail] = useState(false);

  const handledetail = () => {
    setdetail(!btndetail);
  };

  // Check if employeeData is defined and contains all required fields
  if (
    !employeeData ||
    !employeeData.name ||
    !employeeData.employeeID ||
    !employeeData.email ||
    !employeeData.totalScore
  ) {
    return <div>Error: Missing employee data</div>; // Handle the error condition appropriately
  }

  return (
    <div className=" mt-6 border border-slate-400 rounded-md bg-slate-300 px-5 py-4 h-56">
      <div className="flex gap-7">
        <div>
          <p className="leading-7 font-bold">Name:</p>
          <p className="leading-7 font-bold">Employee ID:</p>
          <p className="leading-7 font-bold">Email:</p>
          <p className="leading-7 font-bold">Total Score:</p>
        </div>
        <div>
          <p className="leading-7 font-medium">{employeeData.name}</p>
          <p className="leading-7 font-medium">{employeeData.employeeID}</p>
          <p className="leading-7 font-medium">{employeeData.email}</p>
          <p className="leading-7 font-medium">{employeeData.totalScore}</p>
        </div>
      </div>

      <div className="flex gap-6 mt-5 justify-center">
        <button 
          className="px-5 py-3 border-2 border-slate-500 text-white hover:border-2 hover:bg-white  hover:text-slate-500 bg-slate-500 rounded-md">
          Timesheet 
        </button> 
        <button 
          className="px-5  py-3 border-2 border-slate-500 text-white hover:border-2 hover:bg-white  hover:text-slate-500 bg-slate-500 rounded-md"
          onClick={handledetail}
        >
          Details
        </button>
      </div>

      {btndetail && (
        <div className="absolute -top-20 left-1/3 z-10">
          <Detail />
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
