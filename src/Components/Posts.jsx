import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { GoDotFill } from 'react-icons/go';
import { FiMoreVertical } from 'react-icons/fi';
import profile1 from "../images/Group 661 (2).png"
import { FaPlus } from 'react-icons/fa6';
import { Box, Modal } from '@mui/material';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { db } from '../Firebase/firebaseConfig';
import media from "../images/Video playlist.png"
import img5 from "../images/imgg (4).jpg";
import img3 from "../images/imgg (2).jpg";
import editb from "../images/editb.png";
import delet from "../images/Delete Bin 4.png";
import eye from "../images/Eye (1).png";
import cross from "../images/cross.png";
import back from "../images/Frame 1171277120.png";
import { BsSignpost } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

function timeDifference(previous) {
  const current = new Date();
  const previousDate = new Date(previous); // Convert the timestamp string to a Date object
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const elapsed = current - previousDate;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else {
    return Math.round(elapsed / msPerDay) + ' days ago';
  }
}

export default function Posts({ userdata,toast }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false); 
  const [viewPostDetails, setViewPostDetails] = useState(null);
  const [btnloader,setBTnloader]=useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event,postId) => {
    setAnchorEl(event.currentTarget);
    console.log(postId)
    setSelectedPostId(postId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

 

  const [event, setEvent] = useState(false);
  const handleclose = () => {
    setEvent(false);
  };
  const handleEventModal = () => {
    setEvent(true);
    setPostDes("")
    setPostTitle("")
  };
  const currentUser = localStorage.getItem("userId");
  const [postTitle, setPostTitle] = useState("");
  const [postDes, setPostDes] = useState("");
  const [allPosts, setAllPosts] = useState([]);
 

  const handleAddPost = (post, currentUser) => {
   
    if(!postTitle){
      toast.error("Post title is required!")
      return;
    }

setBTnloader(true)
    const postsRef = ref(db, `User/${currentUser}/allPosts`);
    const newPostRef = push(postsRef); 
    const postId = newPostRef.key; 
  
    const postWithId = {
      ...post,
      id: postId 
    };
  
    set(newPostRef, postWithId)
      .then(() => {
        toast.success("Post added successfully");
        setBTnloader(false)
        setAllPosts(prevPosts => [...prevPosts, postWithId]); 
      })
      .catch(error => {
        toast.error("Failed to add post: " + error.message);
      });
  
    setEvent(false);
  };
  
  const [getposts, setGetposts] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const starCountRef = ref(db, `User/${currentUser}/allPosts/`);
      onValue(starCountRef, (snapshot) => {
        const fetchdata = snapshot.val();
        if (fetchdata) {
          setGetposts(Object.values(fetchdata));
        } else {
          setGetposts([]); 
        }
      });
    };
    getdata();
  }, [currentUser]);
  const handleDeletePost = (postId) => {
    const postRef = ref(db, `User/${currentUser}/allPosts/${postId}`);
    remove(postRef)
      .then(() => {
        toast.success("Post deleted successfully");
        setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      })
      .catch(error => {
        toast.error("Failed to delete post: " + error.message);
      });
  };
  const [editEvent, setEditEvent] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostDes, setEditPostDes] = useState("");
  const handleEditPost = (post) => {
    setEditPostId(post.id);
    setEditPostTitle(post.postTitle);
    setEditPostDes(post.postDescription);
    setEditEvent(true);
    handleClose();
  };

  const handleUpdatePost = () => {
    setBTnloader(true)
    const postRef = ref(db, `User/${currentUser}/allPosts/${editPostId}`);
    const updatedPost = {
      id: editPostId,
      postTitle: editPostTitle,
      postDescription: editPostDes,
      userId: userdata?.id,
      firstName: userdata?.firstName,
      lastName: userdata?.lastName,
      profile: userdata?.profileImage,
      timeStamp: new Date().toISOString()
    };
  
    set(postRef, updatedPost)
      .then(() => {
        toast.success("Post updated successfully");
        setBTnloader(false)
        setAllPosts(prevPosts => prevPosts.map(post => post.id === editPostId ? updatedPost : post));
        setEditEvent(false);
      })
      .catch(error => {
        toast.error("Failed to update post: " + error.message);
      });
  };
  
  const handleViewPost = (post) => { 
    setViewPostDetails(post);
    setOpenViewModal(true);
    handleClose(); // Close the menu
  };
  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + '...';
    }
  }
  let truncatedName = truncateText(`${userdata?.firstName} ${userdata?.lastName}`, 19);
  return (
    <>
      <div className='w-[90%] justify-start items-center flex-col'>
        <button onClick={handleEventModal} className='bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[500] text-[16px] cursor-pointer text-white Satoshi-bold'>
          <FaPlus className='mr-2' />Add New Post
        </button>
        
        <p className='text-[15px] text-[#062A27] Satoshi-bold mt-3'>MY POSTS</p>
        {getposts.length===0 && <div className='flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[100%]'>
          <BsSignpost className='w-[50px] h-[50px] text-[#5F6161]' />
          <h1 className='font-bold text-[16px] mt-3'>No post found</h1>
          <p className='text-[#5F6161] text-[13px] w-[70%] text-center mt-3'>No post has been added yet in collection</p>
          </div>}
          {getposts.length >= 1 &&
            <>
        <div className='flex items-center flex-col sm:h-[180px] h-[350px] overflow-y-scroll w-[100%]'>
          {getposts?.map((item, index) => (
            <div key={index} className='w-[100%] flex flex-col items-center mt-5'>
              <div className='flex justify-between items-center w-[100%]'>
                <div className='flex items-center'>
                  <img className='w-[30px] h-[30px] object-cover rounded-[50%]' src={userdata?.profileImage?userdata?.profileImage:profile1}  />
                  <p className='text-[14px] font-bold Satoshi-bold ml-3 text-[#062A27] whitespace-normal'>{truncatedName}</p>
                  <GoDotFill className='text-[#5F6161] ml-2' />
                  <p className='text-[#5F6161] ml-2'>{timeDifference(item?.timeStamp)}</p>
                </div>
                <FiMoreVertical onClick={(e) => handleClick(e, item.id)} className='text-[#5F6161] text-[20px] font-bold' />
              </div>

              <div className='w-[100%] flex items-center mb-2'>
                <p className='ml-[50px] font-bold Satoshi-bold text-[14px] text-[#062A27]'>{item?.postTitle}</p>
              </div>

              <div className='w-[100%] flex items-center'>
                <p className='ml-[50px] text-[#5F6161] '>{item?.postDescription}</p>
              </div>
            </div>
          ))}
        </div>
        </>
          }
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
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => handleViewPost(getposts.find(post => post.id === selectedPostId))} className='flex items-center'>
          <img className='w-[20px] h-[19px] mr-3' src={eye} alt="view" />View
        </MenuItem>
        <MenuItem onClick={() => handleEditPost(getposts.find(post => post.id === selectedPostId))} className='flex items-center'>
          <img className='w-[17px] mr-4' src={editb} alt="edit" />Edit
        </MenuItem>
        <MenuItem onClick={() => { handleDeletePost(selectedPostId); handleClose(); }} className='flex items-center'>
          <img className='w-[20px] mr-3' src={delet} alt="delete" />
          <p className='text-[red]'>Delete Post</p>
        </MenuItem>
      </Menu>
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
            fontFamily: "Satoshi",
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <div className='flex items-center w-[100%] flex-col'>
            <div className='flex w-[90%] justify-between items-center mt-5'>
              <img onClick={handleclose} className='w-[25px] h-[25px]' src={back} alt="back" />
              <h1 className='text-[#040A1B] text-[16px] font-bold'>Add New Post</h1>
              <div onClick={handleclose} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
                <img className='w-[10px]' src={cross} alt="close" />
              </div>
            </div>
          </div>
          <div className='flex w-[100%] justify-between items-center flex-col mt-5'>
            <div className='flex w-[90%] justify-start'>
              <label className='mb-[-10px]'>Post Title:</label>
            </div>
            <div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px]'>
              <input
                className='outline-none border-none w-[90%] p-3 h-[40px]'
                type="text"
                name='title'
                placeholder="Post Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <div className='flex w-[90%] justify-start'>
              <label className='mb-[-10px] mt-5'>Post Description:</label>
            </div>
            <textarea
              className='w-[90%] outline-none border flex items-center border-[#C9C9C9] p-2 mt-5 min-h-[120px] rounded-[5px]'
              type="text"
              name='description'
              placeholder="Post Description"
              value={postDes}
              onChange={(e) => setPostDes(e.target.value)}
            />
            <button
              onClick={() => handleAddPost(
                {
                  id: Date.now(),
                  postTitle: postTitle,
                  postDescription: postDes,
                  userId: userdata?.id,
                  firstName: userdata?.firstName,
                  lastName: userdata?.lastName,
                  profile: userdata?.profileImage,
                  timeStamp: new Date().toISOString()
                },
                currentUser,
                allPosts
              )}
              className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'
            >
            {btnloader? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div>: "    Upload Post"}
            </button>
          </div>
          <br />
        </Box>
      </Modal>
      <Modal
  open={editEvent}
  onClose={() => setEditEvent(false)}
  aria-labelledby="edit-post-modal-title"
  aria-describedby="edit-post-modal-description"
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
      fontFamily: "Satoshi",
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }}
  >
    <div className='flex items-center w-[100%] flex-col'>
      <div className='flex w-[90%] justify-between items-center mt-5'>
        <img onClick={() => setEditEvent(false)} className='w-[25px] h-[25px]' src={back} alt="back" />
        <h1 className='text-[#040A1B] text-[16px] font-bold'>Edit Post</h1>
        <div onClick={() => setEditEvent(false)} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
          <img className='w-[10px]' src={cross} alt="close" />
        </div>
      </div>
    </div>
    <div className='flex w-[100%] justify-between items-center flex-col mt-5'>
      <div className='flex w-[90%] justify-start'>
        <label className='mb-[-10px]'>Post Title:</label>
      </div>
      <div className='w-[90%] outline-none border flex items-center border-[#C9C9C9] mt-5 h-[45px] rounded-[5px]'>
        <input
          className='outline-none border-none w-[90%] p-3 h-[40px]'
          type="text"
          name='title'
          placeholder="Post Title"
          value={editPostTitle}
          onChange={(e) => setEditPostTitle(e.target.value)}
        />
      </div>
      <div className='flex w-[90%] justify-start'>
        <label className='mb-[-10px] mt-5'>Post Description:</label>
      </div>
      <textarea
        className='w-[90%] outline-none border flex items-center border-[#C9C9C9] p-2 mt-5 min-h-[120px] rounded-[5px]'
        type="text"
        name='description'
        placeholder="Post Description"
        value={editPostDes}
        onChange={(e) => setEditPostDes(e.target.value)}
      />
      <button
        onClick={handleUpdatePost}
        className='bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[90%] font-[600] text-[16px] cursor-pointer text-white'
      >
      {btnloader? <div cla><ClipLoader size={20} color="#ffffff" className='mt-2' /></div>: "    Upload Post"}
      </button>
    </div>
    <br />
  </Box>
