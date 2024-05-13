import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import img from "../images/Ellipse 2726 (1).png"
import img1 from "../images/Ellipse 2726.png"
import edit from "../images/Combined-Shape.png"
import eye from "../images/Eye.png"
import CreatenewProfile from './CreatenewProfile';
import { useNavigate } from 'react-router-dom';
export default function Medallions() {
    const [createprofile,setCreateprofile]=useState(false)
    const handlecreate =()=>{
        setCreateprofile(true)
    }
    const handleback =()=>{
        setCreateprofile(false)
    }
    const nevigate = useNavigate();
    const handleNavigate = () => {
        nevigate("/editprofile");
    };
    const handleNavigateview = () => {
        nevigate("/viewprofile");
    };
  return (
   <>
   {!createprofile &&
   <div className='flex justify-center items-center flex-col w-[100%] mt-2'>
   <button onClick={handlecreate}  className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[90%] font-[500] text-[16px] cursor-pointer text-white Satoshi-bold'><FaPlus className='mr-2'/>Create New Profile</button>
   <div className='flex justify-center items-center rounded-[10px] border border-[f0f0f0] shadow-md mt-5 flex-col w-[90%]'>
   <div className='flex  w-[90%] mt-5 '>
   <img className='w-[80px] h-[80px]'  src={img}/>
   <div className='flex flex-col ml-5 w-[80%]  '>
   <p className='font-bold text-[16px] Satoshi-bold'>Jay Rome</p>
  <div className='flex items-center '><p>Relationship:</p><p className='text-[#5F6161] text-[12px] ml-1 mt-1'>Brother</p></div>
  <div className='flex items-center'><p>Created in:</p><p className='text-[#5F6161] text-[12px] ml-1 mt-1'>27 Mar 2024</p></div>
  <p className='font-bold text-[16px] text-[#3F9A55]'>Active Medallion</p>
   </div>
   </div>
   <div className='w-[90%] flex items-center justify-between mb-5 mt-5'>
   <button onClick={handleNavigateview} className=' border border-[#062A27] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'><img className='w-[20px] h-[20px] mr-2' src={eye}/>View</button>
   <button onClick={handleNavigate} className='bg-[#062A27] text-[white] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'> <img className='w-[16px] mr-2' src={edit}/>Edit</button>
   </div>
   </div>
   <div className='flex justify-center items-center rounded-[10px] border border-[f0f0f0] shadow-md mt-5 flex-col w-[90%]'>
   <div className='flex  w-[90%] rounded-[50%] mt-5 '>
   <img className='w-[80px] h-[80px] rounded-[50%]'  src={img1}/>
   <div className='flex flex-col ml-5 w-[80%]  '>
   <p className='font-bold text-[16px] Satoshi-bold'>Jay Rome</p>
  <div className='flex items-center '><p>Relationship:</p><p className='text-[#5F6161] text-[12px] ml-1 mt-1'>Brother</p></div>
  <div className='flex items-center'><p>Created in:</p><p className='text-[#5F6161] text-[12px] ml-1 mt-1'>27 Mar 2024</p></div>
  <p className='font-bold text-[16px] text-red-500'>Unverified Medallion</p>
   </div>
   </div>
   <div className='w-[90%] flex items-center justify-between mb-5 mt-5'>
   <button onClick={handleNavigateview} className=' border border-[#062A27] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'><img className='w-[20px] h-[20px] mr-2' src={eye}/>View</button>
   <button onClick={handleNavigate} className='bg-[#062A27] text-[white] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'> <img className='w-[16px] mr-2' src={edit}/>Edit</button>
   </div>
   </div>
   </div>
   }
   {createprofile &&
    <CreatenewProfile
    handleback={handleback}
    />
   }
   </>
  )
}
