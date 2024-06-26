import React, { useEffect, useRef, useState } from 'react'
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { IoChevronBack } from "react-icons/io5";
import { onValue, push, ref, update } from 'firebase/database';
import { db, storage } from '../Firebase/firebaseConfig';
import Cropper from './Cropper';
import { getDownloadURL, uploadString ,ref as sRef} from 'firebase/storage';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../Redux/profileSlice';
export default function CreateEditprofile({bio,toast}) {
  let dispatch =useDispatch();
    const [privacy, setPrivacy] = useState('public');
    const {id}=useParams();
    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
         const [btnloader,setBTnloader]=useState(false)
         let [linkimg, setLinkimg] = useState(null)
      
      let[userdata,setUserdata]=useState("")
      const getSingleChild = () => {
        const starCountRef = ref(db, `Profile/${id}`)
    
        onValue(starCountRef, async (snapshot) => {
          const data = await snapshot.val();
          console.log(data);
          console.log("testing data");
          setUserdata(data)
          dispatch(setUserProfile(data));
          setLinkimg(data?.linkThumbnail)
        });
      };
      useEffect(() => {
        getSingleChild()
      }, []);
     
      const handleUpdateUser = async () => {
        setBTnloader(true)
        const formatdate = (dateString) => {
          const date = new Date(dateString);
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          return date.toLocaleDateString('en-US', options);
        };
        const returnIfHttps = (string) => {
          if (string != "") {
            if (string.slice(0, 4) === "http") {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        };
        try {
          let downloadimageeURL = '';
          if (linkimg) {
          
            if (!returnIfHttps(linkimg)) {
              const uniqueNum = Date.now();
              const name = 'linkimagee' + uniqueNum;
              const storageRef = sRef(storage, name);
              await uploadString(storageRef, linkimg.slice(23), "base64", {
                contentType: "image/png",
              });
              downloadimageeURL = await getDownloadURL(storageRef);
            } else {
              downloadimageeURL = linkimg;
            }
          }
          const formattedDeathDate = formatdate(userdata?.deathDate);
          const formattedBirthDate = formatdate(userdata?.birthDate);
            await update(ref(db, `Profile/${id}`), {
                ...userdata,
                deathDate: formattedDeathDate,
                birthDate:formattedBirthDate,           
                linkThumbnail:downloadimageeURL,
            });
          
            setBTnloader(false)
        } catch (error) {
            console.log("Error updating user data: ", error);
            setBTnloader(false)
        }
      };
      const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
     
    const fileInput = useRef(null);
    const handleplus = () => {
      fileInput.current.click();
  };


  let handleLinkImage = (event) => {
    // profileImage
    setLinkimg("");
    const { files } = event.target;
  
    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setLinkimg(reader.result);
      });
    } else {
      event.target.value = null;
    }
  };


  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  return (
   <>
  
   <div className='flex justify-start  flex-col w-[90%] mt-3'>
   <h1 className='mt-5 font-bold text-[16px] text-[#062A27] Satoshi-bold'>PERSONAL DETAILS</h1>
   <div className='flex justify-between items-center w-[100%] mt-5'>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>First Name *</label>
   <input type='text' placeholder='First Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.firstName} onChange={(e) => setUserdata({...userdata,firstName:e.target.value})} />
   </div>
   <div className='flex justify-start flex-col'>
   <label className='mb-2'>Last Name *</label>
   <input type='text' placeholder='Last Name' className='w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.lastName} onChange={(e) => setUserdata({...userdata,lastName:e.target.value})} />
   </div>
   </div>
   <div className='flex justify-start flex-col mt-3'>
   <label className='mb-2'>Title</label>
   <input type='text' placeholder='Example Jr - Sr' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.title} onChange={(e) => setUserdata({...userdata,title:e.target.value})}/>
   <div className='flex justify-center   w-[100%] flex-col mt-3 '>
      <label className='mb-2' htmlFor="relationship">Relationship</label>
      <div className='outline-none border flex justify-start items-center border-[#C9C9C9] w-[100%]  h-[35px] rounded-[5px] pl-3'>
      <select id="relationship" value={userdata?.relationship} onChange={(e) => setUserdata({...userdata,relationship:e.target.value})}  className='w-[98%] bg-transparent outline-none border-none'>
        <option value="" >Select relationship</option>
        <option value="friend">Friend</option>
        <option value="family">Family</option>
        <option value="colleague">Colleague</option>
      </select>
      </div>
    </div>
 
  <div className='w-[100%] justify-start mt-5'>
      <span style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
        <input
          type="checkbox"
          id="veteran"
          name="veteran"
          checked={userdata?.veteran} 
          onChange={(e) => setUserdata({...userdata, veteran: e.target.checked})}
          style={{ transform: 'scale(1.3)' }}
        />
        <label className='ml-2' htmlFor="veteran">Is a Veteran?</label><br />
      </span>
    </div>
  {bio &&

    <div>
    <div className='text-[16px] font-bold Satoshi-bold mt-8'>POST PRIVACY</div>
    <h2 className='text-[15px] mt-1 mb-1 text-[#5F6161]'>Choose your posts privacy settings:</h2>
    <div className='flex flex-col'>
      <FormControl className='w-[100%] flex flex-col' component="fieldset">
        <RadioGroup
          row
          aria-label="privacy"
          name="privacy"
          value={String(userdata?.postPrivate)}
          onChange={(e) => setUserdata({ ...userdata, postPrivate: e.target.value === "false" ? false : true })}
        >
          <div className="flex flex-col">
            <FormControlLabel
              value="false"
              control={<Radio style={{ color: "#2F9089" }} />}
              label="Public"
            />
            <h2 className='text-[15px] mt-2 mb-2 text-[#5F6161]'>
              If a user selects this option, profile's posts will be visible to anyone visiting the Discover page.
            </h2>
          </div>
          <div className="flex flex-col">
            <FormControlLabel
              value="true"
              control={<Radio style={{ color: "#2F9089" }} />}
              label="Private"
            />
            <h2 className='text-[15px] mt-2 mb-2 text-[#5F6161]'>
              By selecting this option, profile's posts will not be displayed in the Discover page.
            </h2>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  
  
  </div>
  }
  <div className='text-[16px] font-bold Satoshi-bold mt-8'>HEADLINE TEXT</div>
  <h1 className='mt-2 font-bold text-[15px] text-[#5F6161]'>This headline text is the one that shows above the name of the person. If this field is null, the headline text won’t be added.</h1>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Test or phrase</label>
  <input type='text' placeholder='In loving memory of' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.headingText} onChange={(e) => setUserdata({...userdata,headingText:e.target.value})}/>
  </div>
  <div className='w-[100%] justify-start mt-5'>
  <span style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
    <input
      type="checkbox"
      id="includeHeadline"
      name="includeHeadline"
      checked={userdata?.includeHeadline} 
      onChange={(e) => setUserdata({...userdata, includeHeadline: e.target.checked})}
      style={{ transform: 'scale(1.3)' }}
    />
    <label className='ml-2' htmlFor="includeHeadline">Don’t include headline text</label><br />
  </span>
