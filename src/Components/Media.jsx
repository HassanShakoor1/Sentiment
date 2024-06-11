import React, { useEffect, useRef, useState } from 'react'
import media from "../images/Video playlist.png"
import { FaPlus } from 'react-icons/fa6'
import { Modal, Box, IconButton, Menu, Fade, MenuItem,} from '@mui/material';
import back from "../images/Frame 1171277120.png"
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import cross from "../images/cross.png"
import img3 from "../images/imgg (2).jpg"
import ReactPlayer from 'react-player';
import editb from "../images/editb.png";
import delet from "../images/Delete Bin 4.png";
import music from '../aduio/island.mp3'
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FiMoreVertical } from 'react-icons/fi';
import { db, storage } from '../Firebase/firebaseConfig';
import { getDownloadURL, uploadBytes,ref as sRef } from 'firebase/storage';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
export default function Media({toast}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [btnloader,setBTnloader]=useState(false)
console.log(anchorEl)
 /////////edit image/////////////
 const [editImageId, setEditImageId] = useState(null);
 const [editImageTitle, setEditImageTitle] = useState("");
 const [editImageDes, setEditImageDes] = useState("");
 const[editimage,setEditimage]=useState("");
 const[isEditImageOpen,setIsEditImageOpen]=useState(false);
 
 const handleEditcurentimage = (post) => {
   setEditImageId(post?.id);
   setEditImageTitle(post?.imageTitle);
   setEditImageDes(post?.imageDes);
   setEditimage(post?.mediaImage)
   setIsEditImageOpen(true);

 };
 
 const handleEditimage = () => {
   if(!editImageTitle){
     toast.error("Title are required.")
     return;
   }
   if(!editimage){
     toast.error("image are required.")
     return;
   }
   setBTnloader(true)
   const postRef = ref(db, `Profile/${id}/imageMedia/${editImageId}`);
   const updatedPost = {
     id: editImageId,
     imageTitle: editImageTitle,
     imageDes: editImageDes,
     mediaImage: editimage,
   };
 
   set(postRef, updatedPost)
     .then(() => {
       toast.success("Image updated successfully");
       setIsEditImageOpen(false);
       setBTnloader(false)
       setAnchorEl(null);
     })
     .catch(error => {
       toast.error("Failed to update post: " + error.message);
     });
 };
 
 ///////////end edit image////////////

 const handleClick1 = (event, id, type) => {
  setAnchorEl(event.currentTarget);
  setCurrentId(id);
  setMenuType(type);

};
  const handleClick2 = (event, id, type) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
    setMenuType(type);
  };
  const handleClick3 = (event, id, type) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuType(null);
    setIsEditImageOpen(false)
    setIsEditVideoOpen(false)
    setIsEditVoiceOpen(false)
  };

    let [event,setEvent]= useState(false)
    let handleclose =()=>{
        setEvent(false)
    }
    let handleEventModal =()=>{
        setEvent(true)
        setImageTitle("")
        setImageDes("")
        setMediaImage("")
        setVideoDes("")
        setVideoLink("")
        setVideotitle("")
        setVoiceTitle("")
        setVoiceDes("")
        setMediaVoice("")
        
    }
    const [privacy, setPrivacy] = useState('Image');

    const handlePrivacyChange = (event) => {
      setPrivacy(event.target.value);
    };
  
    const fileInputRef = useRef(null);

    const handleLuPlusCircleClick = () => {
        fileInputRef.current.click();
    };





    /////////////upload media///////////
    let [imageTitle,setImageTitle]=useState("")
    let [imageDes,setImageDes]=useState("")
    let [mediaImage,setMediaImage]=useState("")
    const handleFileChange = (event) => {
      const { files } = event.target;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", () => {
          setMediaImage(reader.result);
          setEditimage(reader.result)
        });
      } else {
        event.target.value = null;
      }
    };
    const {id}=useParams();
    const handleAddimage = async (imageMedia) => {
      if(!mediaImage){
        toast.error("Image are required.")
        return;
      }
      if(!imageTitle){
        toast.error("Title are required.")
        return;
      }
      try {
        setBTnloader(true)
        let uploadedImageUrl = "";
        if (mediaImage) {
        const uniqueNum = Date.now();
        const name = 'mediaImage' + uniqueNum;
        const storageRef = sRef(storage, name);
    
    
        const base64Data = mediaImage.split(',')[1]; 
        const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
        await uploadBytes(storageRef, bytes, {
          contentType: "image/png",
        });
    
        uploadedImageUrl = await getDownloadURL(storageRef);
      }
    
    
        const postsRef = ref(db, `Profile/${id}/imageMedia`);
        const newPostRef = push(postsRef);
        const postId = newPostRef.key;
    
        const postWithId = {
          ...imageMedia,
          id: postId,
          mediaImage: mediaImage 
        };
    
        await set(newPostRef, postWithId);
        toast.success("Image successfully added!");
        handleclose()
        setBTnloader(false)
      } catch (error) {
        toast.error("Failed to add timeline: " + error.message);
      }
    };

    /////////////end upload media/////////


    ///////////video media upload/////////////
    let [videoTitle,setVideotitle]=useState('')
    let [videoDes,setVideoDes]=useState('')
    let [videoLink,setVideoLink]=useState('')
    const handleAddVideo = async (videoMedia) => {
      if(!videoLink){
        toast.error("Youtube URL are required.")
        return;
      }
      if(!videoTitle){
        toast.error("Title are required.")
        return;
      }
      try {
        setBTnloader(true)
        const postsRef = ref(db, `Profile/${id}/videoMedia`);
        const newPostRef = push(postsRef);
        const postId = newPostRef.key;
    
        const postWithId = {
          ...videoMedia,
          id: postId,
        };
    
        await set(newPostRef, postWithId);
        toast.success("Video successfully added!");
        handleclose()
        setBTnloader(false)
      } catch (error) {
        toast.error("Failed to add timeline: " + error.message);
      }
    };





    //////////end video media upload//////////////

