import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import img2 from "../images/imgg (1).jpg"
import img3 from "../images/imgg (2).jpg"
import img4 from "../images/imgg (3).jpg"
import { GoDotFill, GoHeart } from 'react-icons/go'
import { RiShareForwardLine } from 'react-icons/ri'
import chat from "../images/Chat (1).png"
import send from "../images/Send message.png"
import user from "../images/Ellipse 2723 (1).png"
import { Modal, Box, IconButton, colors, Radio } from '@mui/material';
import back from "../images/Frame 1171277120.png"
import tick from "../images/Check circle.png"
import cross from "../images/cross.png"
import { FileUploader } from "react-drag-drop-files";
export default function Tribute() {
    let [Tribute,setTributes]=useState()
    let handleopen=()=>{
        setTributes(true)
    }
    let handleclose=()=>{
        setTributes(false)
    }
    const fileTypes = ["JPG", "PNG", "GIF"];

 const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  }

  const handleFile = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputValue(imageUrl);
    }
  }

  const handleLuPlusCircleClick = () => {
    fileInputRef.current.click();
  }
  const data = [
    {
        id: 1,
        userImage: img3,
        userName: 'Mis Elza',
        time: '5w',
        description: "It’s your first studio photo where he was very happy to take photo.",
        postImage: img3,
        likes: 2,
        comments: [
            {
                commentUserImage: user,
                commentUserName: 'Mis Ansha',
                commentTime: '5w',
                commentText: 'So many love from my heart for him. I love him so much.'
            }
        ]
    },
];

  return (
   <>
  
   <Modal
   open={Tribute}
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
   <div className='flex items-center w-[100%] flex-col'>
   <div className='flex w-[90%] justify-between items-center  mt-5'>
   <div className='flex items-center'>
   <img onClick={handleclose}  className='w-[25px] h-[25px]' src={back}/>
   <p className='text-[16px] ml-3 text-[#B08655] font-bold Satoshi-bold'>Back to tributes</p>
   </div>
   <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
   <img className='w-[10px]' src={cross}/>
   </div>
   </div>
   <div  className='flex  items-center mt-5 w-[90%]'>
   <img className='w-[40px] h-[40px] object-cover rounded-[50%]' src={img3}  />
   <p className='text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]'>Mis Elza</p>
</div>
<div className='flex justify-start flex-col w-[90%] mt-5'>
<label className='mb-1'>Title</label>
<input type='text'  className='w-[100%] outline-none border border-[#DCE5E5] h-[40px]  rounded-[5px] pl-3 pr-3'/>
</div>
<div className='flex justify-start flex-col w-[90%] mt-5'>
<label className='mb-1'>Description</label>
<textarea type='text'  className='w-[100%] outline-none border border-[#DCE5E5] min-h-[70px] h-[40px]  rounded-[5px] pl-3 pr-3'/>
<div className="flex justify-start flex-col mt-3" onDrop={handleDrop} onDragOver={handleDragOver}>
<input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleInputChange} accept="image/*" />
<label className="custom-input-label" htmlFor="fileInput">
  <input
    type="text"
    className="drag-drop-input"
    placeholder="Drag and drop image here or click to upload"
    value={inputValue}
    readOnly
    style={{ display: 'none' }}
  />
</label>
<button onClick={handleLuPlusCircleClick} className="outline-none border underline text-[#062A27] Satoshi-bold font-bold border-[#062A27] bg-[#F1F9F8] border-dashed h-[40px] rounded-[5px] mt-3">
  Choose File
</button>
</div>
<div className='flex justify-center items-center w-[100%]'>
<p className='text-[14px] text-[#040A1B] mt-2'>Drag to upload photo</p>
</div>
<button onClick={handleclose} className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[100%] font-[500] text-[16px] cursor-pointer text-white'><img src={tick} className='mr-2 w-[20px]'/>Publish Tribute</button>
</div>


   </div>
    <br></br>
   </Box>
 </Modal>
   </>
  )
}
