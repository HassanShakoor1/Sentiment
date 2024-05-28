import React, { useState } from 'react'
import menu from "../images/Hamburger menu.png"
import Notification from "../images/Notification.png"
import cover from "../images/image 75.png"
import Fade from '@mui/material/Fade';
import edit from "../images/Editbl.png"
import delet from "../images/Delete Bin 4.png"
import img from "../images/miss.jpg"
import eye from "../images/Eyewh.png"
import { IoIosMore } from "react-icons/io";
import { FaPlus } from 'react-icons/fa6'
import Timeline from './Timeline'
import CreatenewProfile from './CreatenewProfile'
import Media from './Media'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaDeleteLeft } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import cross from "../images/cross.png"
import back from "../images/Frame 1171277120.png"
import Box from '@mui/material/Box';
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { IoChevronBack } from "react-icons/io5";

export default function Editprofile() {
    const [privacy, setPrivacy] = useState('public');

    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
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
  const [deleteopen, setdelete] = useState(false);

  const handleOpendelete = () => {
    setdelete(true);
    setAnchorEl(null);
  };

  const handleClosedelete = () => {
    setdelete(false);
  };

  const handleDeleteProfile = () => {
    // Add your delete profile logic here
    // For now, let's just log a message
    console.log("Profile deleted!");
    setdelete(false);
  
  };
  const [status, setstatus] = useState(false);

  const handlestatus = () => {
    setstatus(true);
  
  };

  const handleClosestatus = () => {
    setstatus(false);
  };
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
  <button onClick={handleNavigateview}   className='bg-[#062A27] text-[white] rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px] mr-2'> <img className='w-[18px] mr-2' src={eye}/>Public View</button>
  <button onClick={handlestatus}   className='border-[#062A27] border text-[#062A27]  rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px]'>Status Info</button>
  <div onClick={handleClick} className='border flex justify-center items-center border-[#062A27] ml-2 bg-white w-[35px] h-[35px] rounded-[50%]'>
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
  getContentAnchorEl={null} // 
  >
  
  <MenuItem onClick={handleOpendelete} className='flex items-center  '><p className='text-[red] text-[13px] flex items-center'>Delete Profile<FaDeleteLeft className='ml-1 w-[25px]'/></p></MenuItem>
  </Menu>
  <Modal
  open={deleteopen}
  onClose={handleClosedelete}
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
      fontFamily: "Satoshi",
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }}
  >
    <div className='flex items-center w-[100%] flex-col'>
   
      <div className='flex justify-center flex-col items-center w-[90%]'>
<p className='text-[#062A27] text-center font-bold w-[80%] mt-5'>Are you sure you want to delete this profile?</p>
<div className='flex justify-between items-center w-[100%]'>
        <button onClick={handleDeleteProfile} className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[48%] font-[500] text-[16px] cursor-pointer text-white'>
          No
        </button>
        <button onClick={handleDeleteProfile} className='bg-[#b62335] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[48%] font-[500] text-[16px] cursor-pointer text-white'>
        Yes
      </button>
        </div>
      </div>
    </div>
    <br/>
  </Box>
</Modal>
<Modal
open={status}
onClose={handleClosestatus}
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
    fontFamily: "Satoshi",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
  <div className='flex items-center w-[100%] flex-col'>
  <div className='flex w-[90%] justify-between items-center  mt-5'>
  <div className='flex items-center'>
  <img onClick={handleClosestatus}  className='w-[25px] h-[25px]' src={back}/>
  <p className='text-[16px] ml-3 text-[#B08655] font-bold Satoshi-bold'>Back to profile</p>
  </div>
  <div onClick={handleClosestatus} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
  <img className='w-[10px]' src={cross}/>
  </div>
  </div>
    <div className='flex justify-center flex-col items-center w-[90%]'>
    <div>
    <div className='text-[16px] font-bold Satoshi-bold mt-5'>Profile type</div>
    <div className='flex flex-col'>
    <FormControl className='w-[100%] flex flex-col' component="fieldset">
<RadioGroup
  row
  aria-label="privacy"
  name="privacy"
  value={privacy}
  onChange={handlePrivacyChange}
>
  <FormControlLabel
    value="Unverified"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Unverified"
  />
  <h2 className='text-[13px] mt-2 mb-2 text-[#5F6161]'>Unverified profiles are FREE and fully functional profiles that only the creator of the profile can see. You can convert your unverified profile to a limited profile or a fully active and public profile.</h2>
  <FormControlLabel
    value="Limited"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Limited"
  />
  <h2 className='text-[13px] mt-2 mb-2 text-[#5F6161]'>Limited profiles are FREE and accessible to the public and connected to a Turning Hearts medalion, but with limited accessibility. Visitors can only view the Memorial page but not the Tribute page to contribute their own post and interact with others.</h2>
  <FormControlLabel
    value="Active"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Active"
  />
  <h2 className='text-[13px] mt-2 mb-2 text-[#5F6161]'>Active profiles are paid profiles that are connected to a Turning Hearts medalion.</h2>
</RadioGroup>
</FormControl>
<button    className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[500] text-[15px] cursor-pointer text-white Satoshi-bold'>Change Profile Type</button>
     </div>
  </div>
    </div>
  </div>
  <br/>
</Box>
</Modal>
  </>
  )
}
