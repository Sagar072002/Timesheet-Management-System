import React from 'react';
import { Link } from 'react-router-dom';
import {FaLock} from "react-icons/fa"
import {MdEmail} from "react-icons/md"

const Login = () => {
  
  return (
    <>
   <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
        <div>
               <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <MdEmail className='mr-3' />

              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border-none border-b-gray-300 text-gray-900 sm:text-sm -md outline-none block w-full "
                placeholder="Your Email"
                required=""
              />
 </div>

             </div>
          <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <div className="flex bg-slate-50 border p-3 rounded">
              <FaLock className='mr-3' />

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
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 "
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline "
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Sign in
          </button>
          <p className="text-md font-light text-gray-500 ">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline "
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Login