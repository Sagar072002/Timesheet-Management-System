import React, { useEffect } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Forgotpass = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const n = useNavigate();
  useEffect(() => {
    async function fd() {
      if(searchParams.size ===0){
        toast.error("Unauthorized Access");
        setTimeout(() => {
          n("/");
        }, 4500);
      }
      else
      {const key = searchParams.get("key");
      const mail = searchParams.get("mail");
      const expiry = searchParams.get("expiry");
      let date1 = new Date(expiry.split("GMT")[0]);
      let date2 = new Date();
      console.log(date1, date2);
      let diff = date2 - date1;
      let seconds = Math.floor(diff / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      // Calculate remaining minutes and seconds
      minutes %= 60;
      seconds %= 60;
      console.log(minutes, hours);
      if (hours > 0 || minutes > 10) {
        console.log("invalid");
        toast.error("Link Expired");
        setTimeout(() => {
          n("/");
        }, 4500);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3000/mail/verifyforgot",
            {
              email: mail,
              key: key,
            }
          );
          if (response.data.auth === false) {
            toast.error("Invalid Link");
            setTimeout(() => {
              n("/");
            }, 4500);
          }
        } catch (error) {
          toast.error(`Invalid Link`);
          setTimeout(() => {
            n("/");
          }, 4500);
        }}
      }
    }
    fd();
  }, []);

  const handlereset = async () => {
    const response = await axios.post("http://localhost:3000/mail/reset", {
      email: searchParams.get("mail"),
      password: document.getElementById("password").value,
    });
    if (response.data.update === false) {
      toast.error(response.error);
    }
    if (response.data.update === true) {
      toast.success("Password Reset Successfully");
      setTimeout(() => {
        n("/");
      }, 4500);
    }
  };

  return (
    <>
      <section className="back">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full border-2 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-white md:text-2xl ">
                Reset Password
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-white block mb-2 text-sm font-medium  "
                  >
                    Email ID <span className="text-red-600"></span>
                  </label>
                  <div className="flex bg-slate-50 border p-3 rounded">
                    <FaUser className="mr-3" />

                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={searchParams.get("mail")}
                      className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                      placeholder="Your email id"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-white block mb-2 text-sm font-medium  "
                  >
                    Password
                  </label>
                  <div className="flex bg-slate-50 border p-3 rounded">
                    <FaLock className="mr-3" />

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="repassword"
                      className="text-white block mb-2 text-sm font-medium  "
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div>
                    <div className="flex bg-slate-50 border p-3 rounded">
                      <FaLock className="mr-3" />

                      <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        placeholder="••••••••"
                        className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handlereset}
                  className="w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forgotpass;
