import React, { useEffect, useState } from "react";
import img from "../images/Group.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
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
import logo from "../images/logo.svg";
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
        userName: firstName + user.uid,
      }).then(() => {
        toast.success("User successfully created");
        setTimeout(function () {
          nevigate("/home");
        }, 1500);
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
  };

  const provider = new GoogleAuthProvider();

  const handleSignUpGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response, "this is the console of response");
        localStorage.setItem("userId", response?.user?.uid);
        // Query user data
        const deviceRef = query(
          ref(db, "/User"),
          orderByChild("id"),
          equalTo(response?.user?.uid)
        );

        onValue(deviceRef, (snapshot) => {
          const userData = snapshot.val();
          console.log(userData);

          if (!userData) {
            // User doesn't exist in database, create a new entry
            set(ref(db, "User/" + response?.user?.uid), {
              email: response?.user?.email,
              id: response?.user?.uid,
              firstName: response?.user?.displayName,
              profileImage: response?.user?.photoURL,
              state: "",
              fcmToken: "",
              city: "",
              muteNotificiation: "",
            });
          }
        });

        // Redirect to home page
        // toast.success("Login successful");
        setTimeout(() => {
          nevigate("/home");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0]">
        <div className="flex justify-center items-center flex-col mt-10">
          <div className="flex text-[#B08655]    items-center">
            <img className="h-[39px] w-[206px] object-cover" src={logo} />
          </div>
        </div>
        <div className="w-[90%] rounded-[20px] bg-white flex justify-center mt-10 items-center flex-col">
          <h1 className="font-[1000] text-[24px] text-black mt-5 Satoshi-bold ">
            Register
          </h1>
          <h1 className="font-[60] text-[16px] text-black mt-2 ">
            Create your Sentiments Account
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
          <div
            className="w-[90%] cursor-pointer flex bg-[#062A27] Satoshi-bold text-white justify-between items-center outline-none border border-[#C9C9C9]  h-[45px] rounded-[30px] pl-1 mt-3"
            onClick={() => handleSignUpGoogle()}
          >
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/color/96/google-logo.png"
              alt="google-logo"
            />
            <div>Sign Up with Google</div>
            <p className="w-[10%]"></p>
          </div>
          <p className="mt-3 text-[16px] mb-5">
            Already have an account?{" "}
            <Link
              to="/"
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
