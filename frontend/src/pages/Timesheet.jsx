import React from "react";

const Timesheet = () => {
  return (
    <div className="timesheet flex h-lvh">
      <div className="bg-slate-500 p-5 w-8/12">
        <div className=" flex justify-between mx-10 mb-7">
          <select className="bg-gray-100 border rounded-md outline-none p-3 " name="cars" id="cars">
            <option value="">Select a week</option>
            <option value="Male">29 jan 2024-04 feb 2024</option>
            <option value="Female">9 jan 2024-04 feb 2024</option>
            <option value="Other">9 jan 2024-04 feb 2024</option>
            <option value="Other">9 jan 2024-04 feb 2024</option>
            <option value="Other">9 jan 2024-04 feb 2024</option>
          </select>
          <p className="font-bold uppercase mt-2 text-lg text-white">
            Project Name: <span className="font-medium normal-case">Timesheet Management System</span>
          </p>
          <p className="font-bold uppercase mt-2 text-lg text-white">
            Total Score: <span className="font-medium">60</span>
          </p>
        </div>
        <div className="lower">
          <div className="App">
          <div className="flex flex-col">
        <div className="min-w-full py-3 sm:px-6 lg:px-8">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-4 font-medium uppercase">
                <tr className="text-lg">
                  <th className="px-7 py-4 border-4 text-white">Day</th>
                  <th className="px-7 py-4 border-4 text-white">Task</th>
                  <th className="px-7 py-4 border-4 text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-4 text-lg">
                  <td className="whitespace-nowrap px-7 py-6 border-4 font-medium">Monday</td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>                </tr>
                <tr className="border-4 text-lg">
                  <td className="whitespace-nowrap px-7 py-6 border-4 font-medium">Tuesday</td>
<td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                                  </tr>
                <tr className="border-4 text-lg">
                  <td className="whitespace-nowrap px-7 py-6 border-4 font-medium">Wednesday</td>
<td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                                  </tr>
                <tr className="border-4 text-lg">
                  <td className="whitespace-nowrap px-7 py-6 border-4 font-medium">Thursday</td>
<td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                                  </tr>
                <tr className="border-4 text-lg">
                  <td className="whitespace-nowrap px-7 py-6 border-4 font-medium">Friday</td>
<td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                  <td className="border-4">
                    <input className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 " type="text" />
                  </td>
                                  </tr>
              </tbody>
            </table>
      </div>
    </div>
    <div className="flex mt-4 gap-5 justify-center">
        <button className="px-8 py-3 border-2 rounded bg-white text-black font-bold  border-white hover:bg-transparent hover:text-white">Save</button>
        <button className="px-8 py-3 border-2 rounded bg-white text-black font-bold  border-white hover:bg-transparent hover:text-white">Submit</button>
    </div>
          </div>
        </div>
      </div>
      <div className="w-4/12">
        <h2 className="text-center  uppercase text-3xl m-3 font-bold">Scorecard</h2>
        <div className="flex justify-center mt-10 align-center">
          <select className="bg-white rounded-md outline-none p-3 w-3/5 border" name="month" id="month">
            <option value="">Select a Month</option>
            <option value="Male">January</option>
            <option value="Female">February</option>
            <option value="Other">March</option>
            <option value="Other">April</option>
            <option value="Other">May</option>
            <option value="Other">June</option>
            <option value="Other">July</option>
            <option value="Other">August</option>
            <option value="Other">September</option>
            <option value="Other">October</option>
            <option value="Other">November</option>
            <option value="Other">December</option>
          </select>
          
        </div>
        <div className="flex mt-5 flex-col">
        <div className="min-w-full py-5 sm:px-6 lg:px-8">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border uppercase">
                <tr>
                  <th className="px-6 py-5 border-4 text-xl ">Week</th>
                  <th className="px-6 py-5 border-4 text-xl ">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border text-lg font-medium text-slate-600">
                  <td className="whitespace-nowrap px-6 py-7 border-4  ">Week 1</td>
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">10</td>
                </tr>
               
                <tr className="border text-lg font-medium text-slate-600">
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">Week 2</td>
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">5</td>
                </tr>
                <tr className="border  text-lg font-medium text-slate-600">
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">Week 3</td>
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">10</td>
                </tr>
                <tr className="border text-lg font-medium text-slate-600">
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">Week 4</td>
                  <td className="whitespace-nowrap px-6 py-7 border-4 ">2</td>
                </tr>
              </tbody>
            </table>
            <p className="text-3xl uppercase mt-10 font-bold text-center">total : <span className="text-red-500">27</span></p>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Timesheet;
