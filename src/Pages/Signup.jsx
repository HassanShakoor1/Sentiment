import React, { useEffect, useState } from "react";
import img from "../images/Group.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, firebaseConfig } from "../Firebase/firebaseConfig";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
export default function Signup() {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(true);
  const [Password, setPassword] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nevigate = useNavigate();

  // useEffect(() => {

  // }, []);

  const handleSignup = async () => {
    if (!firstName || !lastName) {
      toast.error("Please provide your full name");
      return;
    }

    if (!email) {
      toast.error("Please provide your email address");
      return;
    }

    if (!password) {
      toast.error("Please provide a password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords didn't not match");
      return;
    }

    if (email && password && id) {
      const starCountRef = query(
        ref(db, "/Tags"),
        orderByChild("tagId"),
        equalTo(id)
      );

      onValue(starCountRef, async (snapshot) => {
        const Tagdata = await snapshot.val();
        if (Tagdata && typeof Tagdata === "object") {
          const theTag = Object.values(Tagdata)?.[0];
          if (theTag?.status === true && theTag?.userName) {
            // toast.error("This tag is already associated to some other profile");
            return;
          }

          // Validate email format using regular expression
          const emailRegEx =
            /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?$/;

          if (!emailRegEx.test(email)) {
            toast.error("Please enter a valid email");
            return; // Exit the function if email format is invalid
          }
          const passwordRegEx = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
          if (!passwordRegEx.test(password)) {
            toast.error(
              "Password must be 8+ chars, include a special char and a capital letter"
            );
            return;
          }
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;

            localStorage.removeItem("userId");
            localStorage.setItem("userId", user?.uid);

            await update(ref(db, `User/${user?.uid}`), {
              firstName: firstName,
              lastName: lastName,
              id: user.uid,
              email: email,
              fcmToken: "",
              profileImage: "",
              state: "",
              city: "",
              muteNotificiation: "",
              tagUid: id,
              userName: firstName + user.uid,
            }).then(() => {
              update(ref(db, `Tags/${theTag?.id}`), {
                status: true,
                userName: firstName + user.uid,
                userid: user.uid,
              }).then(() => {
                toast.success("User successfully created");
                setTimeout(function () {
                  nevigate("/home");
                }, 1500);
              });
            });
          } catch (error) {
            const errorCode = error.code;
            console.error(error.message);
            if (errorCode === "auth/invalid-email") {
              toast.error("Please enter a valid email");
            } else if (errorCode === "auth/email-already-in-use") {
              toast.error("Email already exists");
            } else if (errorCode === "auth/weak-password") {
              toast.error("Password must be at least 8 characters");
            }
          }
        } else {
          toast.error("Tag not found");
        }
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0]">
        <div className="flex justify-center items-center flex-col mt-10">
          <div className="flex text-[#B08655] items-center">
            <h1 className="font-[1000] text-[29px] m-0 Satoshi-bold ">
              Eternal
            </h1>
            <img className="w-[13px] h-[15px] ml-1" src={img} alt="Logo" />
          </div>
          <h1 className="font-[1000] text-[29px] m-[-9px] Satoshi-bold">
            Sentiments
          </h1>
        </div>
        <div className="w-[90%] rounded-[20px] bg-white flex justify-center mt-10 items-center flex-col">
          <h1 className="font-[1000] text-[24px] text-black mt-5 Satoshi-bold ">
            Register
          </h1>
          <h1 className="font-[60] text-[16px] text-black mt-2 ">
            Create your Eternal Account
          </h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3"
          />
          <div className="w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] ">
            <input
              className="outline-none border-none w-[90%] p-3 h-[40px]"
              type={Password ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPasswordValue(e.target.value)}
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button
            className="bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white Satoshi-bold"
            onClick={handleSignup}
          >
            Register
          </button>
          <p className="mt-3 text-[16px] mb-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-[600] text-[15px] text-black underline Satoshi-bold"
            >
              Log In
            </Link>
          </p>
        </div>
        <br />
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