</div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>OBITUARY INFORMATION</p>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Link to Obituary:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.linkObituary} onChange={(e) => setUserdata({...userdata,linkObituary:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Bio information:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.bioInformation} onChange={(e) => setUserdata({...userdata,bioInformation:e.target.value})}/>
  </div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>LIFE TIME</p>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Birth Date *</label>
  <input type='date' className='w-[100%] outline-none bg-transparent border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={formatDate(userdata?.birthDate)} onChange={(e) => setUserdata({...userdata,birthDate:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Death Date *</label>
  <input type='date' className='w-[100%] outline-none bg-transparent border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={formatDate(userdata?.deathDate)} onChange={(e) => setUserdata({...userdata,deathDate:e.target.value})}/>
  </div>
  {bio && <p className='text-[16px] font-bold Satoshi-bold mt-8'>LOCATION BEFORE DEATH</p> }
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>City:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.city} onChange={(e) => setUserdata({...userdata,city:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>State:</label>
  <select
    className='w-[100%] outline-none border border-[#C9C9C9] h-[35px] rounded-[5px] pl-3 pr-3'
    value={userdata?.state} onChange={(e) => setUserdata({...userdata,state:e.target.value})}
  >
    <option value="" disabled>Select a state</option>
    {states.map((stateName) => (
      <option key={stateName} value={stateName}>
        {stateName}
      </option>
    ))}
  </select>
</div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>Custom Link</p> 
  <div className='flex justify-start flex-col mt-3'>
<label className='mb-2'>Link Title:</label>
<input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.linkTitle} onChange={(e) => setUserdata({...userdata,linkTitle:e.target.value})}/>
</div>
<div className='flex justify-start flex-col mt-3'>
<label className='mb-2'>Link URL:</label>
<input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.linkUrl} onChange={(e) => setUserdata({...userdata,linkUrl:e.target.value})}/>
</div>
<div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Link thumbnail:</label>
  <input ref={fileInput}  onChange={handleLinkImage} type="file" style={{ display: 'none' }} />
  <button onClick={handleplus} className='w-[100%] outline-none border underline text-[#062A27] font-bold Satoshi-bold border-[#062A27] bg-[#F1F9F8] border-dashed  h-[40px] rounded-[5px] '>Choose File</button>
</div>
  {bio &&
    <>
    <p className='text-[16px] font-bold Satoshi-bold mt-8'>CEMETERY INFORMATION</p> 
    <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery name:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.cemeteryName} onChange={(e) => setUserdata({...userdata,cemeteryName:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery plot number:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.cemeteryPlot} onChange={(e) => setUserdata({...userdata,cemeteryPlot:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery city:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.cemeteryCity} onChange={(e) => setUserdata({...userdata,cemeteryCity:e.target.value})}/>
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery state:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.cemeteryState} onChange={(e) => setUserdata({...userdata,cemeteryState:e.target.value})} />
  </div>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Cemetery plot location:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.cemeteryLocation} onChange={(e) => setUserdata({...userdata,cemeteryLocation:e.target.value})}/>
  </div>
  <p className='text-[16px] font-bold Satoshi-bold mt-8'>DONATIONS</p> 
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Donations URL:</label>
  <input type='text' className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={userdata?.donationsUrl} onChange={(e) => setUserdata({...userdata,donationsUrl:e.target.value})}/>
  </div>
  </>
  }
  <p className='text-[16px] font-bold mt-8 Satoshi-bold'>QUOTE SECTION</p>
  <h1 className='mt-2 font-bold text-[15px] text-[#5F6161]'>This headline text is the one that shows above the name of the person.</h1>
  <div className='flex justify-start flex-col mt-3'>
  <label className='mb-2'>Text or phrase:</label>
  <textarea type='text' placeholder='The way to get started is to quit talking and begin doing. -Walt Disney'  className='w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pt-2 pr-3' value={userdata?.quoteSection} onChange={(e) => setUserdata({...userdata,quoteSection:e.target.value})}/>
  </div>
  <button onClick={handleUpdateUser}  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer Satoshi-bold text-white'> {btnloader? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div>: "Save Changes"}</button>
 
  </div>
</div>

</>
  )
}
