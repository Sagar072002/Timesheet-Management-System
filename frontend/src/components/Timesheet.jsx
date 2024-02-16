import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timesheet = () => {
  const n = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("auth") === "false") {
      n("/");
    }
  }, []);

  return (
    <div className="flex h-lvh">
      
        <div className="mt-6 ml-10 w-full lower">
          <div className="App">
            <div className="flex flex-col">
              <div className="min-w-full py-3 sm:px-6 lg:px-8">
                <table className="min-w-full max-w-md text-left text-sm font-light">
                  <thead className="border-4 font-medium uppercase">
                    <tr className=" text-lg text-white">
                      <th className="px-5 py-5 border-4 ">Day</th>
                      <th className="px-5 py-5 border-4 ">Task</th>
                      <th className="px-5 py-5 border-4 ">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=" text-white border-4 text-lg">
                      <td className="whitespace-nowrap px-5 py-6 border-4 font-medium">
                        Monday
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>{" "}
                    </tr>
                    <tr className=" text-white border-4 text-lg">
                      <td className="whitespace-nowrap px-5 py-6 border-4 font-medium">
                        Tuesday
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className=" text-white border-4 text-lg">
                      <td className="whitespace-nowrap px-5 py-6 border-4 font-medium">
                        Wednesday
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className=" text-white border-4 text-lg">
                      <td className="whitespace-nowrap px-5 py-6 border-4 font-medium">
                        Thursday
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className=" text-white border-4 text-lg">
                      <td className="whitespace-nowrap px-5 py-6 border-4 font-medium">
                        Friday
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                      <td className="border-4">
                        <input
                          className="text-white bg-transparent outline-none  w-full whitespace-nowrap px-6 py-7 "
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex mt-4 gap-5 justify-center">
              <button className="px-8 py-3 border-2 rounded bg-transparent text-white font-bold  border-white hover:bg-white hover:text-black">
                Save
              </button>
              <button className="px-8 py-3 border-2 rounded bg-white text-black font-bold  border-white hover:bg-transparent hover:text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Timesheet;
