import React, { useState } from 'react'
import media from "../images/Video playlist.png"
import img1 from "../images/miss.jpg"
import chat from "../images/Chat.png"
import img2 from "../images/imgg (1).jpg"
import img3 from "../images/imgg (2).jpg"
import img4 from "../images/imgg (3).jpg"
import img5 from "../images/imgg (4).jpg"
import smile from "../images/Smiling.png"
import send from "../images/Send message.png"
import comnt from "../images/comnt.png"
import { Slide } from '@mui/material'
import { IoIosClose } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FiMoreVertical } from "react-icons/fi";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import editb from "../images/editb.png"
import delet from "../images/Delete Bin 4.png"

export default function ViewMedia({handleslide,handleslideclose,slide,setSlide}) {
   

    const images = [
        { id: '1', image: img1 },
        { id: '2', image: img2 },
        { id: '3', image: img3 },
        { id: '3', image: img4 },
        { id: '3', image: img5 },

    ]
    const publicomnt = [
      {
        id:"10",
        imageName: img2,
        name: 'Mis Alza',
        date: 'Now',
        comment:'He was my best friend ever. He was very loyal and a true friend. Rest In Peace ALEX'
      },
    ]
    const ourcoment = [
      {
        id:"1",
        imageName: img5,
        name: 'Mis Alza',
        date: 'Now',
        comment:'He was my best friend ever. He was very loyal and a true friend. Rest In Peace ALEX'
      },
      // Add more objects as needed
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
    <>
    {images.length === 0 ? (
    <div className='flex justify-center items-center flex-col w-[100%] mt-5 '>
<div className='flex justify-center border border-[#DFE1E1] rounded-[20px]  items-center flex-col h-[250px] w-[90%]'>
<img className='w-[70px]' src={media}/>
<h1 className='font-bold Satoshi-bold text-[16px] mt-3'>No media found</h1>
<p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No media has been added yet in Alex Smith’s collection</p>
</div>
</div>):(
<div className='flex justify-between items-center flex-wrap w-[90%] mt-3  '>
{images.map((img, index) => (
  <div key={index} id={img.id} className='w-[47%] mt-5 h-[180px] relative rounded-[8px]'>
    <img className='w-[100%] h-[180px]  object-cover rounded-[8px]' src={img.image} alt={`Image ${index}`} />
    <div onClick={handleslide} className='flex justify-center items-center w-[30px] h-[30px] bottom-2 right-2 rounded-[50%] border bg-[black] bg-opacity-50 absolute border-[white]'>
      <img className='w-[18px]' src={chat} alt="Chat Icon" />
    </div>
  </div>
))}
</div>
)}
<Slide
in={slide}
direction="up"
timeout={{ appear: 500, enter: 500, exit: 500 }}
>

<div className="slide_main_div relative">
  <div className="title_and_icon_main">
 
    <div className="close absolute top-[-35px] bg-white flex justify-center items-center right-2 h-[30px] w-[30px] rounded-[50%]" onClick={handleslideclose}>
    <IoIosClose style={{fontSize:"35px"}}/>
    </div>
  </div>
<div className='flex justify-center items-center flex-col w-[100%]'>
<div className='flex justify-start flex-col w-[90%]'>
<div className='flex justify-start items-center w-[100%] mt-5'>
<img className='w-[50px] h-[50px] border-2 border-[#B08655] object-cover rounded-[50%]' src={img5}/>
<p className='text-[16px] font-bold Satoshi-bold ml-3 border-b-2 border-[#B08655] text-[#B08655] '>Mis Alza</p>
</div>
<p className='text-[16px] font-bold Satoshi-bold mt-5 text-[#062A27]  '>Alza and his mom</p>
<p className='text-[15px] mt-2 text-[#5F6161]'>Alex and his mother Barbara. He loved his mom very much and made sure to visit her weekly and talk to her basically daily</p>
</div>
<p className='text-[#062A27] mt-5 w-[100%] p-2 flex justify-center items-center border-t border-b border-[#D4E2E2]'>COMMENTS</p>
{ourcoment.length==0 || ourcoment.publicomnt==0 &&
<div className='w-[100%] flex justify-center items-center flex-col mt-5 '>
<img className='w-[60px]' src={comnt} />
<p className='text-[#062A27] text-[16px] font-bold Satoshi-bold mt-1'>This post has no comments yet</p>
<p className='w-[50%] mt-1 text-[14px] text-[#5F6161] text-center'>Share your opinion and leave a comment below</p>
</div>}

<div className='flex  items-center flex-col sm:h-[180px] h-[350px] overflow-y-scroll w-[90%] mt-5 '>
      {ourcoment.map((item, index) => (
        <div  key={index} className='w-[100%] flex flex-col items-center'>
        <div key={index} className='flex justify-between items-center w-[100%]'>
          <div className='flex items-center'>
            <img className='w-[40px] h-[40px] object-cover rounded-[50%]' src={item.imageName} alt={item.name} />
            <p className='text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]'>{item.name}</p>
            <GoDotFill  className='text-[#5F6161] ml-2'  />
            <p className='text-[#5F6161] ml-2'>{item.date}</p>
          </div>
          <FiMoreVertical onClick={handleClick} className='text-[#5F6161] text-[20px] font-bold' />
        </div>
      
        <div className='w-[100%] flex items-center'>
        <p className='ml-[50px] text-[#5F6161] text-[14px] '>{item.comment}</p>
        </div>
        </div>
        
      ))}
    
    </div>
    
</div>
    
<div className='flex justify-between w-[90%] h-[50px] absolute bg-[white] bottom-0 items-center'>
<img className='w-[30px]' src={smile}/>
<input type='text' placeholder='Add a comment for Mis Alza' className='w-[80%] text-[14px] outline-none border-none' />
<img className='w-[30px]' src={send}/>
</div>
  </div>

</Slide>
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
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[17px] mr-3' src={editb}/>Edit</MenuItem>
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[20px] mr-3' src={delet}/><p className='text-[red]'>Delete Comment</p></MenuItem>

</Menu>

    </>
  )
}