/////////////video media edit/////////////

const [editVideoId, setEditVideoId] = useState(null);
 const [editVideoTitle, setEditVideoTitle] = useState("");
 const [editVideoDes, setEditVideoDes] = useState("");
 const[editVideoLink,setEditVideoLink]=useState("");
 const[isEditVideoOpen,setIsEditVideoOpen]=useState(false);
 
 const handleEditcurentvideo = (post) => {
  console.log(post)
  setEditVideoId(post?.id);
  setEditVideoTitle(post?.videoTitle);
  setEditVideoDes(post?.videoDes);
  setEditVideoLink(post?.videoLink)
   setIsEditVideoOpen(true);
 };
 
 const handleEditvideo = () => {
   if(!editVideoTitle){
     toast.error("Title are required.")
     return;
   }
   if(!editVideoLink){
     toast.error("Youtube URL are required.")
     return;
   }
   setBTnloader(true)
   const postRef = ref(db, `Profile/${id}/videoMedia/${editVideoId}`);
   const updatedPost = {
     id: editVideoId,
     videoTitle: editVideoTitle,
     videoDes: editVideoDes,
     videoLink: editVideoLink,
   };
 
   set(postRef, updatedPost)
     .then(() => {
       toast.success("Video updated successfully");
       setIsEditVideoOpen(false)
       setBTnloader(false)
       setAnchorEl(null);
     })
     .catch(error => {
       toast.error("Failed to update post: " + error.message);
     });
 };




//////////video media edit end////////////