</Modal>
<Modal
open={openViewModal}
onClose={() => setOpenViewModal(false)}
aria-labelledby="view-post-modal-title"
aria-describedby="view-post-modal-description"
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
    fontFamily: "Satoshi",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
  <div className='flex items-center w-[100%] flex-col'>
    <div className='flex w-[90%] justify-between items-center mt-5'>
      <img onClick={() => setOpenViewModal(false)} className='w-[25px] h-[25px]' src={back} alt="back" />
      <h1 className='text-[#040A1B] text-[16px] font-bold'>View Post</h1>
      <div onClick={() => setOpenViewModal(false)} className='flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]'>
        <img className='w-[10px]' src={cross} alt="close" />
      </div>
    </div>
  </div>
  <div className='flex w-[100%] justify-between items-center flex-col mt-5'>
    <div className='flex w-[90%] text-[18px]  justify-start '>
      <label className=''>Post Title:</label>
    </div>
    <div className='flex w-[90%] justify-start mt-2'>
    <p className=' ml-[20px] font-bold Satoshi-bold text-[#062A27]'>{viewPostDetails?.postTitle}</p>
    </div>
    <div className='flex w-[90%]  text-[18px]   mt-5 justify-start items-center'>
      <label className=' '>Post Description:</label>
    </div>
    <div className='flex w-[90%] mt-2 justify-start '>
    <p className='ml-[20px] text-[#5F6161]'>{viewPostDetails?.postDescription}</p>
    </div>
  </div>
  <br />
</Box>
</Modal>

    </>
  );
}
