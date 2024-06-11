import React, { useEffect, useState } from 'react'
import img from "../images/Ellipse 2726 (1).png"
import img1 from "../images/Ellipse 2726.png"
import edit from "../images/Combined-Shape.png"
import profile1 from "../images/Group 661 (2).png"
import eye from "../images/Eye.png"
import { RiShareForwardLine } from "react-icons/ri";
import { GoHeartFill } from 'react-icons/go'
import { Modal, Box, IconButton, colors, Radio } from '@mui/material';
import emtpy from "../images/empty (2) 1.png"
import delet from "../images/Delete Bin 4.png"
import cross from "../images/cross.png"
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import Share from './Share'
import { equalTo, onValue, orderByChild, query, ref, update } from 'firebase/database'
import { db } from '../Firebase/firebaseConfig'
import { FadeLoader } from 'react-spinners'

export default function Myfavorites({toast}) {
    const nevigate = useNavigate();
    const handleNavigateview = (id) => {
        nevigate(`/viewprofile/${id}`);
    };
    let [modal,setModal]=useState(false)
    let [fvrtid,setFvrtid]=useState(false)

    let handleopen=(id)=>{
        setModal(true)
        setFvrtid(id)
    }
    let handleclose=()=>{
        setModal(false)
    }
    const data = [
       
        // Add more data objects as needed
      ];
      let [isModalOpen,setisModalOpen] =useState(false)
      let handleopenshare =()=>{
        setisModalOpen(true)
     }
     let handleCloseshare =()=>{
        setisModalOpen(false)
     }
     let [userprofile,setUserprofile]=useState("")
     let [loading,setloading]=useState(false)

     let currentUser =localStorage.getItem("userId")
     useEffect(() => {
       setloading(true)
       const starCountRef = query(
         ref(db, "/Profile"),
         orderByChild("userId"),
         equalTo(currentUser)
       );
      
       onValue(starCountRef, async (snapshot) => {
         const data = await snapshot.val();
         if (data) {
          setUserprofile(Object.values(data));
        } else {
          setUserprofile([]); 
        }
         setloading(false)
       });
     }, []); 
     const favoriteProfiles = Array.isArray(userprofile) ? userprofile.filter(profile => profile.favoriteProfile === true) : [];

     const updateFavoriteStatus = () => {
      const updates = {};
      updates[`/Profile/${fvrtid}/favoriteProfile`] = false;
      return update(ref(db), updates).then (()=>{
        handleclose();
        toast.success("Medallion successfuly removed!")
      }
    )};

  return (
   <>
   {loading ? (
      
    <div className=" justify-center mt-10 items-center ">    
  <FadeLoader color="#062A27" />
    </div>
  ) : (
    <>
   <div className='w-[90%] justify-start items-center flex-col'>
   <p className='text-[15px] text-[#062A27] Satoshi-bold mt-3'>MY FAVORITES</p>
   </div>
   {!favoriteProfiles?.length =="0" &&
   <div className='flex justify-center items-center rounded-[10px] border border-[#f0f0f0] shadow-md mt-5 flex-col w-[90%]'>
   {favoriteProfiles?.map((item, index) => (
    <div key={index} className='flex w-[90%] flex-col' >
     <div key={index} className='flex w-[100%]  rounded-[50%] mt-5'>
       <img className='w-[80px] h-[80px] rounded-[50%]' src={item.userProfile?item.userProfile:profile1}  />
       <div className='flex flex-col ml-3 w-[60%]'>
         <p className='font-bold text-[16px] Satoshi-bold'>{item?.firstName} {item?.lastName}</p>
         <div className='flex items-center'>
           <p>Relationship:</p>
           <p className='text-[#5F6161] text-[12px] ml-1 mt-1'>{item.relationship}</p>
         </div>
         <div className='flex items-center'>
           <p>Created in:</p>
           <p className='text-[#5F6161] text-[12px] ml-1 mt-1'>{item.createdDate}</p>
         </div>
    <p className={`font-bold text-[16px] flex items-center ${item.status === 'Active' ? 'text-[#3F9A55]' : 'text-red-500'}`}><p className='text-[black] font-[400] text-[15px] mr-2'>Profile type:</p> {item.status}</p>
       </div>
       <div onClick={()=> handleopen(item.id)} className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]'>
         <GoHeartFill className='text-[#062A27] text-[20px]' />
       </div>
     </div>
       <div className='w-[100%] flex items-center justify-between mb-5 mt-5'>
       <button onClick={()=> handleNavigateview(item?.id)} className='border border-[#062A27] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'>
         <img  className='w-[20px] h-[20px] mr-2' src={eye} alt="View" />View
       </button>
       <button onClick={handleopenshare} className='bg-[#062A27] text-[white] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold'>
         <RiShareForwardLine className='w-[30px] h-[20px] mr-2' />Share
       </button>
     </div>
         </div>
   ))}
 </div>}
 {favoriteProfiles?.length=="0" &&
 <div className='flex justify-center items-center flex-col w-[100%] '>
<div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
<img className='w-[70px]' src={emtpy}/>
<h1 className='font-bold text-[16px] mt-3'>No favorites medallions</h1>
<p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>You haven’t any favorite meddalions</p>
</div>
</div>
}
</>
  )}
<Modal
open={modal}
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
 <div className='flex  items-center w-[100%] flex-col'>
 <div className='flex justify-end w-[90%] mt-3'>
 <div onClick={handleclose} className='flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]'>
 <img className='w-[10px]' src={cross}/>
 </div>
 </div>
 <div className=' flex justify-center  items-end w-[90%]'>
 <div className=' flex justify-center items-center w-[70px] h-[70px] rounded-[50%] bg-[#FBEFEF]'>
 <img className='w-[40px]' src={delet}/>
 </div>
 </div>
 <div className=' flex justify-center  items-end w-[80%] mt-5'>
 <p className='text-center text-[15px] text-[#062A27] Satoshi-bold'>Are you sure you want to remove this medallion from your favorites?</p>
 </div>
 <div className='w-[85%] flex items-center justify-between  mt-5'>
     <button onClick={handleclose} className='border border-[#062A27] rounded-[30px] w-[140px] h-[40px] flex justify-center items-center Satoshi-bold'>
      No
     </button>
     <button onClick={updateFavoriteStatus} className='bg-[#062A27] text-[white] rounded-[30px] w-[140px] h-[40px] flex justify-center items-center Satoshi-bold'>
      Yes
     </button>
   </div>
 </div>

 <br></br>
</Box>
</Modal>
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