/////////// voice media edit ////////////
const [editVoiceId, setEditVoiceIdId] = useState(null);
 const [editVoiceIdTitle, setEditVoiceTitle] = useState("");
 const [editVoiceIdDes, setEditVoiceDes] = useState("");
 const[editVoiceLink,setEditVoiceLink]=useState("");
 const[isEditVoiceOpen,setIsEditVoiceOpen]=useState(false);
 
 const handleEditcurentvoice = (post) => {
  console.log(post)
  setEditVoiceIdId(post?.id);
  setEditVoiceTitle(post?.voiceTitle);
  setEditVoiceDes(post?.voiceDes);
  setEditVoiceLink(post?.mediaVoice)
  setIsEditVoiceOpen(true);
 };
 
 const handleEditvoice = async () => {
   if(!editVoiceIdTitle){
     toast.error("Title are required.")
     return;
   }
   if(!editVoiceLink){
     toast.error("Voice are required.")
     return;
   }

    try {
      setBTnloader(true)
    let uploadedVoiceUrl = editVoiceLink;

    if (mediaVoice ) {
      const uniqueNum = Date.now();
      const name = 'mediaVoice' + uniqueNum;
      const storageRef = sRef(storage, name);

      await uploadBytes(storageRef, mediaVoice);

      uploadedVoiceUrl = await getDownloadURL(storageRef);
    }
  
   setBTnloader(true)
   const postRef = ref(db, `Profile/${id}/voiceMedia/${editVoiceId}`);
   const updatedPost = {
     id: editVoiceId,
     voiceTitle: editVoiceIdTitle,
     voiceDes: editVoiceIdDes,
     mediaVoice: uploadedVoiceUrl,
   };
 
    await set(postRef, updatedPost);
       toast.success("Video updated successfully");
       setIsEditVoiceOpen(false)
       setBTnloader(false)
       setAnchorEl(null);
     
    } catch(error) {
       toast.error("Failed to update post: " + error.message);
     };
 };




////////////end voice media edit/////////////


//////////////voice media upload/////////
const [mediaVoice, setMediaVoice] = useState(null);
let [voiceDes,setVoiceDes]=useState('')
let [voiceTitle,setVoiceTitle]=useState('')
const handleAddvoice = async (voiceMedia) => {
  if (!mediaVoice) {
    toast.error("Voice is required.");
    return;
  }
  if (!voiceTitle) {
    toast.error("Title is required.");
    return;
  }
  try {
    setBTnloader(true);
    let uploadedVoiceUrl = "";
    if (mediaVoice) {
      const uniqueNum = Date.now();
      const name = 'mediaVoice' + uniqueNum;
      const storageRef = sRef(storage, name);
      await uploadBytes(storageRef, mediaVoice);
      uploadedVoiceUrl = await getDownloadURL(storageRef);
    }

    const postsRef = ref(db, `Profile/${id}/voiceMedia`);
    const newPostRef = push(postsRef);
    const postId = newPostRef.key;

    const postWithId = {
      ...voiceMedia,
          id: postId,
          mediaVoice: uploadedVoiceUrl 
    };

    await set(newPostRef, postWithId);
    toast.success("Voice note successfully added!")
    setBTnloader(false)
    setAnchorEl(null);
    setEvent(false)
  } catch (error) {
    toast.error("Failed to add media: " + error.message);
  }
};
const handleVoiceChange = (e) => {
  const file = e.target.files[0];
  setMediaVoice(file);
  setEditVoiceLink(file)
};



////////////end voice media upload////////






   
   
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
  ////////////get data from firebase////////////
