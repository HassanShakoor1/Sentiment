import React, { useState } from 'react'
import img from "../images/Group.png"
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom'
export default function Signup() {
    const [showPassword, setShowPassword] = useState(true);
    const [Password, setPassword] = useState(true);
  return (
   <>
   <div className='flex  items-center justify-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0]'>
   <div className='flex justify-center items-center flex-col mt-10'>
   <div className='flex text-[#B08655]    items-center'>
   <h1 className='font-[1000] text-[29px] m-0 Satoshi-bold '>Eternal</h1>
   <img className='w-[13px] h-[15px] ml-1' src={img} />
   </div>
   <h1 className='font-[1000] text-[29px] m-[-9px] Satoshi-bold'>Sentiments</h1>
   </div>
   <div className='w-[90%] rounded-[20px] bg-white flex justify-center mt-10 items-center flex-col'>
   <h1 className='font-[1000] text-[24px] text-black mt-5 Satoshi-bold ' >Register</h1>
   <h1 className='font-[60] text-[16px] text-black mt-2 ' >Create your Eternal Account</h1>
   <input type='text' placeholder='First Name' className='w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3'/>
   <input type='text' placeholder='Last Name' className='w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3'/>
   <input type='email' placeholder='Email Address' className='w-[90%] outline-none border border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] pl-3'/>
   <div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] '>
   <input className='outline-none border-none w-[90%] p-3 h-[40px]' type={Password ? 'password' : 'text'} name='password' placeholder="Password"   />
   {Password ? (
     <FaRegEyeSlash className='text-[#062A27] text-[20px]' onClick={() => setPassword(false)} />
   ) : (
     <MdOutlineRemoveRedEye className='text-[#062A27] text-[20px]' onClick={() => setPassword(true)} />
   )}
 </div>
   <div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] '>
   <input className='outline-none border-none w-[90%] p-3 h-[40px]' type={showPassword ? 'password' : 'text'} name='password' placeholder="Confirm Password"   />
   {showPassword ? (
     <FaRegEyeSlash className='text-[#062A27] text-[20px]' onClick={() => setShowPassword(false)} />
   ) : (
     <MdOutlineRemoveRedEye className='text-[#062A27] text-[20px]' onClick={() => setShowPassword(true)} />
   )}
 </div>
   <button className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white Satoshi-bold'>Register</button>
   <p className='mt-3  text-[16px] mb-5'>Already have an account? <Link to="/login" className='font-[600] text-[15px] text-black underline Satoshi-bold'>Log In</Link></p>
   </div>
   <br></br>
   </div>
   </>

  )
}
