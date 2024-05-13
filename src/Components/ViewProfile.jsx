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
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import ViewtimeLine from './ViewtimeLine'
import ViewBio from './ViewBio'
import cross from "../images/cross.png"
import ViewMedia from './ViewMedia'
import ViewTribute from './ViewTribute'
import ViewDetails from './ViewDetails'
import Share from './Share'
import { Box, Modal } from '@mui/material'

export default function ViewProfile() {
    let [slide,setSlide]=useState()
    
    let handleslide=()=>{
        setSlide(true)
    }
    let handleslideclose=()=>{
        setSlide(false)
    }
    let [filled, setFilled] = useState(false);
  const [timeline,setfavorites]=useState(true)
    const [bio,setpost]=useState(false)
    const [media,setMedallions]=useState(false)
    const [tributes,setTributes]=useState(false)
    const [destails,setDetails]=useState(false)

    const handlefvrt =()=>{
        setfavorites(true)
        setpost(false)
        setMedallions(false)
        setTributes(false)
        setDetails(false)
    }
    const handlepost =()=>{
        setfavorites(false)
        setpost(true)
        setMedallions(false)
        setTributes(false)
        setDetails(false)
    }
    const handleMedallions =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(true)
        setTributes(false)
        setDetails(false)
    }
    const handletributes =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(false)
        setTributes(true)
        setDetails(false)
    }
  
    const handledetails =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(false)
        setTributes(false)
  setDetails(true)
    }
  

    const handleClick = () => {
        console.log("yakiiii")
      setFilled(!filled);
    };
    console.log(filled)
    let [isModalOpen,setisModalOpen] =useState(false)
    let handleopenshare =()=>{
      setisModalOpen(true)
   }
   let handleCloseshare =()=>{
      setisModalOpen(false)
   }
  return (
  <>
  <div className='flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative'>
 {slide && <div className='h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 '>  </div>}
  <div className='flex justify-between items-center w-[90%] mt-5'>
  <div className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
  <img className='w-[24px] ' src={menu}/>
  </div>
  <p className='font-bold  text-[22px] text-[#062A27] Satoshi-bold'>Eternal</p>
  <div className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
  <img className='w-[24px] ' src={Notification}/>
  </div>
  </div>
  <div className='flex  items-center flex-col w-[90%] rounded-[10px] mt-5  bg-white'>
  <div className='w-[100%] flex justify-center items-center relative '>
  <img className='rounded-[10px] w-[100%] h-[194px] ' src={cover}/>
  <div className=' flex justify-center items-center  w-[100%]  absolute bottom-[-60px] '>
  <div className=' flex justify-center items-center  w-[114px] h-[114px]  realtive '>
  <img className='w-[114px] h-[114px] border-4 border-white object-cover rounded-[50%]' src={img}/>
  </div>
  </div>
 
  </div>
  <div className='flex justify-end w-[95%] mt-3 z-30'>
  <div  className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]'>
  {filled ? <GoHeartFill className='text-[#062A27] text-[20px]' onClick={()=>handleClick()}/> : <GoHeart className='text-[#062A27] text-[20px]' onClick={()=>handleClick()}/>}
</div>
  <div onClick={handleopenshare} className='border ml-3 flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]'>
  <RiShareForwardLine className='text-[#062A27] text-[20px]'/>
  </div>
  </div>
  <p className='text-[#5F6161] text-[13px] mt-[25px]'>In loving memory of</p>
  <h1 className='text-[16px] font-bold Satoshi-bold mt-1 text-[#062A27]'>Mis Alza</h1>
  <h1 className='text-[14px] font-bold  mt-1 text-[#062A27]'>Jan 01, 1950 - Nov 05, 2023</h1>
  <div className='w-[100%] rounded-[20px]  bg-white flex  mt-4 items-center flex-col'>
  <div className='flex justify-evenly items-center w-[100%] border-b overflow-x-scroll'>
  <p className='p-3 whitespace-nowrap cursor-pointer text-[#5F6161] ' onClick={handlefvrt} style={timeline ? { borderBottom: "2px solid black",color:"#062A27" } : {}} >Timeline</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handlepost} style={bio ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Bio</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handleMedallions} style={media ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Media</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handletributes} style={tributes ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Tributes</p>
  <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handledetails} style={destails ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Details</p>
  </div>
 {timeline &&
<ViewtimeLine/>
 }
 {bio &&
    <ViewBio/>
     }
     {media &&
        <ViewMedia
        setSlide={setSlide}
        slide={slide}
        handleslideclose={handleslideclose}
        handleslide={handleslide}
        />

         }
         {tributes &&
          <ViewTribute/>
           }
           {destails &&
            <ViewDetails/>
             }
 <br></br>
  </div>
  <br></br>
  </div>
  <br></br>

  </div>
  <Modal
open={isModalOpen}
onClose={handleCloseshare}
aria-labelledby="image-modal"
aria-describedby="image-modal-description"
>
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'white',
    borderRadius: '10px',
    background: '#FFF',
    outline: 'none',
    boxShadow: 24,
    maxHeight: "600px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
<div className='flex justify-end w-[90%] mt-3'>
<div onClick={handleCloseshare} className='flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]'>
<img className='w-[10px]' src={cross}/>
</div>
</div>
  <div className="flex justify-center items-center mt-2 w-[100%]">
    <Share />
    
  </div>
  <br></br>
</Box>
</Modal>
  </>
  )
}
