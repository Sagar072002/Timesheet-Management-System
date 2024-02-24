import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewScorecard = ({ employee }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [fetchedData, setFetchedData] = useState(null); // State to store fetched data

    const handleCrossClick = () => {
        setIsVisible(false);
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
            const response = await axios.post('http://localhost:3000/getscore', {
                "userid": userId,
                "year": selectedYear,
                "month": selectedMonth
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
        <div className='bg-cyan-600 text-white flex rounded-md p-5 mx-auto min-h-[350px]'>
            <div className="absolute top-2 right-2 mt-2 mr-2 bg-white text-cyan-500 hover:text-slate-700 rounded-full p-1">
                <RxCross2 className="text-2xl" onClick={handleCrossClick} />
            </div>
            <div className="w-2/3 mt-3 flex gap-2 border-r-2">
                <div className="w-full px-5 flex flex-col gap-4">
                    <div className="">
                        <p className='font-bold text-lg'>Name: <span className='font-medium '>{employee.name}</span></p>
                        <p className='font-bold text-lg'>Email: <span className='font-medium '>{employee.email}</span></p>
                        <p className='font-bold text-lg'>User Id: <span className='font-medium '>{employee.userid}</span></p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="year" className="font-bold">Select Year:</label>
                        <select id="year" className="p-2 border rounded-md text-black outline-none" onChange={handleYearChange}>
                            <option value="">Select Year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() + i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <label htmlFor="month" className="font-bold">Select Month:</label>
                        <select id="month" className="p-2 border rounded-md outline-none text-black" onChange={handleMonthChange}>
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
                        <button type="button" onClick={handleSubmit} className={`bg-cyan-500 text-black rounded-md py-2 ${!selectedYear || !selectedMonth ? 'cursor-not-allowed opacity-50 ' : 'text-white'}`} disabled={!selectedYear || !selectedMonth}>Submit</button>
                    </div>
                </div>
            </div>
            <div className="w-2/3 mt-5">
                <p className='text-center text-xl font-bold'>Result:</p>
                {/* Render fetched data */}
                {fetchedData && fetchedData.length > 0 ? (
                    <div className="mt-3 pl-4">
                        <p className="font-bold mb-3">Weekly Scores:</p>
                        <table className="border-collapse border border-gray-800 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-800 px-4 py-2">Week Number</th>
                                    <th className="border border-gray-800 px-4 py-2">Score</th>
                                    <th className="border border-gray-800 px-4 py-2">Date Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchedData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-800 px-4 py-2 text-center">{item.week_number}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center">{item.score}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center">{item.date_range}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-20 text-center pl-4 text-2xl font-bold">No data available</p>
                )}
            </div>
        </div>
    );
};

export default ViewScorecard;
