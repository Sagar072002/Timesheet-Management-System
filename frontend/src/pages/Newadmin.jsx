import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import img from "../assets/user_img.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnimatedNumbers from "react-animated-numbers";

const Newadmin = () => {
  const [score,setScore]=useState(0)
  const [week,setWeek]=useState(0)
  const [duration,setDuration]=useState(0)
  const location = useLocation();
  const employee = location.state && location.state.employee;
  useEffect(() => {
    console.log(employee);
    const userscore=async ()=>  {
      const response=await axios.post('http://localhost:3000/userscore',{
        "id":employee.userid
      })
      setScore(response.data.score)
      setWeek(response.data.week)
      setDuration(response.data.totaldur)
      console.log(score,week,duration)
      
    }
    userscore();
  }, []);

  var count = 0;
  const [viewtime, setviewtime] = useState(false);
  const [viewtimedata, setviewtimedata] = useState([]);
  // const [d, setd] = useState([]);
  const [date, setdate] = useState([]);

  const handleoldtimesheet = async () => {
    var e = document.getElementById("month1");

    var value = e.value;
    if (e.value === "") {
      toast.error("Select a Week range");
      return false;
    }
    console.log(value.split("-"));
    // alert(employee.userid);
    const response = await axios
      .post("http://localhost:3000/gettaskdetails", {
        userid: employee.userid,
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
          var l = document.getElementById("month1").value;
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
      // alert("fff");
      console.log(f);
      setTimeout(() => {
        setviewtime(true);
      }, 700);
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [fetchedData, setFetchedData] = useState(null); // State to store fetched data

  const handleCrossClick = () => {
    setIsVisible(false);
    // func();
  };

  const handleSubmit = async () => {
    // Check if both fields are filled
    if (!selectedYear || !selectedMonth) {
      toast.error("Please select both year and month.");
      return;
    }

    // Retrieve the employee ID
    const userId = employee.userid;

    // Print user ID, month number, and year to console
    console.log("User ID:", userId);
    console.log("Month:", selectedMonth);
    console.log("Year:", selectedYear);

    try {
      // Make the axios POST request with the selected year, month, and employee ID
      const response = await axios.post("http://localhost:3000/getscore", {
        userid: userId,
        year: selectedYear,
        month: selectedMonth,
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
    <div className="flex w-full">
      <div className="bg-transparent w-2/3 z-10 ">
        <div className=" border-cyan-600 flex items-start p-10 w-full ">
            <div className="flex justify-evenly items-center w-full gap-4">
              <div>
              {
        employee.image?<img src={employee.image} alt=""  className="w-36 mt-3  h-36 rounded-full"/>:<img src={img} alt=""  className="w-36 mt-3 mx-auto h-36 rounded-full"/>
       }
       <p className="font-bold mt-3 text-lg text-center">{employee.name}</p>
       </div>
              <div className="flex flex-col gap-3 font-['Plus Jakarta Sans']  ">
                  <p>User ID: <span className="font-medium text-base">{employee.userid}</span></p>
                  <p>Email: <span className="font-medium text-base">{employee.email}</span></p>
                  <p>Phone Number: <span className="font-medium text-base">{employee.phone_number}</span></p>
                  <p>Gender: <span className="font-medium text-base">{employee.gender}</span></p>
                  <p>Age: <span className="font-medium text-base">{employee.age}</span></p>
            
              </div>
              
              <div className="flex flex-col gap-3 ">
              <div className="w-full h-[206px] flex flex-col items-center justify-around">
          <div className="flex justify-around gap-4">
            <div className="w-[158.88px] h-[85px] p-3 rounded-lg border border-gray-300 flex-col justify-start items-center gap-2 inline-flex">
              <div className="w-[16.41px] h-[30px] flex-col justify-start items-center flex">
                <div className="self-stretch flex-col justify-start items-center flex">
                  <div className="text-center text-zinc-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
                    <AnimatedNumbers
                        transitions={(index) => ({
                        type: "spring",
                        duration: index + 0.3,
                      })}

                      animateToNumber={week}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[55.75px] h-[21px] justify-start items-center gap-2 inline-flex">
                <div className="w-[55.75px] h-[21px] flex-col justify-start items-center inline-flex">
                  <div className="self-stretch flex-col justify-start items-center flex">
                    <div className=" truncate text-center text-zinc-700 text-sm font-normal font-['Plus Jakarta Sans'] leading-[21px]">
                      Week's Total
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[142.52px] h-[85px] p-3 rounded-lg border border-gray-300 flex-col justify-start items-center gap-2 inline-flex">
              <div className="w-[16.41px] h-[30px] flex-col justify-start items-center flex">
                <div className="self-stretch flex-col justify-start items-center flex">
                  <div className="text-center text-zinc-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
                  <AnimatedNumbers
                        transitions={(index) => ({
                        type: "spring",
                        duration: index + 0.3,
                      })}

                      animateToNumber={duration}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[39.39px] h-[21px] justify-start items-center gap-2 inline-flex">
                <div className="w-[39.39px] h-[21px] flex-col justify-start items-center inline-flex">
                  <div className="self-stretch flex-col justify-start items-center flex">
                    <div className="truncate text-center text-zinc-700 text-sm font-normal font-['Plus Jakarta Sans'] leading-[21px]">
                      Total Duration
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[313.38px] h-[85px] p-3 rounded-lg border border-gray-300 flex-col justify-center items-center gap-2 inline-flex">
            <div className="w-[16.41px] h-[30px] flex-col justify-start items-center flex">
              <div className="self-stretch flex-col justify-start items-center flex">
                <div className="text-center text-zinc-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
                <AnimatedNumbers
                      transitions={(index) => ({
                      type: "tween",
                      duration: index + 0.9,
                    })}

                    animateToNumber={score}
                  />
                </div>
              </div>
            </div>
            <div className="w-[86.89px] h-[21px] justify-start items-center gap-2 inline-flex">
              <div className="w-[86.89px] h-[21px] flex-col justify-start items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-center flex">
                  <div className="text-center text-zinc-700 text-sm font-normal font-['Plus Jakarta Sans'] leading-[21px]">
                    Total Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                    </div>
            </div>     
        </div>
        <div className="flex flex-col bg-white rounded-md  w-full max-h-screen pb-5">
          <div className="flex items-center justify-between py-5 px-10">
            <h1 className="flex justify-center p-2 pt-4 text-black font-['Plus Jakarta Sans'] font-semibold  w-full text-2xl">
              View Timesheets
            </h1>
          </div>
          <div className="flex  justify-center items-center gap-4  align-center">
            <select
              className="bg-slate-300 rounded-sm outline-1 p-2 border"
              name="month"
              id="month1"
            >
              <option value="">Select week range</option>
              {JSON.parse(
                sessionStorage.getItem(`${employee.userid}ranges`)
              ).map((val) => {
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>

            <button
              onClick={handleoldtimesheet}
              className="bg-cyan-600 hover:bg-cyan-500  px-4 h-10 text-white font-semibold  rounded-sm"
            >
              Submit
            </button>
          </div>
          {viewtime ? (
            <div className="flex justify-center mt-5 bg-b(208, 187, 149)">
              <div className="flex relative mt-5 overflow-y-auto  shadow-md sm:rounded-md">
                <table className=" bg-white w-full text-sm text-gray-500 ">
                  <thead className="w-full text-white text-center text-base bg-cyan-600 ">
                    <tr>
                      <th
                        scope="col"
                        className="w-50 py-2 px-10  self-stretch text-lg uppercase font-normal font-['Plus Jakarta Sans'] "
                      >
                        <span className=""> Task</span>
                      </th>

                      {[...Array(5)].map((_, index) => {
                        var e = document.getElementById("month1").value;
                        var value = e.split("-")[0];
                        const dt = new Date(value);
                        dt.setDate(dt.getDate() + index);
                        const newdt = dt.toLocaleDateString("en-US", {
                          dateStyle: "short",
                        });
                        const days = [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ];

                        return (
                          <th
                            key={index}
                            scope="col"
                            className="px-4 py-3 font-['Plus Jakarta Sans'] self-stretch w-[134.02px] h-[66.50px]"
                          >
                            <div className="flex flex-col justify-start items-start  px-6">
                              <div className="text-base font-medium">
                                {days[index + 1]}
                              </div>
                              <div className="text-sm font-medium">{newdt}</div>
                            </div>
                          </th>
                        );
                      })}
                      <th
                        scope="col"
                        className="py-2 px-6 text-lg font-normal uppercase font-['Plus Jakarta Sans'] "
                      >
                        <span className=""> Total</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {JSON.parse(sessionStorage.getItem("values")).map((val) => {
                      console.log(date[val], sessionStorage.getItem("values"));
                      return (
                        <tr
                          key={val}
                          className="bg-white border-b-2 border-cyan-600"
                        >
                          <th
                            scope="row"
                            className="py-3 font-medium text-black whitespace-nowrap "
                          >
                            <p
                              type="text"
                              id={val}
                              className="text-center text-base font-normal font-['Plus Jakarta Sans']"
                              disabled={true}
                            >
                              {val}
                            </p>
                          </th>

                          {date[val].map((value) => {

                            return (
                              <td
                                scope="row"
                                className="py-3 font-medium text-black whitespace-nowrap "
                              >
                                <p
                                  type="text"
                                  id={val}
                                  className="text-center text-base font-normal font-['Plus Jakarta Sans']"
                                  disabled={true}
                                >
                                  {value}
                                </p>
                              </td>
                            );
                          })}
                          <td
                            scope="row"
                            className="py-3 font-bold text-gray-900 whitespace-nowrap "
                          >
                            <p
                              type="text"
                              id={val}
                              className="text-center font-bold font-['Plus Jakarta Sans']"
                              disabled={true}
                            >
                              {date[val].reduce((c, v) => {
                                return c + parseFloat(v);
                              }, 0)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                    
                    <tr className="">
                      <th
                        scope="row"
                        className="px-6 py-4 font-bold text-xl text-cyan-700 whitespace-nowrap"
                      >
                        Total
                      </th>

                      {[0, 1, 2, 3, 4].map((dayIndex) => {
                        var c = 0;
                        for (var i = 0; i < Object.values(date).length; i++) {
                          c += parseFloat(Object.values(date)[i][dayIndex]);
                        }
                        count += c;
                        return (
                          <td
                            key={dayIndex}
                            className="py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <p
                              type="text"
                              className="text-center text-base font-bold font-['Plus Jakarta Sans']"
                              // value={timeData[index]?.[0] || ""}
                              disabled={true}
                            >
                              {parseFloat(c)}
                            </p>
                          </td>
                        );
                      })}
                      <td className="py-4 font-medium text-gray-900 whitespace-nowrap ">
                        <p
                          type="text"
                          className="text-center text-base font-semibold font-['Plus Jakarta Sans'] "
                          // value={timeData[index]?.[0] || ""}
                          disabled={true}
                        >
                          {count}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>       

        <div className=" w-1/3  p-5 ">
          <div className="w-full mt-3 flex gap-2 ">
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
                className={`bg-cyan-600 text-white px-4 h-10 rounded-sm ${
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
  );
};

export default Newadmin;
