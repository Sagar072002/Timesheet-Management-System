import React from "react";

const EmployeeCard = ({ index }) => {
  return (
    <div className=" mt-6 rounded-md bg-slate-200 px-8 py-4 h-56">
      <div className="flex gap-8">
      <div>
       
        <p className="leading-7 font-bold">Name:</p>
        <p className="leading-7 font-bold">Employee ID:</p>
        <p className="leading-7 font-bold">Email:</p>
        <p className="leading-7 font-bold">Total Score:</p>
        </div >
        <div>
        <p className="leading-7 font-medium">Sagar Negi</p>
        <p className="leading-7 font-medium">GEU-20216976</p>
        <p className="leading-7 font-medium">negis2673@gmail.com</p>
        <p className="leading-7 font-medium">70</p>
        </div>
      </div>
     
      <div className="flex gap-6 mt-4">
      <button className="px-5 py-3 border-2 hover:bg-slate-500 hover:border-2 hover:text-white bg-white rounded-md ">Timesheet</button>
      <button className="px-5 py-3 border-2 hover:bg-slate-500 hover:border-2 hover:text-white bg-white rounded-md ">Details</button>  
      </div>

    </div>
  );
};

export default EmployeeCard;
