import React, { useState } from "react";
import img from "../images/Group.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
export default function CreatenewPassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [Password, setPassword] = useState(true);
  return (
    <>
      <div className="flex  items-center justify-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0]">
        <div className="flex justify-center items-center flex-col mt-10">
          <div className="flex text-[#B08655]    items-center">
            <img className="h-[39px] w-[206px] object-cover" src={logo} />
          </div>
        </div>
        <div className="w-[90%] rounded-[20px] bg-white flex justify-center mt-10 items-center flex-col">
          <h1 className="font-[1000] text-[24px] text-black mt-5 Satoshi-bold ">
            Create New Password
          </h1>
          <h1 className="font-[60] text-[16px] text-black mt-2 ">
            Create your new password below.
          </h1>
          <div className="w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] ">
            <input
              className="outline-none border-none w-[90%] p-3 h-[40px]"
              type={Password ? "password" : "text"}
              name="password"
              placeholder="New Password"
            />
            {Password ? (
              <FaRegEyeSlash
                className="text-[#062A27] text-[20px]"
                onClick={() => setPassword(false)}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="text-[#062A27] text-[20px]"
                onClick={() => setPassword(true)}
              />
            )}
          </div>
          <div className="w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] ">
            <input
              className="outline-none border-none w-[90%] p-3 h-[40px]"
              type={showPassword ? "password" : "text"}
              name="password"
              placeholder="Confirm New Password"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="text-[#062A27] text-[20px]"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="text-[#062A27] text-[20px]"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <button className="bg-[#062A27] rounded-[30px] h-[45px] mt-3 w-[90%] font-[600] text-[16px] cursor-pointer text-white Satoshi-bold">
            Continue
          </button>
          <p className="mt-3  text-[16px] mb-5">
            {" "}
            Back to?{" "}
            <Link
              to="/login"
              className="font-[600] text-[15px] text-black underline Satoshi-bold"
            >
              Log In
            </Link>
          </p>
        </div>
        <br></br>
      </div>
    </>
  );
}
