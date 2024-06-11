import React, { useEffect, useState } from 'react'
import media from "../images/Video playlist.png"
import img1 from "../images/miss.jpg"
import chat from "../images/Chat.png"
import img2 from "../images/imgg (1).jpg"
import img3 from "../images/imgg (2).jpg"
import img4 from "../images/imgg (3).jpg"
import img5 from "../images/imgg (4).jpg"
import AudioPlayer from 'react-h5-audio-player';
import smile from "../images/Smiling.png"
import send from "../images/Send message.png"
import comnt from "../images/comnt.png"
import InputEmoji from "react-input-emoji";
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
import ReactPlayer from 'react-player'
import EmojiPicker from 'emoji-picker-react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, ref, update } from 'firebase/database'
import { db } from '../Firebase/firebaseConfig'

export default function ViewMedia({userViewProfile,imageData,videoData,audioData}) {
   
  let [slide,setSlide]=useState()
  let [signleimage,setSignleimage]=useState()
  let [comments,setComments]=useState([])
  console.log(comments)
    
    let handleslide=(imagedata)=>{
        setSlide(true)
        setSignleimage(imagedata)
        const comments = imagedata?.comments ? imagedata.comments : [];
    setComments(comments);
    }
    let handleslideclose=()=>{
      setSlide(false)
  }
 


   
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
    const [image,setImage]=useState(true)
    const [video,setVideo]=useState(false)
    const [voice,setVoice]=useState(false)
    const handleimage =()=>{
      setImage(true)
      setVoice(false)
      setVideo(false)
     
  }
  const handlevideo =()=>{
    setImage(false)
    setVideo(true)
    setVoice(false)
 
  }
  const handlevoice =()=>{
    setImage(false)
    setVideo(false)
    setVoice(true)

  }
  
  const [comment, setComment] = useState("");
  console.log(comment)
  const userId = localStorage.getItem('userId');
  const nevigate = useNavigate();
  let handlesignup= ()=>[
    nevigate("/")
  ]
const {id}=useParams();

let handleAddComent = (comment) => {
  // Fetch existing data
  const profileRef = ref(db, `/Profile/${id}/imageMedia/${signleimage?.id}`);
  return get(profileRef)
      .then((snapshot) => {
          const imageData = snapshot.val() || {}; // Get existing data or empty object if no data exists
          const updatedData = { ...imageData, comments: [...(imageData.comments || []), comment] }; // Add new comment to existing comments or create a new comments array
          const updates = {};
          updates[`/Profile/${id}/imageMedia/${signleimage?.id}`] = updatedData;
          return update(ref(db), updates)
              .then(() => {
                  alert('Comment added successfully');
              })
              .catch((error) => {
                  alert('Failed to add comment: ' + error.message);
              });
      })
      .catch((error) => {
          alert('Failed to fetch existing data: ' + error.message);
      });
};
  const [ text, setText ] = useState('')
  
      function handleOnEnter (text) {
    
      }
    
  return (
    <>
    <div className='w-[100%] rounded-[20px]  bg-white flex  mt-2 items-center flex-col'>
    <div className='flex justify-evenly items-center w-[100%] border-b overflow-x-scroll'>
    <p className='p-3 whitespace-nowrap cursor-pointer text-[#5F6161] ' onClick={handleimage} style={image ? { borderBottom: "2px solid black",color:"#062A27" } : {}} >Image</p>
    <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handlevideo} style={video ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Video</p>
    <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handlevoice} style={voice ? { borderBottom: "2px solid black",color:"#062A27" } : {}}>Voice</p>
    </div>
    {image &&
      <>
      {imageData.length===0 && <div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
        <img className='w-[70px]' src={media}/>
        <h1 className='font-bold text-[16px] mt-3'>No media found</h1>
        <p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No media has been added yet in collection</p>
        </div>}
       
        <div className='flex justify-between items-center flex-wrap w-[90%] mt-3  '>
        {imageData.map((img, index) => (
          <div key={index} id={img.id} className='w-[47%] mt-5 h-[180px] relative rounded-[8px]'>
            <img className='w-[100%] h-[180px]  object-cover rounded-[8px]' src={img.mediaImage} alt={`Image ${index}`} />
            <div onClick={()=> handleslide(img)} className='flex justify-center items-center w-[30px] h-[30px] bottom-2 right-2 rounded-[50%] border bg-[black] bg-opacity-50 absolute border-[white]'>
              <img className='w-[18px]' src={chat} alt="Chat Icon" />
            </div>
          </div>
        ))}
        </div>
     </>
    }
    {video &&
    <>
     {videoData.length===0 && 
     <div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
        <img className='w-[70px]' src={media}/>
        <h1 className='font-bold text-[16px] mt-3'>No media found</h1>
        <p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No media has been added yet in collection</p>
        </div>}
    <div className="container mx-auto px-4 py-8">
    <div className="grid ">
      {/* Mapping through videoData array to render each video */}
      {videoData.map(video => (
        <div key={video.id} className="bg-white shadow-md rounded-md p-4 mb-5 border">
        <div className='w-[100%] flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-2">{video.videoTitle}</h2>
        </div>
          <p className="text-gray-600 mb-2">Description: {video.videoDes}</p>
          {/* Check if videoUrl exists and then render ReactPlayer */}
          {video.videoLink && (
            <div className='w-[100%] h-[230px] mt-5 mb-3 flex overflow-hidden rounded-[10px]'>
              <ReactPlayer
                className='react-player'
                url={video.videoLink}
                width='100%'
                height='230px'
                controls={true} 
              />
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
    </>
    }
    {voice &&
      <>
      {audioData.length===0 && <div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]'>
        <img className='w-[70px]' src={media}/>
        <h1 className='font-bold text-[16px] mt-3'>No media found</h1>
        <p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No media has been added yet in collection</p>
        </div>}
    <div className="container mx-auto px-4 py-3">
    <div className="grid w-full">
      {/* Mapping through audioData array to render each audio */}
      {audioData.map(audio => (
        <div key={audio.id} className="bg-white shadow-md rounded-md border mt-5 p-4">
        <div className='w-[100%] flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-2">{audio?.voiceTitle}</h2>
      </div>
          <p className="text-gray-600 mb-2">Description: {audio?.voiceDes}</p>
          {/* ReactAudioPlayer component */}
          <AudioPlayer
      className='mb-2'
        src={audio?.mediaVoice}
        onPlay={e => console.log("onPlay")}
        // other props here
      />
        </div>
      ))}
    </div>
    </div>
    </>
    }
    
    </div>
<Slide
in={slide}
direction="up"
timeout={{ appear: 500, enter: 500, exit: 500 }}
>

<div className="slide_main_div relative">
  <div className="title_and_icon_main">
 
    <div className="close absolute top-[15px] bg-white flex justify-center items-center right-2 h-[30px] w-[30px] rounded-[50%]" onClick={handleslideclose}>
    <IoIosClose style={{fontSize:"35px"}}/>
    </div>
  </div>
<div className='flex justify-center items-center flex-col w-[100%]'>
<div className='flex justify-start flex-col w-[90%]'>
<div className='flex justify-start items-center w-[100%] mt-5'>
<img className='w-[50px] h-[50px] border-2 border-[#B08655] object-cover rounded-[50%]' src={userViewProfile?.userProfile}/>
<p className='text-[16px] font-bold Satoshi-bold ml-3 border-b-2 border-[#B08655] text-[#B08655] '>{userViewProfile?.firstName} {userViewProfile?.lastName}</p>
</div>
<p className='text-[16px] font-bold Satoshi-bold mt-5 text-[#062A27]  '>{signleimage?.imageTitle}</p>
<p className='text-[15px] mt-2 text-[#5F6161]'>{signleimage?.imageDes}</p>
</div>
<p className='text-[#062A27] mt-5 w-[100%] p-2 flex justify-center items-center border-t border-b border-[#D4E2E2]'>COMMENTS</p>
{comments.length==0  &&
<div className='w-[100%] flex justify-center items-center flex-col mt-5 '>
<img className='w-[60px]' src={comnt} />
<p className='text-[#062A27] text-[16px] font-bold Satoshi-bold mt-1'>This post has no comments yet</p>
<p className='w-[50%] mt-1 text-[14px] text-[#5F6161] text-center'>Share your opinion and leave a comment below</p>
</div>}

<div className='flex  items-center flex-col sm:h-[180px] h-[350px] overflow-y-scroll w-[90%] mt-5 '>
      {comments.map((item, index) => (
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
    {!userId ? (
        <div className='flex justify-center w-[100%] h-[50px] absolute bg-[white] bottom-0 items-center'>
          <div className=" font-bold text-[16px] flex">Please sign up to comment <p onClick={handlesignup} className='underline cursor-pointer ml-2'>Sign Up</p></div>
        </div>
      ) : ( 
<div className='flex justify-between w-[90%] h-[50px] absolute bg-[white] bottom-0 items-center'>
<InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter} 
  placeholder='Add a comment....' 
  className='w-[80%] text-[14px] outline-none border-none' 
        />
<img onClick={()=>handleAddComent({userId:userId ,comment:text, timeStamp: new Date().toISOString()})} className='w-[30px]' src={send} alt='send' />
</div>
    )}
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
<MenuItem onClick={handleClose} className='flex items-center'><img className='w-[20px] mr-3' src={delet}/><p className='text-[red]'>Delete Comment</p></MenuItem>

</Menu>

    </>
  )
}
