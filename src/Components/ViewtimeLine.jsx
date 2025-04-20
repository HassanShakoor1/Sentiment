import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import emtpy from "../images/empty (2) 1.png"
import back from "../images/Frame 1171277120.png"
import { FadeLoader } from 'react-spinners';
import { Box, Modal } from '@mui/material';
export default function ViewtimeLine({loading,events}) {
  let [timelineImageView,setTimelineImageView]=useState("")
  let [timelineData,setTimelineData]=useState("")
  let handleSingleTimelineClick=(item)=>{
    setTimelineData(item)
    setTimelineImageView(!timelineImageView)
  }
  let handletimelineImageview=()=>{
    setTimelineImageView(!timelineImageView)
  }
  const formatDateNew = (dateString) => {
    const date = new Date(dateString); // Parse input date
    return date.toLocaleDateString("en-US", {
      month: "short",  // Short month name like 'Dec'
      day: "2-digit", // Two-digit day number
      year: "numeric" // Full year number
    });
  };
   
  return (
    <>
    {loading ? (
      
      <div className=" justify-center mt-10 items-center ">    
    <FadeLoader color="#062A27" />
      </div>
    ) : (
    <div className='flex justify-center items-center flex-col w-[100%] '>
    {events.length === 0 ? (
      <div className='flex justify-center items-center flex-col w-[100%] mt-5 '>
      <div className='flex justify-center border border-[#DFE1E1] rounded-[20px]  items-center flex-col h-[250px] w-[90%]'>
      <img className='w-[70px]' src={emtpy}/>
      <h1 className='font-bold Satoshi-bold text-[16px] text-[#062A27]  mt-3'>No timeline events found</h1>
      <p className='text-[#5F6161] text-[13px] mt-3'>Alex Smith's timeline is empty at the moment.</p>
      </div>  </div>):(
  <div className='flex justify-start flex-col w-[90%] mt-5'>
  <div className='text-[16px] text-[#062A27] font-bold Satoshi-bold '>SIGNIFICANT EVENTS</div>
  <div>
  {events
    ?.slice() // Creates a shallow copy to avoid mutating the original array
    .sort((a, b) => new Date(a.timelineDate) - new Date(b.timelineDate)) // Sort by date
    .map((item, index) => (
      <div key={index} className="flex justify-start w-[100%] mt-3 flex-col">
        <div className="w-[100%] flex justify-between">
          <div className="w-[100px] h-[30px] font-bold Satoshi-bold flex justify-center text-[12px] whitespace-nowrap items-center rounded-[5px] bg-[#D3E8E6]">
            {formatDateNew(item?.timelineDate)}
          </div>
        </div>
        <div
          onClick={() => handleSingleTimelineClick(item)}
          className="cursor-pointer flex justify-start mt-4 h-[65px] items-center border-l border-dashed border-[#5F6161]"
        >
          <img
            className="w-[53px] ml-3 h-[53px] rounded-[4px] object-cover"
            src={item?.timelineImage || "https://placehold.co/53"}
          />
          <p className="text-[#5F6161] ml-3 h-[60px] overflow-y-auto">
            {item?.timelineTitle}
          </p>
        </div>
      </div>
    ))}
  
  
  </div>
  </div>
  )}
    </div>
)}
    <Modal
open={timelineImageView}
onClose={handletimelineImageview}
aria-labelledby="add-link-modal-title"
aria-describedby="add-link-modal-description"
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
    maxHeight: "90vh",
    overflowY: "auto",
    fontFamily:"Satoshi",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
    <div className='flex  items-center w-[100%] flex-col'>
    <div className='flex w-[90%] justify-between items-center mt-5'>
    <img onClick={handletimelineImageview} className='w-[25px] h-[25px]' src={back}/>
    <h1 className='text-[#040A1B] text-[16px] font-bold'>Event Details</h1>
    <div></div>
    </div>
    <div className='w-[90%] flex justify-start flex-col'>
    <p className='font-bold text-[16px] mt-2'>Title:</p>
    </div>
    <p className='w-[70%] text-left'>{timelineData?.timelineTitle}</p>
   
<img className='w-[90%] mt-2 rounded-md' src={timelineData?.timelineImage}/>

    </div>
 <br></br>
</Box>
</Modal>
    </>
  )
}