let [imageData,setImageData]=useState([])
let [videoData,setVideoData]=useState([])
let [audioData,setAudioData]=useState([])


  const getSingleChild = () => {
    const starCountRef = ref(db, `Profile/${id}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      if (data !== undefined && data !== null) {
        if (data.imageMedia) {
          setImageData(Object.values(data.imageMedia));
        } else {
          setImageData([]);
        }
        
        if (data.videoMedia) {
          setVideoData(Object.values(data.videoMedia));
        } else {
          setVideoData([]);
        }
        if (data.voiceMedia) {
          setAudioData(Object.values(data.voiceMedia));
        } else {
          setAudioData([]);
        }
      } else {
        setImageData([]);
        setVideoData([]);
        setAudioData([]);
      }
    });
  };
  useEffect(() => {
    getSingleChild()
  }, []);

console.log(audioData)
  let updateLinks = () => {
    if (imageData?.length === 1) {
      setImageData([]);
    }else if (videoData?.length===1){
      setVideoData([]);
    }else if(audioData?.length===1){
      setAudioData([]);
    }
  };
  //////////////end get data from firebse//////
  const handleRemoveImage = () => {
    setMediaImage(""); 
    setEditimage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  //////delete image////////////////////////////

  const handleDeleteimage = (postId) => {
    const postRef = ref(db, `Profile/${id}/imageMedia/${postId}`);
    remove(postRef)
      .then(() => {
        toast.success("Image successfully deleted");
        updateLinks();
      })
      .catch(error => {
        toast.error("Failed to delete post: " + error.message);
      });
  };

  /////////end delete image///////////////////


  /////////////delete video media/////////

  const handleDeletevideo = (postId) => {
    const postRef = ref(db, `Profile/${id}/videoMedia/${postId}`);
    remove(postRef)
      .then(() => {
        toast.success("Video successfully deleted");
        updateLinks();
      })
      .catch(error => {
        toast.error("Failed to delete post: " + error.message);
      });
  };

  ///////end delete video////////////// 

  //////delete voice////////////////////////////

  const handleDeletevoice = (postId) => {
    const postRef = ref(db, `Profile/${id}/voiceMedia/${postId}`);
    remove(postRef)
      .then(() => {
        toast.success("Voice successfully deleted");
        updateLinks();
      })
      .catch(error => {
        toast.error("Failed to delete post: " + error.message);
      });
  };

  /////////end delete voice///////////////////
  return (

<>

<div className='flex justify-center items-center flex-col w-[100%] '>
<button onClick={handleEventModal}  className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[90%] font-[500] text-[16px] cursor-pointer text-white'><FaPlus className='mr-2'/>Add new file</button>

<div className='w-[100%] rounded-[20px]  bg-white flex  mt-8 items-center flex-col'>
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
   
<div className="container mx-auto px-4 py-8">
<div className="grid ">
  {/* Mapping through imageData array to render each image */}
  {imageData?.map(image => (
    <div key={image?.id} className="bg-white shadow-md rounded-md p-4 mb-5 border">
      <div className='w-[100%] flex justify-between items-center'>
      <h2 className="text-lg font-semibold mb-2">{image?.imageTitle}</h2>
      <FiMoreVertical onClick={(event) => handleClick1(event,image?.id, 'image')}
        className='text-[#5F6161] text-[20px] font-bold'
      />
    </div>
      <p className="text-gray-600 mb-2">{image?.imageDes}</p>
      <img src={image?.mediaImage} className="w-[100%] h-auto mb-3 rounded-md "  />
    </div>
  ))}
</div>
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
      <FiMoreVertical onClick={(event) => handleClick2(event, video?.id, 'video')}
        className='text-[#5F6161] text-[20px] font-bold'
      />
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
    <FiMoreVertical onClick={(event) => handleClick3(event, audio?.id, 'voice')}
      className='text-[#5F6161] text-[20px] font-bold'
    />
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
</div>

  {menuType === 'image' && (
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
          <MenuItem className='flex items-center' onClick={() => handleEditcurentimage(imageData.find(post => post.id === currentId))}>
            <img className='w-[17px] mr-4' src={editb} alt="edit" />Edit Image
          </MenuItem>
          <MenuItem className='flex items-center' onClick={() => { handleDeleteimage(currentId); handleClose(); }}>
            <img className='w-[20px] mr-3' src={delet} alt="delete" />
            <p className='text-[red]'>Delete Image</p>
          </MenuItem>
        </Menu>
      )}

      {menuType === 'video' && (
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
          <MenuItem className='flex items-center' onClick={() => handleEditcurentvideo(videoData.find(post => post.id === currentId))}>
            <img className='w-[17px] mr-4' src={editb} alt="edit" />Edit Video
          </MenuItem>
          <MenuItem className='flex items-center' onClick={() => { handleDeletevideo(currentId); handleClose(); }}>
            <img className='w-[20px] mr-3' src={delet} alt="delete" />
            <p className='text-[red]'>Delete Video</p>
          </MenuItem>
        </Menu>
      )}

      {menuType === 'voice' && (
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
          <MenuItem className='flex items-center' onClick={()=> handleEditcurentvoice(audioData.find(post => post.id === currentId))}>
            <img className='w-[17px] mr-4' src={editb} alt="edit" />Edit Voice
          </MenuItem>
          <MenuItem className='flex items-center' onClick={() => { handleDeletevoice(currentId); handleClose(); }}>
            <img className='w-[20px] mr-3' src={delet} alt="delete" />
            <p className='text-[red]'>Delete Voice</p>
          </MenuItem>
        </Menu>
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
 <h1 className='text-[#040A1B] text-[16px] font-bold'>New Post</h1>
 <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
<p className='w-[90%] h-[1px] mt-5 bg-[#DFE1E1]'></p>
<div className='flex justify-start flex-col w-[90%]'>
<p className='text-[15px]  mt-1'>Type of content</p> 
<div className='flex w-[100%] mt-3 justify-between'>
<FormControl className='w-[100%]' component="fieldset">
<RadioGroup
  row
  aria-label="privacy"
  name="privacy"
  value={privacy}
  onChange={handlePrivacyChange}
>
  <FormControlLabel
    value="Image"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Image"
  />
  <FormControlLabel
    value="Video"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Video"
  />
  <FormControlLabel
    value="Voice"
    control={<Radio style={{ color: "#2F9089" }} />}
    label="Voice note"
  />
</RadioGroup>
</FormControl>
</div>
{privacy === 'Image' && (
    <>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Images:</label>
    <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[80px] rounded-[5px] '>Choose Image</button>
  </div>
  {mediaImage && (
    <p className='mt-2 font-bold'>Selected Image:</p>
)}
{mediaImage && (
    <>
        <img src={mediaImage} alt="Event Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
        <button
            onClick={handleRemoveImage}
            className='mt-2 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white'>
            Remove Image
        </button>
    </>
)}
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Title:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={imageTitle} onChange={(e)=> setImageTitle(e.target.value)}/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Descriptions:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={imageDes} onChange={(e)=> setImageDes(e.target.value)}/>
  </div>
  <button onClick={() => handleAddimage(
    {
      id: "",
      imageTitle: imageTitle,
      imageDes:imageDes,
      timeStamp: new Date().toISOString()
    },
  )}  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'>   {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
  </>
  )}
  {privacy === 'Video' && (
    <>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Title:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={videoTitle} onChange={(e)=> setVideotitle(e.target.value)}/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Youtube URL:</label>
  <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={videoLink} onChange={(e)=> setVideoLink(e.target.value)}/>
  </div>
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Description:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={videoDes} onChange={(e)=> setVideoDes(e.target.value)}/>
  </div>
  <button onClick={() => handleAddVideo(
    {
      id: "",
      videoTitle: videoTitle,
      videoDes:videoDes,
      videoLink:videoLink,
      timeStamp: new Date().toISOString()
    },
  )}  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'> {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
  </>
  )}
  {privacy === 'Voice' && (
    <>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Title:</label>
    <input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={voiceTitle} onChange={(e)=> setVoiceTitle(e.target.value)} />
    </div>
    <div className='flex justify-start flex-col mt-3'>
    <label className='mb-2'>Voice note:</label>
    <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleVoiceChange} />
    <button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[60px] rounded-[5px] '>Choose File</button>
  </div>
 
  <div className='flex justify-start flex-col mt-5'>
  <label className='mb-2'>Description:</label>
  <textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={voiceDes} onChange={(e)=> setVoiceDes(e.target.value)}/>
  </div>
  <button  onClick={() => handleAddvoice(
    {
      id: "",
      voiceTitle: voiceTitle,
      voiceDes:voiceDes,
      mediaVoice:"",
      timeStamp: new Date().toISOString()
    },
  )} className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer text-white'> {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
  </>
  )}
</div>
</div>

 <br></br>
</Box>
</Modal>

<Modal
open={isEditImageOpen}
onClose={handleClose}
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
 <img onClick={handleClose}  className='w-[25px] h-[25px]' src={back}/>
 <h1 className='text-[#040A1B] text-[16px] font-bold'>Edit</h1>
 <div onClick={handleClose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
<>
<div className='flex justify-start flex-col w-[90%] mt-3'>
<label className='mb-2'>Images:</label>
<input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
<button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[80px] rounded-[5px] '>Choose Image</button>
</div>
{editimage && (
<p className='mt-2 font-bold'>Selected Image:</p>
)}
{editimage && (
<>
    <img src={editimage} alt="Event Preview" style={{ maxWidth: '90%', marginTop: '10px' }} />
    <button
        onClick={handleRemoveImage}
        className='mt-2 bg-red-500  rounded-[30px] h-[45px]  w-[90%] font-[600] text-[16px] cursor-pointer text-white'>
        Remove Image
    </button>
</>
)}
<div className='flex justify-start flex-col w-[90%] mt-5'>
<label className='mb-2'>Title:</label>
<input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={editImageTitle} onChange={(e)=> setEditImageTitle(e.target.value)}/>
</div>
<div className='flex justify-start flex-col w-[90%] mt-5'>
<label className='mb-2'>Descriptions:</label>
<textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={editImageDes} onChange={(e)=> setEditImageDes(e.target.value)}/>
</div>
<button onClick={() => handleEditimage()}  className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'>   {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
</>
</div>
 <br></br>
</Box>
</Modal>

<Modal
open={isEditVideoOpen}
onClose={handleClose}
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
 <img onClick={handleClose}  className='w-[25px] h-[25px]' src={back}/>
 <h1 className='text-[#040A1B] text-[16px] font-bold'>Edit</h1>
 <div onClick={handleClose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
<>
<div className='flex justify-start flex-col mt-5 w-[90%]'>
<label className='mb-2'>Title:</label>
<input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={editVideoTitle} onChange={(e)=> setEditVideoTitle(e.target.value)}/>
</div>
<div className='flex justify-start flex-col mt-5 w-[90%]'>
<label className='mb-2'>Youtube URL:</label>
<input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={editVideoLink} onChange={(e)=> setEditVideoLink(e.target.value)}/>
</div>
<div className='flex justify-start flex-col mt-5 w-[90%]'>
<label className='mb-2'>Description:</label>
<textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={editVideoDes} onChange={(e)=> setEditVideoDes(e.target.value)}/>
</div>
<button onClick={() => handleEditvideo()} className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'> {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
</>
</div>
 <br></br>
</Box>
</Modal>
<Modal
open={isEditVoiceOpen}
onClose={handleClose}
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
 <img onClick={handleClose}  className='w-[25px] h-[25px]' src={back}/>
 <h1 className='text-[#040A1B] text-[16px] font-bold'>Edit</h1>
 <div onClick={handleClose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
     <img className='w-[10px]' src={cross}/>
     </div>
</div>
<>
<div className='flex justify-start flex-col mt-3 w-[90%]'>
<label className='mb-2'>Title:</label>
<input type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3' value={editVoiceIdTitle} onChange={(e)=> setEditVoiceTitle(e.target.value)} />
</div>
<div className='flex justify-start flex-col mt-3 w-[90%]'>
<label className='mb-2'>Voice note:</label>
<input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleVoiceChange} />
<button onClick={handleLuPlusCircleClick} className='w-[100%] outline-none border underline text-[#062A27] font-bold border-[#062A27] bg-[#F1F9F8] border-dashed  min-h-[60px] rounded-[5px] '>Choose File</button>
</div>

<div className='flex justify-start flex-col mt-5 w-[90%]'>
<label className='mb-2'>Description:</label>
<textarea type='text'  className='w-[100%] outline-none border border-[#C9C9C9]  min-h-[70px] rounded-[5px] pl-3 pr-3' value={editVoiceIdDes} onChange={(e)=> setEditVoiceDes(e.target.value)}/>
</div>
<button  onClick={() => handleEditvoice()} className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'> {btnloader ? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div> : "Upload"}</button>
</>
</div>
 <br></br>
</Box>
</Modal>
</>
  )
}
