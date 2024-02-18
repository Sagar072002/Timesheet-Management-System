import React from 'react';

const TimesheetList = ({ timesheet }) => {
  // State to control the visibility of tasks and durations
  const [showTasks, setShowTasks] = React.useState(timesheet ? false : true);

  // Define an array of day names
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Toggle function to show/hide tasks and durations
  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  // Check if timesheet is undefined
  if (!timesheet) {
    return null; // Return null if timesheet is undefined
  }

  // Destructure timesheet object
  const { timesheetNumber, weekRange } = timesheet;

  return (
    <div className="bg-white  p-4 mb-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Timesheet #{timesheetNumber}</p>
          <p className="text-gray-600">Week Range: {weekRange}</p>
        </div>
        <button onClick={toggleTasks} className='bg-slate-700 text-white px-7 py-3 rounded-md'>{showTasks ? 'Hide Tasks' : 'View'}</button>
      </div>
      {showTasks && (
        <div className="mt-2 flex flex-wrap">
          {timesheet.tasks.map((task, index) => (
            <div key={index} className="m-2 task-wrapper">
              <div className="p-4 bg-slate-700 text-white shadow-md rounded-md">
                <p className="font-semibold">Task name: {task.task}</p>
                <ul className="list-disc list-inside">
                  {task.durations.map((duration, dayIndex) => (
                    // Check if duration exists for the day
                    duration && (
                      <li key={dayIndex}>{dayNames[dayIndex]}: {duration} hrs</li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimesheetList;
