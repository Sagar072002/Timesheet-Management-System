import React, { useState } from "react";
import Detail from "./Detail";

const EmployeeCard = ({ employeeData }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDetailToggle = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const handleShowDetails = () => {
    setSelectedEmployee(employeeData);
    handleDetailToggle();
  };

  return (
    <div className="mt-6 border shadow-md transition-all rounded-md bg-white hover:cursor-pointer p-4 h-56">
      <div className="flex gap-5">
        <div>
          <p className="leading-7 font-bold">Name:</p>
          <p className="leading-7 font-bold">UID:</p>
          <p className="leading-7 font-bold">Email:</p>
          <p className="leading-7 font-bold">Score:</p>
        </div>
        <div>
          <p className="leading-7 font-medium">{employeeData.name}</p>
          <p className="leading-7 font-medium">{employeeData.userid}</p>
          <p className="leading-7 font-medium">{employeeData.email}</p>
          <p className="leading-7 font-medium"></p>
        </div>
      </div>

      <div className="flex gap-6 mt-5 justify-center">
        <button 
          className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'         

          onClick={handleShowDetails}
        >
          Details
        </button>
      </div>

      {isDetailVisible && (
        <div className="fixed -top-20 left-1/3 z-10">
          <Detail employee={selectedEmployee} />
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
