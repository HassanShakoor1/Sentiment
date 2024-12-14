import React, { useState } from "react";
import img from "../images/Group.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import logo from "../images/logo.svg";
export default function Forgotpassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [Password, setPassword] = useState(true);
  const nevigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    try {
      if (!email) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const emailRegEx =
        /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!emailRegEx.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const deviceRef = query(
        ref(db, "/User"),
        orderByChild("email"),
        equalTo(email)
      );

      onValue(deviceRef, (snapshot) => {
        const userData = snapshot.val();
        console.log(userData);

        if (!userData) {
          toast.error("This email does not have an associated account.");
          return;
        }

        // Email exists, proceed with password reset
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success(
              "Password reset sent into your email. Check your email."
            );
            setEmail("");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error sending password reset email.");
          });
      });
    } catch (error) {
      console.error(error);
      toast.error("Error sending password reset email.");
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
          <h1 className="font-[1000] text-[24px] text-[#062A27] mt-5 Satoshi-bold ">
            Reset Password
          </h1>
          <h1 className="font-[60] text-[16px] text-black mt-2 ">
            Log in to your Sentiments Account
          </h1>
          <input
            type="email"
            placeholder="Email Address"
            className="w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleResetPassword}
            className="bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white Satoshi-bold"
          >
            Reset Password
          </button>
          <p className="mt-3  text-[16px] mb-5">
            {" "}
            Back to?{" "}
            <Link
              to="/"
              className="font-[600] text-[15px] text-black underline Satoshi-bold"
            >
              Log In
            </Link>
          </p>
        </div>
        <br></br>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000} // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide} // Optional transition effect
      />
    </>
  );
}
