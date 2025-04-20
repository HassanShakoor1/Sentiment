import React, { useState } from "react";
import img from "../images/Group.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import logo from "../images/logo.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nevigate = useNavigate();
  const handleLogin = () => {
    if (email && Password) {
      signInWithEmailAndPassword(auth, email, Password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("userId", user?.uid);
          localStorage.setItem("User", JSON.stringify(user));
          toast.success("Successfully Login!");
          setTimeout(function () {
            nevigate("/home");
          }, 2000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(error.message);
          if (error.code === "auth/invalid-email") {
            toast.error("Invalid  Emial!");
          } else if (error.code === "auth/invalid-credential") {
            toast.error("Invalid password!");
          } else {
            toast.error(errorMessage);
          }
        });
    } else {
      toast.error("Email and password should not be empty!");
    }
  };

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
            Log In
          </h1>
          <h1 className="font-[60] text-[16px] text-black mt-2 ">
            Log in to your Sentiments account
          </h1>
          <input
            type="email"
            placeholder="Email Address"
            className="w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] ">
            <input
              className="outline-none border-none w-[90%] p-3 h-[40px]"
              type={showPassword ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
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
          <p className="w-[88%] flex justify-end mt-3">
            <Link
              to="/forgot"
              className="text-[#142C73] font-[600] text-[16px] Satoshi-bold "
            >
              Forgot password?
            </Link>
          </p>
          <button
            onClick={handleLogin}
            className="bg-[#062A27] rounded-[30px] h-[45px] mt-3 w-[90%] mb-4 font-[600] text-[16px] cursor-pointer text-white Satoshi-bold"
          >
            Log In
          </button>
          <p className="mt-3 text-[16px] mb-5">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="font-[600] text-[15px] text-black underline Satoshi-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <br></br>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  );
}
