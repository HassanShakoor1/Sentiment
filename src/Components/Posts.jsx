import React from 'react'
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

      
  return (
   <>
   <div className='w-[90%] justify-start items-center flex-col'>
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
   </>
  )
}
