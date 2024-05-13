import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import emtpy from "../images/empty (2) 1.png"
import back from "../images/Frame 1171277120.png"
import et from "../images/Et.png"
import education from "../images/Vector.png"
import family from "../images/user3.png"
import award from "../images/Medal.png"
import house from "../images/Dog house.png"
import flag from "../images/Vector-1.png"
import health from "../images/Heart.png"
import Challenge from "../images/Okex.png"
import travel from "../images/Map location.png"
import innvovation from "../images/mage_light-bulb.png"
import Religion from "../images/Vector-2.png"
import job from "../images/Work.png"
import cross from "../images/cross.png"
import erimg from "../images/Group 1171277121.png"
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, IconButton, colors, Radio } from '@mui/material';
export default function Timeline() {
    let [event,setEvent]= useState(false)
    let [custom,setCustom]= useState(false)
    let handleEventModal =()=>{
        setEvent(true)
    }
    let handleclose =()=>{
        setEvent(false)
    }
    let handlecustuom =()=>{
        setCustom(true)
    }
    let handlebackEvent =()=>{
        setCustom(false)
        setEvent(true)
    }
    const fileInputRef = useRef(null);

    const handleLuPlusCircleClick = () => {
        fileInputRef.current.click();
    };
    const dataArray = [
        { id: 'education', image: education, title: 'Education' },
        { id: 'family', image: family, title: 'Family' },
        { id: 'milestones', image: flag, title: 'Milestones' },
        { id: 'housing', image: house, title: 'Housing' },
        { id: 'awards', image: award, title: 'Awards' },
        { id: 'Celebration', image: family, title: 'Celebration' },
        { id: 'Health', image: health, title: 'Health' },
        { id: 'Challenge', image: Challenge, title: 'Challenge' },
        { id: 'Travel', image: travel, title: 'Travel' },
        { id: 'innovation', image: innvovation, title: 'Innovation' },
        { id: 'Religion', image: Religion, title: 'Religion' },
        { id: 'Job', image: job, title: 'Job' },
      ];
  return (
    <>
    <div className='flex justify-center items-center flex-col w-[100%] '>
    <button onClick={handleEventModal}   className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[90%] font-[500] text-[16px] cursor-pointer text-white'><FaPlus className='mr-2'/>Add an important event</button>
    <div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
    <img className='w-[70px]' src={emtpy}/>
    <h1 className='font-bold text-[16px] mt-3'>No timeline events found</h1>
    <p className='text-[#5F6161] text-[13px] mt-3'>Alex Smith's timeline is empty at the moment.</p>
    </div>
    </div>
    <Modal
    open={event}
    onClose={handleclose}
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
    {!custom &&
     <div className='flex  items-center w-[100%] flex-col'>
     <div className='flex w-[90%] justify-between items-center mt-5'>
     <img onClick={handleclose} className='w-[25px] h-[25px]' src={back}/>
     <h1 className='text-[#040A1B] text-[16px] font-bold'>Select a Category</h1>
     <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
     </div>
     <div className='text-[14px] w-[70%] mt-3 text-center text-[#5F6161]'>Share a special moments or create your own memorial event</div>

     <p className='w-[90%] h-[1px] mt-5 bg-[#DFE1E1]'></p>
     <div className='flex justify-between mt-5 items-center w-[90%] flex-wrap'>
     <div onClick={handlecustuom} className='w-[30%] mb-4 h-[100px]  bg-[#F2F7F7] rounded-[5px] flex justify-evenly items-center flex-col '>
     <img className='w-[30px]' src={et}/>
     <h1 className='text-[15px] font-bold'>Custom</h1>
     </div>
     {dataArray.map((item, index) => (
        <div key={index} id={item.id} className='w-[30%] mb-4 h-[100px] bg-[#F2F7F7] rounded-[5px] flex justify-evenly items-center flex-col'>
          <img className='w-[30px]' src={item.image} alt={item.title} />
          <h1 className='text-[15px] font-bold'>{item.title}</h1>
        </div>
      ))}
     </div>
     </div>
    }
    {custom &&
        <div className='flex  items-center w-[100%] flex-col'>
        <div className='flex w-[90%] justify-between items-center mt-5'>
        <img onClick={handlebackEvent} className='w-[25px] h-[25px]' src={back}/>
        <h1 className='text-[#040A1B] text-[16px] font-bold'>Add an important event</h1>
        <div></div>
        </div>
        <img className='w-[50px] mt-5' src={erimg}/>
        <div className='flex justify-start flex-col w-[90%]'>
        <h1 className='text-[15px] font-bold mt-3'>Event details</h1>
        </div>
        <div className='flex justify-center items-center flex-col w-[100%]'>
        <div className='flex justify-start flex-col w-[90%] mt-3'>
        <label className='mb-1'>Title:</label>
        <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
        </div>
        <div className='flex justify-start flex-col w-[90%] mt-3'>
        <label className='mb-1'>Date:</label>
        <input type='date'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
        </div>
        <div className='flex justify-start flex-col mt-3 w-[90%]'>
        <label className='mb-1'>Event preview images:</label>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
        <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  h-[112px] rounded-[5px] '>Choose File</button>
      </div>
      <button  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>Add in Timeline</button>
        </div>
        </div>
    }
     <br></br>
    </Box>
  </Modal>
    </>
  )
}
