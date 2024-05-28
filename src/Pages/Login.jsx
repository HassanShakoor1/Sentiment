import React, { useState } from 'react'
import img from "../images/Group.png"
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    const [showPassword, setShowPassword] = useState(true);
    const [Password, setPassword] = useState(true);
    const nevigate = useNavigate();
    const handleNavigate = () => {
        nevigate("/home");
    };
  return (
   <>
   <div className='flex  items-center justify-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0]'>
   <div className='flex justify-center items-center flex-col mt-10'>
   <div className='flex text-[#B08655]    items-center'>
   <h1 className='font-[1000] text-[29px] m-0 Satoshi-bold'>Eternal</h1>
   <img className='w-[13px] h-[15px] ml-1' src={img} />
   </div>
   <h1 className='font-[1000] text-[29px] m-[-9px] Satoshi-bold'>Sentiments</h1>
   </div>
   <div className='w-[90%] rounded-[20px] bg-white flex justify-center mt-10 items-center flex-col'>
   <h1 className='font-[1000] text-[24px] text-black mt-5 Satoshi-bold ' >Log In</h1>
   <h1 className='font-[60] text-[16px] text-black mt-2 ' >Log in to your Roam Tag account</h1>
   <input type='email' placeholder='Email Address' className='w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3'/>
   <div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] '>
   <input className='outline-none border-none w-[90%] p-3 h-[40px]' type={Password ? 'password' : 'text'} name='password' placeholder="Password"   />
   {Password ? (
     <FaRegEyeSlash className='text-[#062A27] text-[20px]' onClick={() => setPassword(false)} />
   ) : (
     <MdOutlineRemoveRedEye className='text-[#062A27] text-[20px]' onClick={() => setPassword(true)} />
   )}
 </div>
 <p className='w-[88%] flex justify-end mt-3'>
 <Link to="/forgot" className='text-[#142C73] font-[600] text-[16px] Satoshi-bold '>Forgot password?</Link>
 </p>
   <button onClick={handleNavigate} className='bg-[#062A27] rounded-[30px] h-[45px] mt-3 w-[90%] font-[600] text-[16px] cursor-pointer text-white Satoshi-bold'>Log In</button>
   <p className='w-[90%] cursor-pointer flex bg-[#062A27] Satoshi-bold text-white justify-between items-center outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[30px] pl-1'>
   <img width="35" height="35" src="https://img.icons8.com/color/96/google-logo.png" alt="google-logo"/>
   <div>Login with google</div>
   <p className='w-[10%]'></p>
   </p>
   <p className='mt-3  text-[16px] mb-5'>Don’t have an account?<Link to="/" className='font-[600] text-[15px] ml-1 text-black underline Satoshi-bold'>Register here</Link></p>
   </div>
  
   <br></br>
   </div>
   </>

  )
}
