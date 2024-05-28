import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import img5 from "../images/imgg (4).jpg"
import { GoDotFill } from 'react-icons/go';
import { FiMoreVertical } from 'react-icons/fi';
import editb from "../images/editb.png"
import delet from "../images/Delete Bin 4.png"
import eye from "../images/Eye (1).png"
import img3 from "../images/imgg (2).jpg"
import { FaPlus } from 'react-icons/fa6';
import cross from "../images/cross.png"
import back from "../images/Frame 1171277120.png"
import { Box, Modal } from '@mui/material';
export default function Posts() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const ourcoment = [
        {
          id:"1",
          imageName: img5,
          name: 'Mis Alza janzein',
          date: 'Now',
          comment:'He was my best friend ever. He was very loyal and a true friend. Rest In Peace ALEX',
          relation:"My Best Friend"
        },
        {
            id:"1",
            imageName: img3,
            name: 'Dr Zanaish',
            date: 'Now',
            comment:'He was my best friend ever. He was very loyal and a true friend. Rest In Peace ALEX',
            relation:"My Best Friend"
          },
      ];

      let [event,setEvent]= useState(false)
 
    let handleclose =()=>{
        setEvent(false)
    }
    let handleEventModal =()=>{
        setEvent(true)
    }
  return (
   <>
   <div className='w-[90%] justify-start items-center flex-col'>
   <button  onClick={handleEventModal}  className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[500] text-[16px] cursor-pointer text-white Satoshi-bold'><FaPlus className='mr-2'/>Add New Posts</button>
   <p className='text-[15px] text-[#062A27] Satoshi-bold mt-3'>MY POSTS</p>
   <div className='flex  items-center flex-col sm:h-[180px] h-[350px] overflow-y-scroll w-[100%]  '>
   {ourcoment.map((item, index) => (
     <div  key={index} className='w-[100%] flex flex-col items-center mt-5'>
     <div key={index} className='flex justify-between items-center w-[100%]'>
       <div className='flex items-center'>
         <img className='w-[30px] h-[30px] object-cover rounded-[50%]' src={item.imageName} alt={item.name} />
         <p className='text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]'>{item.name}</p>
         <GoDotFill  className='text-[#5F6161] ml-2'  />
         <p className='text-[#5F6161] ml-2'>{item.date}</p>
       </div>
       <FiMoreVertical onClick={handleClick} className='text-[#5F6161] text-[20px] font-bold' />
     </div>
   
     <div className='w-[100%] flex items-center mb-2'>
     <p className='ml-[50px]  font-bold Satoshi-bold text-[14px] text-[#062A27] '>{item.relation}</p>
     </div>
       
     <div className='w-[100%] flex items-center'>
     <p className='ml-[50px] text-[#5F6161] text-[14px] '>{item.comment}</p>
     </div>
     </div>
     
   ))}
 
 </div>
   </div>
   <Menu
id="fade-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
TransitionComponent={Fade}
anchorOrigin={{
  vertical: 'bottom', 
  horizontal: 'center',
}}
transformOrigin={{
  vertical: 'top',
  horizontal: 'right',
}}
getContentAnchorEl={null} // Prevents default anchor behavior
>
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[20px] h-[19px] mr-3' src={eye}/>View</MenuItem>
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[17px] mr-4' src={editb}/>Edit</MenuItem>
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[20px] mr-3' src={delet}/><p className='text-[red]'>Delete Post</p></MenuItem>

</Menu>
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
 <h1 className='text-[#040A1B] text-[16px] font-bold'>Change Password</h1>
 <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
</div>
<div className='flex w-[100%] justify-between items-center flex-col mt-5'>
<div className='flex w-[90%] justify-start'>
<label className='mb-[-10px] '>Post Title:</label>
</div>
<div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] '>
<input className='outline-none border-none w-[90%] p-3 h-[40px]' type="text" name='password' placeholder="Post Title"   />
</div>
<div className='flex w-[90%] justify-start'>
<label className='mb-[-10px] mt-5'>Post Description:</label>
</div>
<textarea className='w-[90%] outline-none border flex items-center border-[#C9C9C9] p-2 mt-5 min-h-[120px] rounded-[5px] ' type="text" name='password' placeholder="Post Description"   />
  <button className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>Upload Post</button>
</div>

 


 <br></br>
</Box>
</Modal>
   </>
  )
}
