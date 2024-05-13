import React, { useState } from 'react'
import menu from "../images/Hamburger menu.png"
import Notification from "../images/Notification.png"
import cover from "../images/image 75.png"
import edit from "../images/Editbl.png"
import img from "../images/miss.jpg"
import eye from "../images/Eyewh.png"
import { IoIosMore } from "react-icons/io";
import { FaPlus } from 'react-icons/fa6'
import Timeline from './Timeline'
import CreatenewProfile from './CreatenewProfile'
import Media from './Media'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Editprofile() {
  const [timeline,setfavorites]=useState(true)
    const [bio,setpost]=useState(false)
    const [media,setMedallions]=useState(false)


    const handlefvrt =()=>{
        setfavorites(true)
        setpost(false)
        setMedallions(false)
       
    }
    const handlepost =()=>{
        setfavorites(false)
        setpost(true)
        setMedallions(false)
   
    }
    const handleMedallions =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(true)
  
    }
    const nevigate = useNavigate();
    const handleNavigateview = () => {
        nevigate("/viewprofile");
    };
    let [slide,setSlide]=useState()
    let handleslide=()=>{
      setSlide(!slide);
  }
  let handleslideclose=()=>{
      setSlide(false)
  }
  return (
  <>
  <div className='flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative'>
  {slide && <div className='h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 '>  </div>}
  {slide &&
      <div className='flex  justify-start w-[100%] flex-col  ' >
  <Sidebar
  handleslideclose={handleslideclose}
  /></div>}
  <div className='flex justify-between items-center w-[90%] mt-5'>
  <div onClick={handleslide} className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
  <img className='w-[24px] ' src={menu}/>
  </div>
  <p className='font-bold text-[22px] text-[#062A27]'>Eternal</p>
  <div className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
  <img className='w-[24px] ' src={Notification}/>
  </div>
  </div>
  <div className='flex  items-center flex-col w-[90%] rounded-[10px] mt-5  bg-white'>
  <div className='w-[100%] flex justify-center items-center relative '>
  <img className='rounded-[10px] w-[100%] h-[194px] ' src={cover}/>
  <div className=' flex justify-center items-center bg-white w-[25px] h-[25px] absolute top-2 right-2 rounded-[50%]'>
  <img width={13} src={edit}/>
  </div>
  <div className=' flex justify-center items-center  w-[100%]  absolute bottom-[-60px] '>
  <div className=' flex justify-center items-center  w-[114px] h-[114px]  realtive '>
  <img className='w-[114px] h-[114px] border-4 border-white object-cover rounded-[50%]' src={img}/>
  <div className=' flex justify-center items-center bg-white w-[25px] h-[25px] absolute top-1 ml-[20%] rounded-[50%]'>
  <img width={13} src={edit}/>
  </div>
  </div>
  </div>
 
  </div>
  <p className='text-[#5F6161] text-[13px] mt-[70px]'>In loving memory of</p>
  <h1 className='text-[16px] font-bold mt-1 text-[#062A27]'>Mis Alza</h1>
  <h1 className='text-[14px] font-bold  mt-1 text-[#062A27]'>Jan 01, 1950 - Nov 05, 2023</h1>
  <div className='w-[100%] flex justify-center items-center mt-3'>
  <button onClick={handleNavigateview}   className='bg-[#062A27] text-[white] rounded-[30px] w-[150px] h-[40px] flex justify-center items-center'> <img className='w-[20px] mr-2' src={eye}/>Public View</button>
  <div className='border flex justify-center items-center border-[#062A27] ml-5 bg-white w-[40px] h-[40px] rounded-[50%]'>
  <IoIosMore className='w-[24px] text-[#062A27] ' />
  </div>
  </div>
  <div className='w-[100%] rounded-[20px]  bg-white flex  mt-8 items-center flex-col'>
  <div className='flex justify-evenly items-center w-[100%] border-b overflow-x-scroll'>
  <p className='p-3 whitespace-nowrap cursor-pointer text-[#5F6161] ' onClick={handlefvrt} style={timeline ? { borderBottom: "2px solid black",color:"#062A27" } : {}} >Timeline</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handlepost} style={bio ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Bio</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handleMedallions} style={media ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Media</p>
  </div>
 {timeline &&
<Timeline/>
 }
 {bio &&
  <CreatenewProfile
  bio={bio}
  />
 }
 {media &&
  <Media
  bio={bio}
  />
 }
 <br></br>
  </div>
  <br></br>
  </div>
  <br></br>
  </div>
  </>
  )
}
