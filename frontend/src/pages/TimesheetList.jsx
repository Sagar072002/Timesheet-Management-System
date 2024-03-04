import axios from 'axios';
import React,{useState} from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { FaCamera, FaUser } from "react-icons/fa";
import { RxHamburgerMenu,RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';


const TimesheetList = ({ timesheet }) => {
  // State to control the visibility of tasks and durations
  var count = 0;
  const [viewtime, setviewtime] = useState(false);
  const [viewtimedata, setviewtimedata] = useState([]);
  // const [d, setd] = useState([]);
  const [date, setdate] = useState([]);

  const handleoldtimesheet = async () => {
    var e = document.getElementById("month");
    var value = e.value;
    if (e.value === "") {
      toast.error("Select a Week range");
      return false;
    }
    console.log(value.split("-"));
    const response = await axios
      .post("http://localhost:3000/gettaskdetails", {
        userid: sessionStorage.getItem("userName"),
        startDate: value.split("-")[0],
        endDate: value.split("-")[1],
      })
      .catch((error) => {
        toast.error(error.message);
      });
    if (response.status === 200) {
      const g = {};

      response.data.taskDetails.map((e) => {
        if (e.date in g) {
          g[e.date].push([e.task, e.duration]);
        } else {
          g[e.date] = [[e.task, e.duration]];
        }
      });
      setviewtimedata(JSON.stringify(g));

      const d = {};
      response.data.taskDetails.map((e) => {
        if (e.task in d) {
          d[e.task].push([e.date, e.duration]);
        } else {
          d[e.task] = [[e.date, e.duration]];
        }
      });
      sessionStorage.setItem("values", JSON.stringify(Object.keys(d)));

      const f = {};
      const h = Object.keys(d);

      for (var val = 0; val < h.length; val++) {
        f[h[val]] = [];
        for (var j = 0; j < 5; j++) {
          var l = document.getElementById("month").value;
          var value = l.split("-")[0];
          const dt = new Date(value);
          dt.setDate(dt.getDate() + j);
          const newdt = dt.toLocaleDateString("fr-CA");

          let found = false; // Flag to track if a value is found for the current iteration

          for (var i = 0; i < d[h[val]].length; i++) {
            if (newdt == d[h[val]][i][0]) {
              f[h[val]].push(d[h[val]][i][1]);
              found = true; // Set flag to true if a value is found
              break; // Exit the inner loop once a value is found
            }
          }

          if (!found) {
            f[h[val]].push(0); // Push default value if no value is found for the current iteration
          }
        }
      }
      setdate(f);
      console.log(f);
      setTimeout(() => {
        setviewtime(true);
      }, 700);
    }
  };
  const n = useNavigate();
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
  const [ham,setHam]=useState(true)
  
  return (
    <div className='flex'>
      <ToastContainer />
    <div className={ham?`w-1/6 flex flex-col p-3 bg-cyan-600 bg-opacity-35   h-lvh`:`hidden`}>
      {ham?<RxCross2 className="absolute top-2 left-52 text-3xl" onClick={()=>{setHam(false)}}/>:<></>}
        <div className=" justify-center relative mt-10 mb-4 rounded-full flex">
        {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down mt-2 rounded-full"/>:<FaUser className="ml-5 mt-5 w-14 h-14" />}
          
        </div>
        <p className="text-center font-bold text-lg">Hii {JSON.parse(sessionStorage.getItem('data')).name}</p>
        <div className="mt-16 text-xl  flex flex-col gap-8  text-center w-full justify-center items-center">
          <Link  to= '/newemp'>Current Timesheet</Link>
          <div className='w-full'>
          <Link to='/timesheetList' ><p className='text-white text-center bg-cyan-600 px-8 py-3 w-full rounded-md font-bold'>Timesheet List</p></Link>
          </div>
          <Link to='/scorecard'>Score Card</Link>
          <Link to='/profile'>Edit Profile</Link>
          <button
            className="px-6 py-3 rounded-sm border font-medium bg-white text-black mt-5  hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {/* <div className="-ml-10 mt-24 font-bold text-xl ">
          <p className="text-center">©2023-2024</p>
          <p className="text-center">All rights reserved</p>
        </div> */}
      </div>
      <div className={ham?"bg-transparent  w-5/6 z-10":'bg-transparent  w-full z-10'}>
        {ham?<></>:<RxHamburgerMenu className="ml-4 mt-4 text-3xl" onClick={()=>{setHam(true)}}/>}
              <div className="flex flex-col justify-center items-center w-full  p-10 ">
              <h1 className=" text-slate-700 font-bold text-3xl mb-2">
                View Timesheet
              </h1>
              <div className="flex flex-row w-2/4 items-center justify-center my-5 gap-3">
                <select
                  className="bg-slate-300 rounded-md outline-1 p-3 w-2/5 border"
                  name="month"
                  id="month"
                >
                  <option value="">Select week range</option>
                  {JSON.parse(sessionStorage.getItem("date_ranges")).map(
                    (val) => {
                      return (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      );
                    }
                  )}
                  
                </select>

                <button
                  onClick={handleoldtimesheet}
                  className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
              {viewtime ? (

                  <div className="flex relative mt-5 overflow-y-auto shadow-md sm:rounded-md">
                    <table className=" bg-white w-full text-sm text-gray-500">
                      <thead className="w-full text-white text-center text-base bg-cyan-600 ">
                        <tr className="relative ">
                          <th
                            scope="col"
                            className="w-50 py-2  border-white border-r-2 uppercase text-xl "
                          >
                            <span className="absolute left-20 top-12">
                              {" "}
                              Task
                            </span>
                          </th>
                          <th
                            colSpan="5"
                            scope="col"
                            className="h-15 px-6 py-4 uppercase text-xl"
                          >
                            Duration
                          </th>

                          <th
                            scope="col"
                            className="w-40 px-6 py-2 border-white border-l-2 uppercase text-xl"
                          >
                            <span className="absolute right-13 top-12">
                              {" "}
                              Total
                            </span>
                          </th>
                          <th scope="col" className="px-6 py-3"></th>
                        </tr>
                        <tr>
                          <th scope="col" className="px-6 py-3 "></th>
                          {[...Array(5)].map((_, index) => {
                            var e = document.getElementById("month").value;
                            var value = e.split("-")[0];
                            const dt = new Date(value);
                            dt.setDate(dt.getDate() + index);
                            const newdt = dt.toLocaleDateString("en-US", {
                              dateStyle: "short",
                            });
                            // console.log(dt.getDate());
                            const days = [
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                            ];
                            // d

                            return (
                              <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 border-2 border-white"
                              >
                                {days[index + 1]} <br /> {newdt}
                              </th>
                            );
                          })}
                          <th scope="col" className="px-6 py-3"></th>
                          <th scope="col" className="px-6 py-3"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {JSON.parse(sessionStorage.getItem("values")).map(
                          (val) => {
                            console.log(
                              date[val],
                              sessionStorage.getItem("values")
                            );
                            return (
                              <tr key={val} className="bg-white">
                                <th
                                  scope="row"
                                  className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  <input
                                    type="text"
                                    id={val}
                                    className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
                                    // value={timeData[index]?.[0] || ""}
                                    disabled={true}
                                    value={val}
                                  />
                                </th>

                                {date[val].map((value) => {
                                  // console.log(value)

                                  return (
                                    <td
                                      scope="row"
                                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                      <input
                                        type="text"
                                        id={val}
                                        className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
                                        // value={timeData[index]?.[0] || ""}
                                        disabled={true}
                                        value={value}
                                      />
                                    </td>
                                  );
                                })}
                                <td
                                  scope="row"
                                  className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  <input
                                    type="text"
                                    id={val}
                                    className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
                                    // value={timeData[index]?.[0] || ""}
                                    disabled={true}
                                    value={date[val].reduce((c, v) => {
                                      return c + parseFloat(v);
                                    }, 0)}
                                  />
                                </td>
                              </tr>
                            );
                          }
                        )}
                        {/* <td className="text-center text-xl">
                      {calculateTaskTotal(index)}
                    </td> */}
                        {/* </tr> */}
                        <tr className="">
                          <th
                            scope="row"
                            className="px-6 py-4 font-bold text-xl text-cyan-700 whitespace-nowrap"
                          >
                            Total
                          </th>

                          {[0, 1, 2, 3, 4].map((dayIndex) => {
                            var c = 0;
                            for (
                              var i = 0;
                              i < Object.values(date).length;
                              i++
                            ) {
                              c += parseFloat(Object.values(date)[i][dayIndex]);
                            }
                            count += c;
                            return (
                              <td
                                key={dayIndex}
                                className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap "
                              >
                                <input
                                  type="text"
                                  className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
                                  // value={timeData[index]?.[0] || ""}
                                  disabled={true}
                                  value={parseFloat(c)}
                                />
                              </td>
                            );
                          })}
                          <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            <input
                              type="text"
                              className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
                              // value={timeData[index]?.[0] || ""}
                              disabled={true}
                              value={count}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

              ) : (
                <></>
              )}
              
                </div>
            </div>
            </div>
  );
};

export default TimesheetList;
