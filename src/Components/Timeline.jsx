import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import emtpy from "../images/empty (2) 1.png"
import back from "../images/Frame 1171277120.png"
import et from "../images/Et.png"
import education from "../images/Vector.png"
import family from "../images/user3.png"
import award from "../images/Medal.png"
import couple from "../images/Rectangle 34624485.png"
import house from "../images/Dog house.png"
import flag from "../images/Vector-1.png"
import health from "../images/Heart.png"
import Challenge from "../images/Okex.png"
import editb from "../images/editb.png";
import delet from "../images/Delete Bin 4.png";
import travel from "../images/Map location.png"
import innvovation from "../images/mage_light-bulb.png"
import Religion from "../images/Vector-2.png"
import job from "../images/Work.png"
import cross from "../images/cross.png"
import erimg from "../images/Group 1171277121.png"
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, IconButton, colors, Radio, Menu, MenuItem, Fade } from '@mui/material';
import { useParams } from 'react-router-dom'
import { onValue, push, ref, remove, set, update } from 'firebase/database'
import { db, storage } from '../Firebase/firebaseConfig'
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage'
import { ClipLoader, FadeLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { FiMoreVertical } from 'react-icons/fi'
export default function Timeline({toast}) {
    let [event,setEvent]= useState(false)
    let [custom,setCustom]= useState(false)
    let [allevent,setAllevent]= useState("")
    let [singleevent,setSingleevent]=useState("")
    let [timelineDate,setTimelineDate]=useState("")
    let [timelineTitle,setTimelineTitle]=useState("")
    const [btnloader,setBTnloader]=useState(false)
    const [loading,setloading]=useState(false)
    const {id}=useParams();
    let[userdata,setUserdata]=useState("")
    let[events,setEvents]=useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [currentEvent, setCurrentEvent] = useState(null);
    const handleClick = (event,id) => {
      setAnchorEl(event.currentTarget);
      setCurrentEvent(id);
    };
    const handleClose = () => {
      setAnchorEl(null);
      setCurrentEvent(null);
    };
  



    const getSingleChild = () => {
      setloading(true)
      const starCountRef = ref(db, `Profile/${id}`)
  
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        console.log(data);
        console.log("testing data");
        if (data !== undefined && data !== null) {
        setUserdata(data)
        if (data?.timeline) {
          setEvents((Object.values(data?.timeline)))
        } else {
          setEvents([]);
        }
        setloading(false)
        }
      });
    };
    useEffect(() => {
      getSingleChild()
    }, []);


    let handleEventModal =()=>{
        setEvent(true)
    }
    let handleclose =()=>{
        setEvent(false)
      
    }
    let handlecloseevet =()=>{
      setEvent(true)
      setSingleevent(false)
  }
    let handlecustuom =()=>{
        setCustom(true)
    }
    let handlebackEvent =()=>{
        setCustom(false)
        setEvent(true)
    }
    const fileInputRef = useRef(null);
    const [eventprofile, setEventProfile] = useState("");
  
    const handleLuPlusCircleClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const { files } = event.target;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", () => {
          setEventProfile(reader.result);
          setEditTimelineimage(reader.result);
        });
      } else {
        event.target.value = null;
      }
    };
    
    const dataArray = [
      { id: 'custum', image: et, title: 'Custum' },
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

     
let handleevent=(item)=>{
  setAllevent(item)
  setSingleevent(true)
setTimelineTitle("")
setTimelineDate("")
setEventProfile("")
}
const [timeline, setTimeline] = useState([]);
 
const handleAddTimeline = async (timeline) => {
  if(!timelineTitle){
    toast.error("Title are required.")
    return;
  }
  if(!timelineDate){
    toast.error("Date are required.")
    return;
  }
  try {
    setBTnloader(true)
    let uploadedImageUrl = "";
    if (eventprofile) {
   
    const uniqueNum = Date.now();
    const name = 'userEventprofileimg' + uniqueNum;
    const storageRef = sRef(storage, name);


    const base64Data = eventprofile.split(',')[1]; // remove data:image/png;base64,

    // Convert base64 to Uint8Array
    const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    await uploadBytes(storageRef, bytes, {
      contentType: "image/png",
    });

    uploadedImageUrl = await getDownloadURL(storageRef);
  }


    const postsRef = ref(db, `Profile/${id}/timeline`);
    const newPostRef = push(postsRef);
    const postId = newPostRef.key;

    const postWithId = {
      ...timeline,
      id: postId,
      timelineImage: uploadedImageUrl 
    };

    await set(newPostRef, postWithId);
    toast.success("Timeline added successfully");
    setBTnloader(false)
    setSingleevent(false)
    setEvent(false)
    setTimeline(prevPosts => [...prevPosts, postWithId]);
  } catch (error) {
    toast.error("Failed to add timeline: " + error.message);
  }
};
const handleRemoveImage = () => {
  setEventProfile(""); 
  setEditTimelineimage("");
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
const formatdate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
const arrytimeline = [
  { year: '2022', event: '25th Wedding Anniversary in Maui on February 01', image: couple },
  { year: '2020', event: '25th Wedding Anniversary in Maui on February 01', image: couple },
];
let [timelineImageView,setTimelineImageView]=useState("")
let [timelineData,setTimelineData]=useState("")
let handleSingleTimelineClick=(item)=>{
  setTimelineData(item)
  setTimelineImageView(!timelineImageView)
}
let handletimelineImageview=()=>{
  setTimelineImageView(!timelineImageView)
}

/////////edit timeline/////////////
const [editTimlineId, setEditTimlineId] = useState(null);
const [edittimelineTitle, setEdittimelineTitle] = useState("");
const [edittimelineDate, setEdittimelineDate] = useState("");
const[editTimelineimage,setEditTimelineimage]=useState("");
const handleEditcurentevent = (post) => {
  setEditTimlineId(post?.id);
  setEdittimelineTitle(post?.timelineTitle);
  setEdittimelineDate(post?.timelineDate);
  setEditTimelineimage(post?.timelineImage)
  setEditModal(true);
  handleClose();
};

const handleEditEvent = () => {
  if(!edittimelineTitle){
    toast.error("Date are required.")
    return;
  }
  if(!edittimelineDate){
    toast.error("Title are required.")
    return;
  }
 
  const designformatdate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  setBTnloader(true)
  const postRef = ref(db, `Profile/${id}/timeline/${editTimlineId}`);
  const formattedDate = designformatdate(edittimelineDate);
  const updatedPost = {
    id: editTimlineId,
    timelineTitle: edittimelineTitle,
    timelineDate: formattedDate,
    timelineImage: editTimelineimage,
  };

  set(postRef, updatedPost)
    .then(() => {
      toast.success("Post updated successfully");
      setEvents(prevPosts => prevPosts.map(post => post.id === editTimlineId ? updatedPost : post));
      setEditModal(false);
      setBTnloader(false)
    })
    .catch(error => {
      toast.error("Failed to update post: " + error.message);
    });
};

///////////end edit timeline////////////


const [editModal, setEditModal] = useState(false);
const handleCloseEditEvent = () => {
  setEditModal(false);
};
const handleopenmodal = () => {
  setEditModal(true);
};

const handleDeletePost = (postId) => {
  const postRef = ref(db, `Profile/${id}/timeline/${postId}`);
  remove(postRef)
    .then(() => {
      toast.success("Timeline deleted successfully");
      setEvents(prevPosts => prevPosts.filter(post => post.id !== postId));
    })
    .catch(error => {
      toast.error("Failed to delete post: " + error.message);
    });
};


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <>
    {loading ? (
      
      <div className=" justify-center mt-10 items-center ">    
    <FadeLoader color="#062A27" />
      </div>
    ) : (
    <div className='flex justify-center items-center flex-col w-[100%] '>
    <button onClick={handleEventModal}   className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[90%] font-[500] text-[16px] cursor-pointer text-white'><FaPlus className='mr-2'/>Add an important event</button>
    {events.length === 0 ? (
      <div className='flex justify-center items-center flex-col w-[100%] mt-5 '>
      <div className='flex justify-center border border-[#DFE1E1] rounded-[20px]  items-center flex-col h-[250px] w-[90%]'>
      <img className='w-[70px]' src={emtpy}/>
      <h1 className='font-bold Satoshi-bold text-[16px] text-[#062A27]  mt-3'>No timeline events found</h1>
      <p className='text-[#5F6161] text-[13px] mt-3'>Alex Smith's timeline is empty at the moment.</p>
      </div>  </div>):(
  <div className='flex justify-start flex-col w-[90%] mt-5'>
  <div className='text-[16px] text-[#062A27] font-bold Satoshi-bold '>SIGNIFICANT EVENTS</div>
  <div>
  {events.map((item, index) => (
    <div key={index} className='flex justify-start w-[100%] mt-3 flex-col'>
      <div className='w-[100%] flex justify-between '>
        <div className='w-[100px] h-[30px] font-bold Satoshi-bold flex justify-center text-[12px] whitespace-nowrap items-center rounded-[5px] bg-[#D3E8E6]'>
          {item?.timelineDate}
        </div>
        <div className='w-[100px] flex justify-end'>
          <FiMoreVertical
            onClick={(e) => handleClick(e, item.id)}
            className='text-[#5F6161] text-[20px] font-bold'
          />
        </div>
      </div>
      <div
        onClick={() => handleSingleTimelineClick(item)}
        className='cursor-pointer flex justify-start mt-4 h-[65px] items-center border-l border-dashed border-[#5F6161]'
      >
        <img
          className='w-[53px] ml-3 h-[53px] rounded-[4px] object-cover'
          src={item?.timelineImage?item?.timelineImage:"https://placehold.co/53"}
        />
        <p className='text-[#5F6161] ml-3 h-[60px] overflow-y-auto'>
          {item?.timelineTitle}
        </p>
      </div>
    </div>
  ))}
  
  </div>
  </div>
  )}
    </div>
)}
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
     <div className='flex cursor-pointer justify-between mt-5 items-center w-[90%] flex-wrap'>
    
     {dataArray.map((item, index) => (
        <div key={index} id={item.id} onClick={()=>handleevent(item)} className='w-[30%] cursor-pointer mb-4 h-[100px] bg-[#F2F7F7] rounded-[5px] flex justify-evenly items-center flex-col'>
          <img className='w-[30px]' src={item.image} alt={item.title} />
          <h1 className='text-[15px] font-bold'>{item.title}</h1>
        </div>
      ))}
     </div>
     </div>
    }
   
     <br></br>
    </Box>
  </Modal>
  <Modal
  open={singleevent}
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
      <div className='flex w-[90%] justify-between items-center mt-5'>
      <img onClick={handlecloseevet} className='w-[25px] h-[25px]' src={back}/>
      <h1 className='text-[#040A1B] text-[16px] font-bold'>Add an important event</h1>
      <div></div>
      </div>
      <img className='w-[50px] mt-5' src={allevent?.image}/>
      <div className='flex justify-start flex-col w-[90%]'>
      <h1 className='text-[15px] font-bold mt-3'>Event details</h1>
      </div>
      <div className='flex justify-center items-center flex-col w-[100%]'>
      <div className='flex justify-start flex-col w-[90%] mt-3'>
      <label className='mb-1'>Title:</label>
      <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={timelineTitle} onChange={(e) => setTimelineTitle(e.target.value)} />
      </div>
      <div className='flex justify-start flex-col w-[90%] mt-3'>
      <label className='mb-1'>Date:</label>
      <input type='date'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={timelineDate} onChange={(e) => setTimelineDate(e.target.value)}/>
      </div>
      <div className='flex justify-start flex-col mt-3 w-[90%]'>
      <label className='mb-1'>Event preview images:</label>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed h-[112px] rounded-[5px]'>
        Choose File
      </button>  {eventprofile && (
<p className='mt-2 font-bold'>Selected Image:</p>)}
      {eventprofile && (
        <>
        <img src={eventprofile} alt="Event Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
        <button onClick={handleRemoveImage} className='mt-2 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white'>
            Remove Image
          </button>
        </>
      )}
    </div>
    <button  onClick={() => handleAddTimeline(
      {
        id: "",
        timelineTitle: timelineTitle,
        timelineDate:formatdate(timelineDate),
        timelineImage:eventprofile ,
        timeStamp: new Date().toISOString()
      },
    )} className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>   {btnloader? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div>: "Add in Timeline"}</button>
      </div>
      </div>
   <br></br>
  </Box>
</Modal>
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
getContentAnchorEl={null}
>
<MenuItem className='flex items-center' onClick={() => handleEditcurentevent(events.find(post => post.id === currentEvent))}>
  <img className='w-[17px] mr-4'   src={editb} alt="edit" />Edit
</MenuItem>
<MenuItem  className='flex items-center' onClick={() => { handleDeletePost(currentEvent); handleClose(); }}>
  <img className='w-[20px] mr-3' src={delet} alt="delete" />
  <p className='text-[red]'>Delete Post</p>
</MenuItem>
</Menu>

<Modal
open={timelineImageView}
onClose={handletimelineImageview}
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
    <div className='flex w-[90%] justify-between items-center mt-5'>
    <img onClick={handletimelineImageview} className='w-[25px] h-[25px]' src={back}/>
    <h1 className='text-[#040A1B] text-[16px] font-bold'>Event Details</h1>
    <div></div>
    </div>
    <div className='w-[90%] flex justify-start flex-col'>
    <p className='font-bold text-[16px] mt-2'>Title:</p>
    </div>
    <p className='w-[70%] text-left'>{timelineData?.timelineTitle}</p>
   
<img className='w-[90%] mt-2 rounded-md' src={timelineData?.timelineImage}/>

    </div>
 <br></br>
</Box>
</Modal>
<Modal
open={editModal}
onClose={handleCloseEditEvent}
aria-labelledby="edit-event-modal-title"
aria-describedby="edit-event-modal-description"
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
    <div className='flex  items-center w-[100%] flex-col'>
        <div className='flex w-[90%] justify-between items-center mt-5'>
            <img onClick={handleCloseEditEvent} className='w-[25px] h-[25px]' src={back} />
            <h1 className='text-[#040A1B] text-[16px] font-bold'>Edit Event</h1>
            <div></div>
        </div>
        <div className='w-[90%] flex justify-start flex-col'>
            <label>Title:</label>
            <input
                type='text'
                value={edittimelineTitle}
                onChange={(e) => setEdittimelineTitle(e.target.value)}
                className='w-[100%] outline-none border border-[#C9C9C9] h-[35px] rounded-[5px] pl-3 pr-3'
            />
        </div>
        <div className='w-[90%] flex justify-start flex-col mt-3'>
            <label>Date:</label>
            <input
                type='date'
                value={formatDate(edittimelineDate)}
                onChange={(e) => setEdittimelineDate(e.target.value)}
                className='w-[100%] outline-none border border-[#C9C9C9] h-[35px] rounded-[5px] pl-3 pr-3'
            />
        </div>
        <div className='flex justify-start flex-col mt-3 w-[90%]'>
            <label>Event preview images:</label>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                onClick={handleLuPlusCircleClick}
                className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed h-[112px] rounded-[5px]'>
                Choose File
            </button>
            {editTimelineimage && (
                <p className='mt-2 font-bold'>Selected Image:</p>
            )}
            {editTimelineimage && (
                <>
                    <img src={editTimelineimage} alt="Event Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    <button
                        onClick={handleRemoveImage}
                        className='mt-2 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white'>
                        Remove Image
                    </button>
                </>
            )}
        </div>
        <button
            onClick={handleEditEvent}
            className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>
            {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Update Event"}
        </button>
        <br></br>
    </div>
</Box>
</Modal>

    </>
  )
}
