import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import { FaUser } from "react-icons/fa";
import {RxCross2} from "react-icons/rx"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Timesheet from "../components/Timesheet";
import TimesheetList from "./TimesheetList";
import Twofa from "./twofa";


const Employee = () => {
  const n = useNavigate();
  const [username, setUsername] = useState("");

  const [profilevalue, setProfileValue] = useState("");

  useEffect(() => {
    const fetchedUsername = sessionStorage.getItem("userName");
    // console.log("Fetched username:", fetchedUsername);
    setUsername(fetchedUsername);
    displayData();
    if (
      sessionStorage.getItem("auth") === "true" &&
      sessionStorage.getItem("userName")[0] === "A"
    ) {
      n("/admin");
    } else if (
      sessionStorage.getItem("auth") === "true" &&
      sessionStorage.getItem("userName") !== ""
    ) {
      n("/Employee");
    } else {
      n("/");
    }
  }, []);
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

  const displayData = async () => {
    // const d=JSON.parse(sessionStorage.getItem("data"))
    // console.log(d.user.name)

    // console.log("DATAS",d);
    // console.log("Displaying data");
    try {
      const named = sessionStorage.getItem("userName");
      const url = `http://localhost:3000/users/${named}`;
      console.log("userid:", named);
      const response = await axios.get(url, {});

      const data = response.data;
      // console.log(data);
      setProfileValue(data);
      if (response.status !== 200) {
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        // console.log(
        //   `${response.status}\n${response.statusText}\n${data.message}`
        // );
      }

      // response.status
      //   toast.success(
      //     `${response.status}\n${response.statusText}\n${data.message}`
      //  )
      if (response.status === 200) {
        //toast.success("Registration successful!");
        // console.log("Fetched values:");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfileVisibility = () => {
    setProfileVisible(!isProfileVisible);
    setviewtime(false);
  };

  const [isProfileDivVisible, setProfileDivVisible] = useState(false);
  const [isProfileDiv1Visible, setProfileDiv1Visible] = useState(false);

  const toggleProfileDivVisibility = () => {
    setProfileDivVisible(!isProfileDivVisible);
    // setviewtime(false);
  };
  const toggleProfileDiv1Visibility = () => {
    setProfileDiv1Visible(!isProfileDiv1Visible);
    
      setviewtime(false);
  };

  const updateProfileValue = (updatedProfile) => {
    setProfileValue(updatedProfile);
  };

  return (
    <div
      className="w-full p-4 pt-7"
      id="outer-container"
      style={{ backgroundColor: "#EDF4F2" }}
    >
      <ToastContainer />

      <Twofa
        className="w-full bg-white"
        visible={sessionStorage.getItem("2fa")}
      />

      <div className="" id="page-wrap">
        <div className="">
          <h1 class="uppercase text-center pt-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-5xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500">
              Employee Dashboard
            </span>{" "}
          </h1>

          <div className="">
            <span className="text-slate-700 font-medium text-lg mr-2 absolute right-20 top-14">
              Hii, {JSON.parse(sessionStorage.getItem("data")).name}
            </span>
          </div>

          <FaUser
            onClick={toggleProfileVisibility}
            className=" w-8 h-8  text-slate-700 text-xl absolute right-12 top-12"
          />
        </div>
        <div
          className={
            isProfileVisible
              ? `bg-transparent fixed right-0  inset-0 flex z-50 backdrop-filter backdrop-blur-sm`
              : isProfileDivVisible
              ? `bg-transparent fixed right-0  inset-0 flex z-50 backdrop-filter backdrop-blur-sm`
              : "bg-transparent fixed flex"
          }
        >
          {isProfileVisible && (
            <div className=" bg-slate-200 z-50 border border-slate-400 rounded absolute right-0 top-15 w-2/12 p-5 pt-2 h-52">
              <div className="absolute right-5 border-white  bg-slate-600 rounded-full w-10 p-2 justify-center">
                <RxCross2
                  onClick={toggleProfileVisibility}
                  className="text-2xl text-white"
                />
              </div>
              <div className="flex flex-col items-center justify-around mt-10 text-lg">
                <p
                  className="border-b font-medium border-red-700 py-1 px-2 hover:text-red-700 hover:cursor-pointer"
                  onClick={function (event) {
                    toggleProfileDivVisibility();
                    displayData();
                  }}
                >
                  Edit Profile
                </p>
                <p
                  className="border-b font-medium border-red-700 py-1 px-2 hover:text-red-700 hover:cursor-pointer"
                  onClick={function (event) {
                    // alert(`${isProfileVisible},${isProfileDiv1Visible}` )
                    toggleProfileDiv1Visibility();
                  }}
                >
                  View Timesheet
                </p>
                <button
                  className="font-medium hover:text-red-700 hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {isProfileDivVisible && (
            <div className=" bg-transparent absolute left-1/2 -top-16 w-20 z-10 ">
              {/* <div className={`absolute inset-0 z-50 flex items-center justify-center ${eg ? 'backdrop-filter backdrop-blur-lg' : ''}`}> */}
              <Profile
                profilevalue={profilevalue.user}
                onUpdateProfile={updateProfileValue}
                func={toggleProfileDivVisibility}
              />
            </div>
          )}
          {isProfileVisible&&isProfileDiv1Visible && (
            <div className=" bg-transparent  w-full z-10 ">
              <div className="flex flex-col bg-white rounded-md  w-10/12 max-h-screen p-10 ">
              <h1 className=" text-slate-700 font-bold text-xl">
                View Old Timesheet
              </h1>
              <div className="flex flex-row w-2/4 items-center justify-around mt-5 align-center">
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
                <div className="flex overflow-y-auto">
                  <div className="flex relative mt-5 overflow-y-auto  shadow-md sm:rounded-md">
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
                </div>
              ) : (
                <></>
              )}
              
                </div>
            </div>
            
          )}
        </div>
      </div>
      <div></div>

      <Timesheet />
      {/* <TimesheetList /> */}
    </div>
  );
};

export default Employee;
