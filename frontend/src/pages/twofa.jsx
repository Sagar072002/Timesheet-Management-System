import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tb2Fa,TbPasswordMobilePhone  } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Twofa = ({ visible }) => {
  const [image, setimg] = useState("");
  const [temp, settemp] = useState("");
  const [twofa, settwofa] = useState("");
  const n = useNavigate();
  //   const mail = "abc@gmail.com";
  useEffect(() => {
    async function fd() {
      settwofa(sessionStorage.getItem("2fa"));
      if (sessionStorage.getItem("2fa") != "false") {

        if (sessionStorage.getItem("userType")=="true") {
          n("/admin");
        } else {
          n("/Employee");
        }
      } else {
        const response = await axios
          .post("http://localhost:3000/auth/qr", {
            id: sessionStorage.getItem("useremail"),
          })
          .catch((e) => console.log(e));
        if (response.status === 200) {
          console.log(response.data);
          setimg(response.data.image);
          settemp(response.data.temp);
        }
      }
    }
    fd();
  }, [twofa]);

  const handleverify = async () => {
    const code = document.getElementById("text").value;

    const response = await axios
      .post("http://localhost:3000/auth/set2fa", {
        email: sessionStorage.getItem("useremail"),
        temp: temp,
        code: code,
      })
      .catch((e) => toast.error(e.response.data.message));
    console.log(response);
    if (response.status === 200 && response.data.success === true) {
      toast.success("done");
      settwofa(sessionStorage.setItem("2fa", response.data.twofa));
      setTimeout(() => {
        if (sessionStorage.getItem("userType")=="true") {
          n("/admin");
        } else {
          n("/Employee");
        }
      }, 4500);
    }
  };
  if (visible != "false") {
    return <></>;
  }

  return (
    <div className="bg-transparent fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <ToastContainer />
      <div className="bg-white w-1/5 border-2 rounded-lg shadow">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-black md:text-2xl ">
                Authentication Setup
              </h1>
            <div>{sessionStorage.getItem("useremail")}</div>
          </div>
          <div className="flex flex-col p-4">
            <img src={image === "" ? "" : image} alt="Loading"></img>
            <p className="text-sm leading-tight tracking-tight text-center">Use Google Authenticator to Scan code</p>
          </div>
          <div className="flex flex-col w-64">

              <label
                htmlFor="text"
                className="text-black block mb-2 text-sm font-medium  "
              >
                Enter Auth ID (6-Digit code)<span className="text-red-600"></span>
              </label>
              <div className="flex bg-slate-50 border-2 border-neutral-400 p-3 rounded">
                <TbPasswordMobilePhone  size={30} className="mr-3"/>

                <input
                  type="text"
                  name="text"
                  id="text"
                  className="bg-transparent border-none  text-gray-900 sm:text-sm -md outline-none block w-full "
                  placeholder="xxxxxx"
                  required=""
                />
              </div>

            <div className="pt-5">
              <button
                type="submit"
                onClick={handleverify}
                className="w-full  text-white bg-cyan-600 hover:bg-cyan-500 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Twofa;
