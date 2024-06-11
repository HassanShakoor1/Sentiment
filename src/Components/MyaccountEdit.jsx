import React, { useEffect, useState } from 'react'
import { FormControl, Radio, RadioGroup, FormControlLabel, Modal, Box } from '@mui/material';
import { IoMdKey } from "react-icons/io";
import back from "../images/Frame 1171277120.png"
import cross from "../images/cross.png"
import { FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { equalTo, onValue, orderByChild, query, ref, update } from 'firebase/database';
import { auth, db, firebaseConfig } from '../Firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
export default function MyaccountEdit({toast}) {
    const [email, setEmail] = useState('');

    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
    let [event,setEvent]= useState(false)
 
    let handleclose =()=>{
        setEvent(false)
    }
    let handleEventModal =()=>{
        setEvent(true)
    }
    let currentUser =localStorage.getItem("userId")
    let[userdata,setUserdata]=useState("")
    const getSingleChild = () => {
      const starCountRef = ref(db, `User/${currentUser}`)
  
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        console.log(data);
        setUserdata(data)

      });
    };
    useEffect(() => {
      getSingleChild()
     
    }, []);
    const handleUpdateUser = async () => {
      try {
          await update(ref(db, `User/${currentUser}`), {
              ...userdata
          });
          toast.success("User data updated successfully.");
      } catch (error) {
          console.log("Error updating user data: ", error);
      }
  };

  const handleResetPassword = async () => {
    try {
      if (!email) {
       toast.error("Please enter a valid email address.")
        return;
      }

      const emailRegEx =
        /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!emailRegEx.test(email)) {
        toast.error("Please enter a valid email address.")
        return;
      }

      const deviceRef = query(
        ref(db, "/User"),
        orderByChild("email"),
        equalTo(email)
      );

      onValue(deviceRef, (snapshot) => {
        const userData = snapshot.val();
        console.log(userData);
  
        if (!userData) {
          toast.error("This email does not have an associated account.")
          return;
        }
  
        // Email exists, proceed with password reset
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success("Password reset sent into your email. Check your email.")
            setEmail("");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error sending password reset email.")
          });
      });
    } catch (error) {
      console.error(error);
      toast.error("Error sending password reset email.");
    }
  };
  return (
   <>
   <div className='flex justify-start  flex-col w-[90%] '>
   <p className='text-[17px] text-[#062A27] Satoshi-bold mt-3'>Edit Profile</p>
   <button onClick={handleEventModal}   className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[100%] font-[500] text-[16px] cursor-pointer text-white Satoshi-bold'><IoMdKey className='mr-2 w-[30px] h-[30px]'/>Change Password</button>
   <h1 className='mt-5 font-bold text-[16px] text-[#062A27] Satoshi-bold'>PERSONAL DETAILS</h1>
   <div className='flex justify-between items-center w-[100%] mt-5'>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>First Name *</label>
   <input type='text' value={userdata?.firstName} onChange={(e) => setUserdata({...userdata,firstName:e.target.value})} placeholder='First Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>Last Name *</label>
   <input type='text' value={userdata?.lastName} onChange={(e) => setUserdata({...userdata,lastName:e.target.value})} placeholder='Last Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
   
   </div>
  
   <p className='text-[16px] font-bold Satoshi-bold mt-8'>LOCATION DETAILS</p>
   <div className='flex justify-start flex-col mt-3'>
   <label className='mb-2'>City:</label>
   <input type='text' value={userdata?.city} onChange={(e) => setUserdata({...userdata,city:e.target.value})} className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
   <div className='flex justify-start flex-col mt-3'>
   <label className='mb-2'>State:</label>
   <input type='text' value={userdata?.state} onChange={(e) => setUserdata({...userdata,state:e.target.value})}className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
 
   <div>
    <div className='text-[16px] font-bold Satoshi-bold mt-8'>EMAIL NOTIFICATION</div>
    <div className='flex flex-col mt-3'>
    <FormControl className='w-[100%] flex flex-col' component="fieldset">
    <RadioGroup
    row
    aria-label="privacy"
    name="privacy"
    value={String(userdata.muteNotification)}  // Ensure the value is always defined
    onChange={(e) => setUserdata({ ...userdata, muteNotification: e.target.value === "true" })}
  >
    <FormControlLabel
      value="true"
      control={<Radio style={{ color: "#2F9089" }} />}
      label="Muted notifications"
    />
    <h2 className=' mt-2 mb-2 text-[#5F6161]'>By selecting this option, you will not receive emails when updating any profile associated with the account.</h2>
    <FormControlLabel
      value="false"
      control={<Radio style={{ color: "#2F9089" }} />}
      label="Unmuted notifications"
    />
    <h2 className=' mt-2 mb-2 text-[#5F6161]'>By selecting this option, you will receive emails when updating any profile associated with the account.</h2>
  </RadioGroup>
</FormControl>
     </div>
  </div>
  <button  onClick={handleUpdateUser} className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer Satoshi-bold text-white'>Save Changes</button>
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
 <h1 className='text-[#040A1B] text-[16px] font-bold'>Change Password</h1>
 <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
</div>
<div className='flex w-[100%] justify-between items-center flex-col mt-5'>

<div className='flex w-[90%] justify-start'>
<label className='mb-[-10px] mt-5'>Enter Email:</label>
</div>
<div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px] '>
<input className='outline-none border-none w-[90%] p-3 h-[40px]' type="email" name='password'  value={email} onChange={(e) => setEmail(e.target.value)}   />
</div>
 
  <button onClick={handleResetPassword}  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>Sent to email</button>
</div>

 


 <br></br>
</Box>
</Modal>

   </>
  )
}
