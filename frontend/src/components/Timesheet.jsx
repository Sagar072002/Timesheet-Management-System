import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import TimesheetList from '../pages/TimesheetList';
import { ToastContainer, toast } from 'react-toastify';

const Timesheet = () => {
  const [rowCount, setRowCount] = useState(1);
  const [timeData, setTimeData] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [timesheets, setTimesheets] = useState([]);
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);

  useEffect(() => {
    const filled = timeData.some(row => row.some((field, index) => index !== 0 && field !== ''));
    setIsAnyFieldFilled(filled);
  }, [timeData]);


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
    if (!newData[index]) newData[index] = Array(5).fill('');
    newData[index][dayIndex] = value;
    setTimeData(newData);
  };

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  const removeRow = (index) => {
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

  const handleSubmit = () => {
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
      } else {
        toast.error("Please save the timesheet before submitting.");
      }
    } else if (!isAnyTaskFilled && isAnyDurationFilledWithoutTaskName) {
      toast.error("Please fill task name for every filled duration.");
    } else {
      toast.error("Please fill in both task name and duration for each task.");
    }
  };
  

  const handleSave = () => {
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
      const existingTimesheetIndex = timesheets.findIndex(timesheet => timesheet.weekRange === `${weekDates.monday} - ${weekDates.friday}`);
      if (existingTimesheetIndex !== -1) {
        const updatedTimesheets = [...timesheets];
        updatedTimesheets[existingTimesheetIndex] = {
          ...updatedTimesheets[existingTimesheetIndex],
          tasks: timeData.map((taskData, index) => ({
            task: taskData[0] || '',
            durations: taskData ? taskData.slice(1) : [],
          })),
        };
        setTimesheets(updatedTimesheets);
        toast.success("Timesheet updated successfully");
      } else {
        const newTimesheet = {
          timesheetNumber: timesheets.length > 0 ? timesheets[timesheets.length - 1].timesheetNumber + 1 : 1,
          weekRange: `${weekDates.monday} - ${weekDates.friday}`,
          tasks: timeData.map((taskData, index) => ({
            task: taskData[0] || '',
            durations: taskData ? taskData.slice(1) : [],
          })),
        };
        setTimesheets([...timesheets, newTimesheet]);
        toast.success("Timesheet saved successfully");
      }
    } else if (!isAnyTaskFilled && isAnyDurationFilledWithoutTaskName) {
      toast.error("Please fill task name for every filled duration.");
    } else if (!isAnyTaskWithFilledDuration) {
      toast.error("Please fill at least one duration for each task.");
    } else {
      toast.error("Please fill in both task name and duration for each task.");
    }
  };
  
  


  return (
    <div className="w-full mt-7">
      <ToastContainer/>
      <div className="flex justify-between my-14 mx-5 text-white font-bold text-xl">
      <p> Current Week: <span className="font-medium text-lg text-cyan-400">{weekDates.monday} - {weekDates.friday}</span></p> 
      <p> Total Score: <span className="font-medium text-lg text-cyan-400">40</span> </p> 
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
      <input
  type="text"
  className="mt-4 text-center bg-slate-100 h-12 w-full border border-gray-300"
  value={timeData[index] ? timeData[index][0] : ''} 
  onChange={(e) => updateTimeData(index, 0, e.target.value)}
/>
</th>
{[0, 1, 2, 3, 4].map(dayIndex => (
  <td key={dayIndex} className="">
    <input
      type="number"
      className=" mt-4 ml-8 w-3/4 h-12 text-center bg-slate-100 border border-gray-300"
      value={timeData[index] ? timeData[index][dayIndex + 1] : ''} 
      onChange={(e) => updateTimeData(index, dayIndex + 1, e.target.value)}
    // disabled={dayIndex !== (new Date().getDay() + 6) % 7}
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
        <button type="submit" className='bg-cyan-500 hover:bg-cyan-400 px-8 py-3 text-white rounded-sm' onClick={handleSubmit}>Submit</button>
      </div>
      <div className=''>
        <p className='text-white font-bold text-2xl my-12  text-center uppercase'>List of Timesheets</p>
        {timesheets.map(timesheet => (
          <TimesheetList key={timesheet.timesheetNumber} timesheet={timesheet} />
        ))}
      </div>
    </div>
  );
}

export default Timesheet;
