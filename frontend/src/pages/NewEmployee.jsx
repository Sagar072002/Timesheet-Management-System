import React, { useState,useEffect, useCallback } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
import { RxHamburgerMenu,RxCross2 } from "react-icons/rx";
import Timesheet from "../components/Timesheet";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { toast,ToastContainer } from "react-toastify";
import Twofa from "./twofa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const NewEmploye = () => {
  const [counterOn, setCounterOn] = useState(false);
  const [counterResetKey, setCounterResetKey] = useState(0);
  const n = useNavigate();
  const handleScroll = useCallback(
    (isVisible) => {
      if (!counterOn && isVisible) {
        setCounterOn(true);
        setCounterResetKey((prevKey) => prevKey + 1);
      }
    },
    [counterOn]
  );
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
  const [username, setUsername] = useState("");

  const [profilevalue, setProfileValue] = useState("");
  const [score,setScore]=useState(0)
  const [week,setWeek]=useState(0)
  const [duration,setDuration]=useState(0)
  const [time_count,setTimeCount]=useState(0)

  useEffect(() => {
    const fetchedUsername = sessionStorage.getItem("userName");
    console.log("Fetched username:", fetchedUsername);
    setUsername(fetchedUsername);
    displayData();
    if (
      sessionStorage.getItem("auth") === "true" &&
      sessionStorage.getItem("userName")[0] === "A"
    ) {
      n("/admin");
      alert('admin')
    } else if (
      sessionStorage.getItem("auth") === "true" &&
      sessionStorage.getItem("userName") !== ""
    ) {
      n("/newemp");
    } else {
      n("/");
      alert('logout')
    }
    // console.log(employee);
    const userscore=async ()=>  {
      const response=await axios.post('http://localhost:3000/userscore',{
        "id":fetchedUsername
      })
      setScore(response.data.score)
      setWeek(response.data.week)
      setDuration(response.data.totaldur)
      setTimeCount(response.data.timeseet_count)
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
      console.log(data);
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
  const [ham,setHam]=useState(true)
  return (
    <div className="w-full h-screen flex">
      <ToastContainer />

      <Twofa
        className="w-full bg-white"
        visible={sessionStorage.getItem("2fa")}
      />
      <div className={ham?`w-1/6 bg-cyan-600 bg-opacity-35 flex flex-col p-3`:`hidden`}>
      {ham?<RxCross2 className="absolute top-2 left-52 text-3xl" onClick={()=>{setHam(false)}}/>:<></>}
        <div className=" justify-center relative mt-10 mb-4 rounded-full flex">
        {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down mt-2 rounded-full"/>:<FaUser className="ml-5 mt-5 w-14 h-14" />}
          
        </div>
        <p className="text-center font-bold text-lg">Hii {JSON.parse(sessionStorage.getItem('data')).name}</p>
        <p className="text-center font-bold text-lg">Employee ID : {JSON.parse(sessionStorage.getItem('data')).userid}</p>
        <div className="mt-16 text-xl  flex flex-col gap-8 justify-center items-start">
          <div className='w-full'>
          <Link to='/newemp' ><p className='text-white text-left bg-cyan-600  px-3 py-3 w-full rounded-md font-bold'>Current Timesheet</p></Link>
          </div>
          <div>
          <Link to='/timesheetList' className="px-3">Timesheet List</Link>
          </div>
          <div>
          <Link to='/scorecard'  className="px-3">Score Card</Link>
          </div>
          <div>
          <Link to='/profile' className="px-3">Edit Profile</Link>
          </div>
          <button
            className="px-6 py-2 absolute bottom-2 rounded-md border font-medium bg-red-600 text-white hover:cursor-pointer"
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
      <div className={ham?"w-5/6  pt-5 ":'w-full'}>
        {ham?<></>:<RxHamburgerMenu className="ml-4 mt-4 text-3xl" onClick={()=>{setHam(true)}}/>}
        <div className=" flex counterdiv justify-evenly">
          <div className="bg-white border-cyan-600 hover:bg-cyan-500 hover:cursor-pointer hover:text-white hover:border-transparent border-2 text-black font-['Plus Jakarta Sans']  rounded-lg w-56 justify-center items-center flex flex-col text-xl font-bold h-32 gap-5">
            <ScrollTrigger
              key={counterResetKey}
              onEnter={handleScroll}
              onExit={handleScroll}
            >
              {counterOn && (
                <CountUp start={0} end={time_count} duration={2} delay={0} />
              )}
            </ScrollTrigger>
            <p>No. of Timesheets</p>
          </div>
          <div className="bg-white border-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-transparent border-2 text-black font-['Plus Jakarta Sans']  rounded-lg w-56 justify-center items-center flex flex-col text-xl font-bold h-32 gap-5">
            <ScrollTrigger
              key={counterResetKey}
              onEnter={handleScroll}
              onExit={handleScroll}
            >
              {counterOn && (
                <CountUp start={0} end={duration} duration={2} delay={0} />
              )}
            </ScrollTrigger>
            <p>Total Hours Worked</p>
          </div>
          <div className="bg-white border-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-transparent border-2 text-black font-['Plus Jakarta Sans']  rounded-lg w-56 justify-center items-center flex flex-col text-xl font-bold h-32 gap-5">
            <ScrollTrigger
              key={counterResetKey}
              onEnter={handleScroll}
              onExit={handleScroll}
            >
              {counterOn && (
                <CountUp start={0} end={week} duration={2} delay={0} />
              )}
            </ScrollTrigger>
            <p>Current week Hours</p>
          </div>
          <div className="bg-white border-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-transparent border-2 text-black font-['Plus Jakarta Sans']  rounded-lg w-56 justify-center items-center flex flex-col text-xl font-bold h-32 gap-5">
            <ScrollTrigger
              key={counterResetKey}
              onEnter={handleScroll}
              onExit={handleScroll}
            >
              {counterOn && (
                <CountUp
                  start={0}
                  end={sessionStorage.getItem("score")}
                  duration={2}
                  delay={0}
                />
              )}
            </ScrollTrigger>
            <p>Total Score</p>
          </div>
        </div>
        <div className="-mt-10 px-5 contentdiv">
          <Timesheet />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default NewEmploye;
