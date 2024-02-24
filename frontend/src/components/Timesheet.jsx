import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import TimesheetList from '../pages/TimesheetList';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from  "react-router-dom"

const Timesheet = () => {
  const [rowCount, setRowCount] = useState(1);
  const [timeData, setTimeData] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [timesheets, setTimesheets] = useState([]);
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);
  const [userScore, setUserScore] = useState(0); // Initialize user score with base value

  const navigate=useNavigate()
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // Define currentDay
  useEffect(() => {
    const filled = timeData.some(row => row.some((field, index) => index !== 0 && field !== ''));
    setIsAnyFieldFilled(filled);
  }, [timeData]);

  useEffect(() => { 
    //fetchTotalScore();
  }, []);

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) + offset * 7;
    const monday = new Date(today.setDate(diff));
    const friday = new Date(monday);
    friday.setDate(friday.getDate() + 4);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const mondayFormatted = monday.toLocaleDateString('en-US', options);
    const fridayFormatted = friday.toLocaleDateString('en-US', options);
    return { monday: mondayFormatted, friday: fridayFormatted };
  };

  useEffect(() => {
    const { monday, friday } = getWeekDates(weekOffset);
    setWeekDates({ monday, friday });
  }, [weekOffset]);

  const [weekDates, setWeekDates] = useState(getWeekDates());

  const updateTimeData = (index, dayIndex, value) => {
    const newData = [...timeData];
    if (!newData[index]) newData[index] = [];
    if (!newData[index][dayIndex]) newData[index][dayIndex] = '';
    if (dayIndex === 0 && !newData[index][dayIndex]) newData[index][dayIndex] = value; // Update task name only if not already present
    else newData[index][dayIndex] = value; // Update day data
    setTimeData(newData);
  };

  
  //get total score of the user
  const fetchTotalScore = async () => {
    var inputDate = new Date(weekDates.monday);
    console.log("inputDatescore",inputDate)
    // Format the Date object to "YYYY-MM-DD" format
    const sdate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    console.log("sdate",sdate)
    try{
      const response = await axios.post('http://localhost:3000/totalscore',
        {
          "userid": sessionStorage.getItem("userName"),
          "startDate": sdate,
        }     
    
      );
   
      const totalscore= response.data;
      console.log("total score",totalscore)
      setUserScore(totalscore.totalScore)
      console.log("score",totalscore.totalScore)
      if(response.status!==200){
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        console.log(
          `${response.status}\n${response.statusText}\n${totalscore.message}`
       )
      }
 
        // response.status
      //   toast.success(
      //     `${response.status}\n${response.statusText}\n${data.message}`
      //  )
      if(response.status===200){
 
       toast.success("fetch score successfully");
     }
   
    }
      catch(error){
        toast.error("Error in fetching score")
      }
  }

  //get week range(submitted timesheet) of the user
  const fetchWeekRange = async () => {
    var inputDate = new Date(weekDates.monday);
    console.log("inputDatescore",inputDate)
    // Format the Date object to "YYYY-MM-DD" format
    const sdate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    console.log("sdate",sdate)
    try{
      const response = await axios.post('http://localhost:3000/daterange',
        {
          "userid": sessionStorage.getItem("userName"),
          "start_date": sdate,
        }     
    
      );
   
      const data= response.data;
      console.log("week_ranges",data)

      if(response.status!==200){
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        console.log(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
      }
 
        // response.status
      //   toast.success(
      //     `${response.status}\n${response.statusText}\n${data.message}`
      //  )
      if(response.status===200){
 
       toast.success("fetch week range successfully");
     }
   
    }
      catch(error){
        toast.error("Error in fetching week range")
      }
  }

  //get taskdetails of the user
  const fetchTaskDetails = async () => {
    
    try{
      const response = await axios.post('http://localhost:3000/gettaskdetails',
        {
          // "userid": sessionStorage.getItem("userName"),
          // "startDate": sdate,
          // "endDate": edate
        }     
    
      );
   
      const data= response.data;
      console.log("task details",data)

      if(response.status!==200){
        // response.status
        // console.log("*********",response.status,response.statusText,data.message,data.errors)
        console.log(
          `${response.status}\n${response.statusText}\n${data.message}`
       )
      }
 
        // response.status
      //   toast.success(
      //     `${response.status}\n${response.statusText}\n${data.message}`
      //  )
      if(response.status===200){
 
       toast.success("fetch task details successfully");
     }
   
    }
      catch(error){
        toast.error("Error in fetching task details")
      }
  }

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  const removeRow = async (index) => {
    if (rowCount > 1) {
      const updatedData = [...timeData];
      updatedData.splice(index, 1); 
    
      const updatedTimesheets = timesheets.map(timesheet => ({
        ...timesheet,
        tasks: timesheet.tasks.filter((task, taskIndex) => taskIndex !== index),
      }));
    
      setTimeData(updatedData);
      setTimesheets(updatedTimesheets);
      setRowCount(rowCount - 1);

      console.log("task",timeData[index][0]);
      var inputDate = new Date(weekDates.monday);
      console.log("inputDate1",inputDate)
      // Format the Date object to "YYYY-MM-DD" format
      const sdate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;

      inputDate = new Date(weekDates.friday);
      console.log("inputDate2",inputDate)
      // Format the Date object to "YYYY-MM-DD" format
      const edate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
      
      console.log(sdate,edate);

      try{
        const response = await axios.post('http://localhost:3000/deletetimelog',
          {
            "userid": sessionStorage.getItem("userName"),
            "task": timeData[index][0],
            "startDate": sdate,
            "endDate": edate
          }     
       
        );
     
        const data= response.data;
        console.log("del",data)
        if(response.status!==200){
          // response.status
          // console.log("*********",response.status,response.statusText,data.message,data.errors)
          console.log(
            `${response.status}\n${response.statusText}\n${data.message}`
         )
        }
   
          // response.status
        //   toast.success(
        //     `${response.status}\n${response.statusText}\n${data.message}`
        //  )
        if(response.status===200){
   
         toast.success("Deleted successfully");
       }
     
      }
        catch(error){
          toast.error("Error in deleting")
        }

    }
  };

  const calculateTotal = (dayIndex) => {
    let total = 0;
    timeData.forEach((rowData) => {
      if (rowData && rowData[dayIndex + 1]) {
        total += parseFloat(rowData[dayIndex + 1]);
      }
    });
    return total;
  };

  const calculateTaskTotal = (taskIndex) => {
    let total = 0;
    if (timeData[taskIndex]) {
      timeData[taskIndex].slice(1).forEach((value) => {
        if (value) {
          total += parseFloat(value);
        }
      });
    }
    return total;
  };

  const calculateWeekNumber = (mondayDate) => {
    mondayDate = new Date(Date.UTC(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate()));
    mondayDate.setUTCDate(mondayDate.getUTCDate() + 4 - (mondayDate.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(mondayDate.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((mondayDate - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };
  const handleSubmit = async () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  
    // Check if the current day is Friday (day index 5)
    if (currentDay === 6) {
      const isFridayFieldsFilled = timeData.every(row => row[6] !== '');
      if (!isFridayFieldsFilled) {
        toast.error("Please fill in the fields for thursday before submitting.");
        return;
      }
      const submissionTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Convert current time to minutes

      // Check if submission time is before 8:50 AM (530 minutes)
      const bonusPoints = submissionTime < (11 * 60 + 45) ? 10 : 0;
  
      const isAnyTaskFilled = timeData.every(row => {
        const taskName = row[0];
        const durations = row.slice(1);
        return durations.every((duration, index) => duration === '' || (taskName !== '' && duration !== ''));
      });
  
      const isAnyDurationFilledWithoutTaskName = timeData.some(row => {
        const taskName = row[0];
        const durations = row.slice(1);
        return durations.some((duration, index) => duration !== '' && taskName === '');
      });
     
    
    
      if (isAnyTaskFilled && !isAnyDurationFilledWithoutTaskName) {
        const isTimesheetSaved = timesheets.some(timesheet => timesheet.weekRange === `${weekDates.monday} - ${weekDates.friday}`);
        if (isTimesheetSaved) {
          setWeekOffset(weekOffset + 1);
          const emptyData = timeData.map(row => row.map(() => ''));
          setTimeData(emptyData);
          setRowCount(1);
          toast.success("Timesheet submitted Successfully");
         // Calculate week number based on the Monday of the displayed week range
         const mondayDate = new Date(weekDates.monday);
         const weekNumber = calculateWeekNumber(mondayDate);

         const updatedUserScore = userScore + bonusPoints;
         setUserScore(updatedUserScore);
         
         // Print bonus points in the console
         //console.log(`Bonus Points: ${bonusPoints}`);
 
         // Print current week and week number in the console
         //console.log(`Week Number: ${weekNumber}, Current Week: ${weekDates.monday} - ${weekDates.friday}`);
         //console.log(bonusPoints,weekNumber,weekDates.monday,weekDates.friday,sessionStorage.getItem("userName"))

          try{
           const response = await axios.post('http://localhost:3000/scorecard',
             {
               "date_range":`${weekDates.monday} - ${weekDates.friday}`,
               "userid": sessionStorage.getItem("userName"),
               "week_number":weekNumber,
               "score":bonusPoints,
             }     
          
           );
        
           const data= response.data;
           console.log(data)
           if(response.status!==200){
             // response.status
             // console.log("*********",response.status,response.statusText,data.message,data.errors)
             console.log(
               `${response.status}\n${response.statusText}\n${data.message}`
            )
           }
      
             // response.status
           //   toast.success(
           //     `${response.status}\n${response.statusText}\n${data.message}`
           //  )
           if(response.status===200){
      
            toast.success("database row created successful!");
          }
        
           }
           catch(error){
             toast.error("Error in creating database row!")
           }
      
        } else {
          toast.error("Please save the timesheet before submitting.");
        }
      } else if (!isAnyTaskFilled && isAnyDurationFilledWithoutTaskName) {
        toast.error("Please fill task name for every filled duration.");
      } else {
        toast.error("Please fill in both task name and duration for each task.");
      }
    } else {
      // Display a message or prevent submission if it's not Friday
      toast.error("You can only submit timesheets on Friday.");
    }
  };
  
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const handleSave = async() => {
    const isAnyTaskFilled = timeData.every(row => {
      const taskName = row[0];
      const durations = row.slice(1);
      return durations.every((duration, index) => duration === '' || (taskName !== '' && duration !== ''));
    });
  
    const isAnyDurationFilledWithoutTaskName = timeData.some(row => {
      const taskName = row[0];
      const durations = row.slice(1);
      return durations.some((duration, index) => duration !== '' && taskName === '');
    });
  
    const isAnyTaskWithFilledDuration = timeData.some(row => {
      const taskName = row[0];
      const durations = row.slice(1);
      return durations.some(duration => duration !== '') && taskName !== '';
    });


  
    if (isAnyTaskFilled && !isAnyDurationFilledWithoutTaskName && isAnyTaskWithFilledDuration) {
      // Process the timesheet data for saving
      const existingTimesheetIndex = timesheets.findIndex(timesheet => timesheet.weekRange === `${weekDates.monday} - ${weekDates.friday}`);
      const updatedTaskData = timeData.map((taskData, index) => ({
        task: taskData[0] || '',
        durations: taskData.slice(1).filter(duration => duration !== ''), // Filter out empty durations
        day: taskData.slice(1).map((duration, dayIndex) => {
          if (duration !== '') {
            const currentDate = new Date(weekDates.monday);
            currentDate.setDate(currentDate.getDate() + dayIndex);
            return currentDate.toLocaleDateString('en-GB');
          }
        }).filter(date => date !== undefined)
      }));
      console.log("updatedTaskData",updatedTaskData)
      for (const task of updatedTaskData)
      {
        const { day, durations, task: taskName } = task;
        //console.log("taskName",taskName)
        for (let i = 0; i < day.length; i++) {
          const duration = durations[i];
          var date = day[i];
          var parts = date.split('/');
          var date = `${parts[2]}-${parts[1]}-${parts[0]}`;

          console.log("date",date)
          console.log("duration",duration)
          console.log("taskName",taskName)
          //api calling

          try{
            const response = await axios.post('http://localhost:3000/timelog',
              {
                "userid": sessionStorage.getItem("userName"), 
                "date": date,
                "task": taskName,
                "duration": duration,
                "status": "save",
              }     
           
            );
         
            const data= response.data;
            console.log(data)
            if(response.status!==200){
              // response.status
              // console.log("*********",response.status,response.statusText,data.message,data.errors)
              console.log(
                `${response.status}\n${response.statusText}\n${data.message}`
             )
            }
       
              // response.status
            //   toast.success(
            //     `${response.status}\n${response.statusText}\n${data.message}`
            //  )
            if(response.status===200){
       
             toast.success("database row created successful!");
           }
         
            }
            catch(error){
              toast.error("Error in creating database row!")
            }

        }
      }
      if (existingTimesheetIndex !== -1) {
        const existingTimesheet = timesheets[existingTimesheetIndex];
  
        const updatedTimesheets = [...timesheets];
        updatedTimesheets[existingTimesheetIndex] = {
          ...existingTimesheet,
          tasks: updatedTaskData,
        };
        setTimesheets(updatedTimesheets);
        toast.success("Timesheet updated successfully");
      } else {
        const newTimesheet = {
          timesheetNumber: timesheets.length > 0 ? timesheets[timesheets.length - 1].timesheetNumber + 1 : 1,
          weekRange: `${weekDates.monday} - ${weekDates.friday}`,
          tasks: updatedTaskData,
        };
  
        setTimesheets([...timesheets, newTimesheet]);
        setIsFirstEntry(false);
        toast.success("Timesheet saved successfully");
        if (isFirstEntry) {
          setIsFirstEntry(false);
          // toast.info("New entry added to timesheet");
        }
      }
    } else if (!isAnyTaskFilled && isAnyDurationFilledWithoutTaskName) {
      toast.error("Please fill task name for every filled duration.");
    } else if (!isAnyTaskWithFilledDuration) {
      toast.error("Please fill at least one duration for each task.");
    } else {
      toast.error("Please fill in both task name and duration for each task.");
    }
  };
  
 const handletimesheetlist=()=>{
  // alert("hello")
  navigate("/timesheetlist")
  console.log(weekDates.monday,weekDates.friday)
 }


  return (
    <div className="w-full mt-20">
      <ToastContainer/>
      
      <div className=" my-10 mx-5 text-white font-bold text-xl">
      <p> Current Week: <span className="font-medium text-lg text-cyan-400">{weekDates.monday} - {weekDates.friday}</span></p> 
      <p> Total score: <span className="font-medium text-lg text-cyan-400">{userScore}</span> </p> 
      </div> 
    
      <div className="relative  overflow-x-auto shadow-md sm:rounded-md">
      <table className=" bg-white w-full text-sm text-gray-500">
      <thead className="w-full text-white text-center text-base bg-cyan-600 ">
  <tr className='relative '>
    <th scope="col" className="w-50 py-2  border-white border-r-2 uppercase text-xl ">
   <span className='absolute left-20 top-12'>   Task</span>
    </th>
    <th colSpan="5" scope="col" className="h-15 px-6 py-4 uppercase text-xl">
      Duration 
    </th>
    
    <th scope="col" className="w-40 px-6 py-2 border-white border-l-2 uppercase text-xl">
    <span className='absolute right-13 top-12'>   Total</span>
    </th> 
    <th scope="col" className="px-6 py-3"></th>
  </tr>
  <tr >
    <th scope="col" className="px-6 py-3 "></th>
    {[...Array(5)].map((_, index) => {
      const currentDate = new Date(weekDates.monday);
      currentDate.setDate(currentDate.getDate() + index);
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[currentDate.getDay()];
      const formattedDate = `${day}-${month}-${year} `;
      return (
        <th key={index} scope="col" className="px-6 py-3 border-2 border-white">
          {dayName} <br /> {formattedDate}
        </th>
      );
    })}
    <th scope="col" className="px-6 py-3"></th>
    <th scope="col" className="px-6 py-3"></th>
  </tr>
</thead>

          <tbody >
  {[...Array(rowCount)].map((_, index) => (
    <tr key={index} className="bg-white">
      <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap ">
      {/* <input
  type="text"
  className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
  value={timeData[index] ? timeData[index][0] : ''} 
  onChange={(e) => updateTimeData(index, 0, e.target.value)}
/> */}
<input
  type="text"
  className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
  value={timeData[index]?.[0] || ''} 
  onChange={(e) => updateTimeData(index, 0, e.target.value)}
/>

</th>
{[0, 1, 2, 3, 4].map(dayIndex => (
  <td key={dayIndex} className="">
    {/* <input
  type="number"
  className="mt-4 ml-8 w-3/4 h-12 text-center bg-slate-100 border border-gray-300"
  value={timeData[index] ? timeData[index][dayIndex + 1] : ''} 
  onChange={(e) => updateTimeData(index, dayIndex + 1, e.target.value)}
  disabled={dayIndex >= currentDay}
/> */}
<input
  type="number"
  className="mt-4 ml-8 w-3/4 h-12 text-center bg-slate-100 border border-gray-300"
  value={timeData[index]?.[dayIndex + 1] || ''} 
  onChange={(e) => updateTimeData(index, dayIndex + 1, e.target.value)}
  disabled={dayIndex >= currentDay}
/>
  </td>
))}
      <td className="text-center text-xl">
        {calculateTaskTotal(index)}
      </td>
      <td className="flex pt-9 ">
        {index === 0 ? (
          <FiPlusCircle className="text-2xl cursor-pointer mr-2" onClick={addRow} />
        ) : (
          <>
            <FiPlusCircle className="text-2xl cursor-pointer mr-2" onClick={addRow} />
            <FiMinusCircle className="text-2xl cursor-pointer" onClick={() => removeRow(index)} />          </>
        )}
      </td>
    </tr>
  ))}
  <tr className="">
    <th scope="row" className="px-6 py-4 font-bold text-xl text-cyan-700 whitespace-nowrap">
      Total
    </th>
    {[0, 1, 2, 3, 4].map(dayIndex => (
      <td key={dayIndex} className="text-center text-lg">
        {calculateTotal(dayIndex)}
      </td>
    ))}
    <td></td>
  </tr>
</tbody>

        </table>
      </div>
      <div className="w-full flex justify-end p-4 gap-4">
        <button type="button" className='bg-cyan-500 hover:bg-cyan-400 px-8 py-3 text-white rounded-sm' onClick={handleSave}>Save</button>
        <button
  type="submit"
  className={`px-8 py-3 rounded-sm ${currentDay !== 6 ? 'bg-gray-200 text-slate-700 cursor-not-allowed' : 'bg-cyan-500 text-white hover:bg-cyan-400'}`}
  onClick={handleSubmit}
  disabled={currentDay !== 6} // Disabling the button programmatically as well
>
  Submit
</button>
<button className='bg-white' onClick={fetchWeekRange}>range</button>
<button  className='bg-white' onClick={fetchTotalScore}>totscore</button>
      </div>
      <button  className='text-white border-2 px-5 py-2 rounded-md' onClick={fetchTotalScore}>View Previous Timesheet List</button>
      {/* <div >
  <p  className='text-white font-bold text-2xl my-12 text-center uppercase' >View Previous Timesheet List</p>
  {timesheets.map(timesheet => (
    
  <div key={timesheet.timesheetNumber} className="mb-4 bg-white pt-2">
    <p className="text-black font-bold text-lg my-2 text-center">Timesheet for {timesheet.weekRange}</p>
    <div className=' flex gap-3 '>
    {timesheet.tasks.map((task, index) => (
  <div key={index} className="mb-4 rounded-md p-4">
    {task.durations.some(duration => parseFloat(duration) !== 0) && ( // Check if any duration is not zero
      <div className="flex flex-col bg-gray-800 p-3 rounded-md mb-2">
        <p className="text-white mb-1 font-bold">Task Name: <span className='font-medium'>{task.task}</span> </p>
        {task.durations.map((duration, dayIndex) => {
          if (parseFloat(duration) !== 0) { // Only render if duration is not zero
            const currentDate = new Date(weekDates.monday);
            currentDate.setDate(currentDate.getDate() + dayIndex);
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${day}-${month}-${year}`;
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[currentDate.getDay()];
            return (
              <div key={dayIndex} className="flex gap-5 justify-between text-white">
                <p>{dayName}</p>
                <p> {formattedDate}</p>
                <p>{duration} hr</p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    )}
  </div>
))}
</div>
  </div>
))}

<div className="flex justify-center mt-10 align-center">
      <select
        className="bg-white rounded-md outline-none p-3 w-3/5 border"
        name="month"
        id="month"
      >
        <option value="">Select week range</option>
        <option value="Male">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Female">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Other">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Other">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Other">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Other">Mon Feb 19 2024 - Fri Feb 23 2024</option>
        <option value="Other">Mon Feb 19 2024 - Fri Feb 23 2024</option>


      </select>
    </div>
</div> */}

    </div>
  );
}

export default Timesheet;