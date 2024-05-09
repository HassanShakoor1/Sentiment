import React, { useRef, useState } from 'react'
import media from "../images/Video playlist.png"
import { FaPlus } from 'react-icons/fa6'
import { Modal, Box, IconButton, colors } from '@mui/material';
import back from "../images/Frame 1171277120.png"
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import cross from "../images/cross.png"
export default function Media() {
    let [event,setEvent]= useState(false)
    let handleclose =()=>{
        setEvent(false)
    }
    let handleEventModal =()=>{
        setEvent(true)
    }
    const [privacy, setPrivacy] = useState('Image');

    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
  
    console.log(privacy)
    const fileInputRef = useRef(null);

    const handleLuPlusCircleClick = () => {
        fileInputRef.current.click();
    };
  return (
<>
<div className='flex justify-center items-center flex-col w-[100%] '>
<button onClick={handleEventModal}  className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[90%] font-[500] text-[16px] cursor-pointer text-white'><FaPlus className='mr-2'/>Add new file</button>
<div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
<img className='w-[70px]' src={media}/>
<h1 className='font-bold text-[16px] mt-3'>No media found</h1>
<p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No media has been added yet in Alex Smith’s collection</p>
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
    width: 350,
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
 <img onClick={handleclose}  className='w-[25px] h-[25px]' src={back}/>
 <h1 className='text-[#040A1B] text-[16px] font-bold'>New Post</h1>
 <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
<p className='w-[90%] h-[1px] mt-5 bg-[#DFE1E1]'></p>
<div className='flex justify-start flex-col w-[90%]'>
<p className='text-[15px]  mt-1'>Type of content</p> 
<div className='flex w-[100%] mt-3 justify-between'>
<FormControl className='w-[100%]' component="fieldset">
<RadioGroup
  row
  aria-label="privacy"
  name="privacy"
  value={privacy}
  onChange={handlePrivacyChange}
>
  <FormControlLabel
    value="Image"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Image"
  />
  <FormControlLabel
    value="Video"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Video"
  />
  <FormControlLabel
    value="Voice"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Voice note"
  />
</RadioGroup>
</FormControl>
</div>
{privacy === 'Image' && (
    <>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Images:</label>
    <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[80px] rounded-[5px] '>Choose Image</button>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Title:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Descriptions:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <button className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'>Upload</button>
  </>
  )}
  {privacy === 'Video' && (
    <>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Title:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Youtube URL:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Description:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <button className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'>Upload</button>
  </>
  )}
  {privacy === 'Voice' && (
    <>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Title:</label>
    <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
    </div>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Voice note:</label>
    <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[60px] rounded-[5px] '>Choose File</button>
  </div>
 
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Description:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <button className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'>Upload</button>
  </>
  )}
</div>
</div>

 <br></br>
</Box>
</Modal>
</>
  )
}
