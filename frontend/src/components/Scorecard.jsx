import React,{useEffect} from 'react';
import {useNavigate } from 'react-router-dom';

const Scorecard = () => {
  const n=useNavigate();
  useEffect(
    ()=>{
      if(sessionStorage.getItem('auth')==="false"){
        n('/')
      }

    },[]
  )
  return (
    <div className="">
    <h2 className="text-center  uppercase text-3xl m-3 font-bold">
      Scorecard
    </h2>
    <div className="flex justify-center mt-10 align-center">
      <select
        className="bg-white rounded-md outline-none p-3 w-3/5 border"
        name="month"
        id="month"
      >
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
            <tr className="  border text-lg font-medium text">
              <td className="whitespace-nowrap px-6 py-7 border-4  ">
                Week 1
              </td>
              <td className="whitespace-nowrap px-6 py-7 border-4 ">10</td>
            </tr>

            <tr className="  border text-lg font-medium text">
              <td className="whitespace-nowrap px-6 py-7 border-4 ">
                Week 2
              </td>
              <td className="whitespace-nowrap px-6 py-7 border-4 ">5</td>
            </tr>
            <tr className="  border  text-lg font-medium text">
              <td className="whitespace-nowrap px-6 py-7 border-4 ">
                Week 3
              </td>
              <td className="whitespace-nowrap px-6 py-7 border-4 ">10</td>
            </tr>
            <tr className="  border text-lg font-medium text">
              <td className="whitespace-nowrap px-6 py-7 border-4 ">
                Week 4
              </td>
              <td className="whitespace-nowrap px-6 py-7 border-4 ">5</td>
            </tr>
          </tbody>
        </table>
        <p className="text-3xl uppercase mt-10 font-bold text-center">
          total : <span className="text-red-500">30</span>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Scorecard