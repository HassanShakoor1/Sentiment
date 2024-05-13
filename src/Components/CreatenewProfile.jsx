import React, { useRef, useState } from 'react'
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { IoChevronBack } from "react-icons/io5";

export default function CreatenewProfile({handleback,bio}) {
    const [selectedRelationship, setSelectedRelationship] = useState('');

    const handleRelationshipChange = (event) => {
      setSelectedRelationship(event.target.value);
    };
    const fileInputRef = useRef(null);

    const handleLuPlusCircleClick = () => {
        fileInputRef.current.click();
    };
    const [privacy, setPrivacy] = useState('public');

    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
  
  return (
   <>
   <div className='flex justify-start  flex-col w-[90%] mt-3'>
  {!bio &&
   <div className='flex items-center '>
   <div onClick={handleback} className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]'>
    <IoChevronBack/>
    </div>
   <h1 className='ml-3 font-bold text-[16px] text-[#062A27] Satoshi-bold'>Create New Profile</h1>
   </div>}
   <h1 className='mt-5 font-bold text-[16px] text-[#062A27] Satoshi-bold'>PERSONAL DETAILS</h1>
   {!bio && <h1 className='mt-2 font-bold text-[13px] text-[#5F6161]'>Start by entering as much info as you can about your loved one. You will have a chance to update this later.</h1>}
   <div className='flex justify-between items-center w-[100%] mt-5'>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>First Name *</label>
   <input type='text' placeholder='First Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>Last Name *</label>
   <input type='text' placeholder='Last Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   </div>
   </div>
   <div className='flex justify-start flex-col mt-3'>
   <label className='mb-2'>Title</label>
   <input type='text' placeholder='Example Jr - Sr' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
   <div className='flex justify-center   w-[100%] flex-col mt-3 '>
      <label className='mb-2' htmlFor="relationship">Relationship</label>
      <div className='outline-none border flex justify-start items-center border-[#C9C9C9] w-[100%]  h-[35px] rounded-[5px] pl-3'>
      <select id="relationship" value={selectedRelationship} onChange={handleRelationshipChange}  className='w-[98%] outline-none border-none'>
        <option value="" >Select relationship</option>
        <option value="friend">Friend</option>
        <option value="family">Family</option>
        <option value="colleague">Colleague</option>
      </select>
      </div>
    </div>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Profile Picture</label>
    <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold Satoshi-bold border-[#062A27] bg-[#F1F9F8] border-dashed  h-[40px] rounded-[5px] '>Choose File</button>
  </div>
  <div className='  w-[100%] justify-start mt-5'>
  <span style={{display:'flex',alignItems:'center',width:"100%"}}><input
  type="checkbox"
  id="vehicle1"
  name="vehicle1"
  value="Bike"
  style={{ transform: 'scale(1.3)' }}
/>
<label  className='ml-2' htmlFor="vehicle1">Is a Veteran?</label><br /></span> 
  </div>
  {bio &&

    <div>
    <div className='text-[16px] font-bold Satoshi-bold mt-8'>POST PRIVACY</div>
    <h2 className='text-[13px] mt-1 mb-1 text-[#5F6161]'>Choose your posts privacy settings:</h2>
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
    value="Public"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Public"
  />
  <h2 className='text-[13px] mt-2 mb-2 text-[#5F6161]'>If a user selects this option, profile's posts will be visible to anyone visiting the Discover page.</h2>
  <FormControlLabel
    value="Private"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Private"
  />
  <h2 className='text-[13px] mt-2 mb-2 text-[#5F6161]'>By selecting this option, profile's posts will not be displayed in the Discover page.</h2>
 
</RadioGroup>
</FormControl>
     </div>
  </div>
  }
  <div className='text-[16px] font-bold Satoshi-bold mt-8'>HEADLINE TEXT</div>
  <h1 className='mt-2 font-bold text-[13px] text-[#5F6161]'>This headline text is the one that shows above the name of the person. If this field is null, the headline text won’t be added.</h1>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Test or phrase</label>
  <input type='text' placeholder='In loving memory of' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='  w-[100%] justify-start mt-5'>
  <span style={{display:'flex',alignItems:'center',width:"100%"}}><input
  type="checkbox"
  id="vehicle1"
  name="vehicle1"
  value="Bike"
  style={{ transform: 'scale(1.3)' }}
/>
<label  className='ml-2' htmlFor="vehicle1">Don’t include headline text</label><br /></span> 
  </div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>OBITUARY INFORMATION</p>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Link to Obituary:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Bio information:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>LIFE TIME</p>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Birth Date *</label>
  <input type='date' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Death Date *</label>
  <input type='date' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  {!bio && <p className='text-[16px] font-bold Satoshi-bold mt-8'>LOCATION DETAILS</p> }
  {bio && <p className='text-[16px] font-bold Satoshi-bold mt-8'>LOCATION BEFORE DEATH</p> }
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>City:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>State:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  {bio &&
    <>
    <p className='text-[16px] font-bold Satoshi-bold mt-8'>CEMETERY INFORMATION</p> 
    <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery name:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery plot number:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery city:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery state:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery plot location:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>DONATIONS</p> 
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Donations URL:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3'/>
  </div>
  </>
  }
  <p className='text-[16px] font-bold mt-8 Satoshi-bold'>QUOTE SECTION</p>
  <h1 className='mt-2 font-bold text-[13px] text-[#5F6161]'>This headline text is the one that shows above the name of the person.</h1>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Text or phrase:</label>
  <textarea type='text' placeholder='The way to get started is to quit talking and begin doing. -Walt Disney'  className='w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pt-2 pr-3'/>
  </div>
  <button  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer Satoshi-bold text-white'>Save Changes</button>
 
  </div>
</div>
</>
  )
}
