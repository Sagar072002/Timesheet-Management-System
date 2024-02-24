import React, {  useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Detail = ({ employee ,func}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCrossClick = () => {
    setIsVisible(false);
    func()
  };

  if (!isVisible) {
    return null; // If isVisible is false, return null to render nothing
  }
  return (
    <section className=" p-3">
      <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
        <div className="min-w-[350px] bg-cyan-600 text-white  rounded-md  min-h-[350px]   md:mt-0 sm:max-w-md xl:p-0 relative border border-slate-400">
          <div className="absolute top-2 right-2 mt-2 mr-2  text-white hover:text-slate-700 rounded-full p-1">
            <RxCross2 className="text-2xl" onClick={handleCrossClick} />
          </div>
          <div className="flex gap-10 w-full justify-center items-center mt-10">
            <div className="left leading-10 font-bold">
              <p>Name:</p>
              <p>User ID:</p>
              <p>Email:</p>
              <p>Gender:</p>
              <p>Age:</p>
              <p>Phone:</p>
              <p>Address:</p>
            </div>
            <div className="right leading-10 font-medium">
              <p>{employee.name}</p>
              <p>{employee.userid}</p>
              <p>{employee.email}</p>
              <p>{employee.gender}</p>
              <p>{employee.age}</p>
              <p>{employee.phone_number}</p>
              <p>{employee.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
