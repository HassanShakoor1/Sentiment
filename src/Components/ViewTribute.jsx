import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import img2 from "../images/imgg (1).jpg";
import img3 from "../images/imgg (2).jpg";
import img4 from "../images/imgg (3).jpg";
import { GoDotFill, GoHeart } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import chat from "../images/Chat (1).png";
import send from "../images/Send message.png";
import profile1 from "../images/Group 661 (2).png";
import delet from "../images/Delete Bin 4.png";
import user from "../images/Ellipse 2723 (1).png";
import {
  Modal,
  Box,
  IconButton,
  colors,
  Radio,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import back from "../images/Frame 1171277120.png";
import tick from "../images/Check circle.png";
import cross from "../images/cross.png";
import { FileUploader } from "react-drag-drop-files";
import { db, storage } from "../Firebase/firebaseConfig";
import {
  equalTo,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  update,
  set,
  get,
} from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FiMoreVertical } from "react-icons/fi";
export default function ViewTribute({ userViewProfile, id }) {
  let [Tribute, setTributes] = useState();
  let handleopen = () => {
    setTributes(true);
  };
  let handleclose = () => {
    setTributes(false);
  };
  // const fileTypes = ["JPG", "PNG", "GIF"];

  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [seeMore, setseeMore] = useState(false);
  const [tributes, settributes] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [selectedPost, setSelectedPost] = useState("");

  const handleChange = (file) => {
    setFile(file);
  };
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef(null);
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setInputValue(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setInputValue(file);
  };

  // const handleFile = (file) => {
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setInputValue(imageUrl);
  //   }
  // };

  const handleLuPlusCircleClick = () => {
    fileInputRef.current.click();
  };
  const data = [
    {
      id: 1,
      userImage: img3,
      userName: "Mis Elza",
      time: "5w",
      description:
        "It’s your first studio photo where he was very happy to take photo.",
      postImage: img3,
      likes: 2,
      comments: [
        {
          commentUserImage: user,
          commentUserName: "Mis Ansha",
          commentTime: "5w",
          commentText:
            "So many love from my heart for him. I love him so much.",
        },
      ],
    },
  ];

  const admin = localStorage.getItem("userId");
  const [tributeData, setTributeData] = useState({
    title: "",
    description: "",
  });
  const [commentData, setCommentData] = useState({
    firstName: "",
    lastName: "",
    comment: "",
  });

  const addTribute = async () => {
    if (tributeData.title && tributeData.description) {
      let name = new Date().getTime() + inputValue.name;
      const storageRef = sRef(storage, name);
      uploadBytes(storageRef, inputValue)
        .then(() => {
          getDownloadURL(storageRef)
            .then((URL) => {
              console.log(URL);
              let pushkey = push(ref(db, `tributes/`), {
                ...tributeData,
                image: URL,
                userId: admin,
                profileId: id,
                timeStamp: new Date().toISOString(),
              }).key;
              update(ref(db, `tributes/${pushkey}`), { id: pushkey });
            })
            .catch((error) => {
              console.log(error);
            });
          setInputValue(null);
        })
        .catch((error) => {
          console.log(error);
        });
      toast.success("New tribute created successfuly");
      setTributeData({
        title: "",
        description: "",
      });
      handleclose();
    } else {
      toast.error("All fields are required");
    }
  };

  const getAllChilds = async () => {
    setloading(true);
    const starCountRef = query(
      ref(db, "/tributes"),
      orderByChild("profileId"),
      equalTo(id)
    );
    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        settributes(Object.values(data));
        console.log(data);
        setloading(false);
        console.log("testing data");
      } else {
        setloading(false);
      }

      MediaKeyStatusMap;
      // setmylist(Object.values(data));

      // setfiltered(Object.values(data));

      // updateStarCount(postElement, data);
    });
  };

  const getAdmin = async () => {
    // setloading(true);
    const starCountRef = query(
      ref(db, "/User"),
      orderByChild("id"),
      equalTo(userViewProfile?.userId)
    );
    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        setAdminData(Object.values(data)?.[0]);
        console.log(data);
        // setloading(false);
        console.log("testing data");
      } else {
        // setloading(false);
      }

      MediaKeyStatusMap;
      // setmylist(Object.values(data));

      // setfiltered(Object.values(data));

      // updateStarCount(postElement, data);
    });
  };

  const submitComment = (post) => {
    if (
      commentData?.firstName &&
      commentData?.lastName &&
      commentData?.comment
    ) {
      if (post?.comments && typeof post?.comments === "object") {
        set(ref(db, `tributes/${post?.id}/comments/`), [
          {
            ...commentData,
            timeStamp: new Date().toISOString(),
            id: Date.now(),
          },
          ...post?.comments,
        ]).then(() => {
          toast.success("Comment submited successfuly");
          setCommentData({
            firstName: "",
            lastName: "",
            comment: "",
          });
        });
      } else {
        set(ref(db, `tributes/${post?.id}/comments/`), [
          {
            ...commentData,
            timeStamp: new Date().toISOString(),
            id: Date.now(),
          },
        ]).then(() => {
          toast.success("Comment submited successfuly");
          setCommentData({
            firstName: "",
            lastName: "",
            comment: "",
          });
        });
      }
    }
  };

  const updateLikes = (post) => {
    if (post && post.id != null) {
      const currentLikes = parseInt(post.likes, 10) || 0; // Ensure likes is treated as a number
      const newLikesCount = currentLikes + 1;
      update(ref(db, `tributes/${post.id}/`), { likes: newLikesCount });
    } else {
      console.error("Invalid post data");
    }
  };

  useEffect(() => {
    getAdmin();
    getAllChilds();
  }, []);

  function timeDifference(previous) {
    const current = new Date();
    const previousDate = new Date(previous); // Convert the timestamp string to a Date object
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = current - previousDate;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else {
      return Math.round(elapsed / msPerDay) + " days ago";
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [cmntTimeStamp, setCmntTimeStamp] = useState("");
  const [commnetId, setCommnetId] = useState("");

  const handleClick = (event, item, allitem) => {
    console.log(item);
    setAnchorEl(event.currentTarget);
    setCmntTimeStamp(item);
    setCommnetId(allitem?.id);
  };
  console.log(commnetId);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteCmnt = (timeStamp) => {
    const postRef = ref(db, `tributes/${commnetId}/comments`);

    get(postRef)
      .then((snapshot) => {
        const posts = snapshot.val();

        if (posts) {
          let remainingComnt = posts.filter((elm) => {
            return elm.timeStamp !== timeStamp;
          });
          console.log(remainingComnt);
          set(ref(db, `tributes/${commnetId}/comments`), remainingComnt).then(
            () => {
              toast.success("Comment deleted successfully");
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        toast.error("Failed to delete comment");
      });
  };
  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + "...";
    }
  }
const handleRemoveImage = () => {
    setInputValue(""); 
    

  };
  console.log(inputValue)
  return (
    <>
      <div className="flex justify-center items-center flex-col w-[100%] mt-5">
        <ToastContainer
          position="top-center"
          autoClose={2000} // Auto close after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          toastClassName="custom-toast"
        />
        {admin && (
          <button
            onClick={handleopen}
            className="bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[90%] font-[500] text-[16px] cursor-pointer text-white"
          >
            <FaPlus className="mr-2" />
            Post a Tribute
          </button>
        )}
        <div className="flex items-center flex-col w-[90%] mt-5">
          {tributes?.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center flex-col w-[100%] mb-5"
              onClick={() => setSelectedPost(item?.id)}
            >
              <div className="flex items-center w-[100%]">
                <img
                  className="w-[40px] h-[40px] object-cover rounded-[50%]"
                  src={adminData?.profileImage?adminData?.profileImage:profile1}
                  alt={item?.title}
                />
                <p className="text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]">
                  {adminData.firstName} {adminData.lastName}
                </p>
                <GoDotFill className="text-[#5F6161] ml-2" />
                <p className="text-[#5F6161] ml-2">
                  {timeDifference(item?.timeStamp)}
                </p>
              </div>
              <div className="w-[100%] justify-start">
                <p className="text-[#5F6161] font-[600] mt-2">{item?.title}</p>
                <p className="text-[#5F6161] mt-2">{item?.description}</p>
              </div>
              <img
                className="w-[100%] h-[330px] object-cover rounded-[8px] mt-2"
                src={item?.image}
                alt="Post"
              />
              <div className="flex items-center w-[100%] mt-2">
                <div
                  className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%] cursor-pointer"
                  onClick={() => updateLikes(item)}
                >
                  <GoHeart className="text-[#062A27] text-[16px]" />
                </div>
                <p className="text-[14px] text-[#062A27] font-bold Satoshi-bold ml-2">
                  {item?.likes}
                </p>
                <p className="text-[14px] text-[#5F6161] ml-1">Likes</p>
                <div className="border ml-3 flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]">
                  <img className="w-[16px]" src={chat} alt="Chat" />
                </div>
                <p className="text-[14px] text-[#062A27] font-bold Satoshi-bold ml-2">
                  {item?.comments && typeof item?.comments === "object"
                    ? Object.values(item?.comments)?.length
                    : "0"}
                </p>
                <p className="text-[14px] text-[#5F6161] ml-1">Comments</p>
              </div>
              <div className="w-[100%] mt-2">
                <p className="text-left text-[#5F6161]">Add a comment</p>
              </div>
              <div className="w-[100%] flex justify-between items-center mt-1">
                <input
                  type="text"
                  placeholder="First Name*"
                  className=" w-[47%] outline-none border border-[#DCE5E5]  h-[40px] text-[14px] rounded-[5px] pl-1 pt-1 pr-1"
                  onChange={(e) =>
                    setCommentData({
                      ...commentData,
                      firstName: e.target.value,
                    })
                  }
                  value={
                    selectedPost === item?.id ? commentData?.firstName : ""
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className=" w-[47%] outline-none border border-[#DCE5E5]  h-[40px] text-[14px] rounded-[5px] pl-1 pt-1 pr-1"
                  onChange={(e) =>
                    setCommentData({ ...commentData, lastName: e.target.value })
                  }
                  value={selectedPost === item?.id ? commentData?.lastName : ""}
                />
              </div>
              <textarea
                type="text"
                placeholder="Write your thought here..."
                className="mt-3 w-[100%] outline-none border border-[#DCE5E5] min-h-[70px] h-[35px] text-[14px] rounded-[5px] pl-3 pt-2 pr-3"
                onChange={(e) =>
                  setCommentData({ ...commentData, comment: e.target.value })
                }
                value={selectedPost === item?.id ? commentData?.comment : ""}
              />
              <button
                className="rounded-[30px] flex border border-[#062A27] justify-center items-center h-[45px] mt-3 w-[90%] font-[1000] text-[18px] cursor-pointer text-[#062A27] opacity-[40%]"
                style={{
                  opacity:
                    commentData?.firstName &&
                    commentData?.lastName &&
                    commentData?.comment &&
                    selectedPost === item?.id
                      ? "100%"
                      : "50%",
                }}
                onClick={() => submitComment(item)}
              >
                <img src={send} className="mr-2 w-[25px]" alt="Send" />
                Submit
              </button>
              {item?.comments && typeof item?.comments === "object" && (
                <>
                  {seeMore && selectedPost === item?.id ? (
                    Object.values(item?.comments)?.map((singleComment, i) => {
                      return (
                        <div className="flex items-center justify-center flex-col bg-[#EFF7F7] rounded-[5px] mt-5 w-[100%]">
                          <div className="flex items-center justify-around pt-3 w-[100%]">
                            <img
                              className="w-[40px] h-[40px] ml-2 object-cover rounded-[50%]"
                              src={user}
                              alt=""
                            />
                            <p className="text-[13px] w-[130px]   font-bold ml-3 text-[#062A27]">
                              {truncateText(
                                singleComment?.firstName +
                                  " " +
                                  singleComment?.lastName,
                                20
                              )}
                            </p>
                            <GoDotFill className="text-[#5F6161] ml-2" />
                            <p className="text-[#5F6161]  text-[12px] ml-2">
                              {" "}
                              {timeDifference(singleComment?.timeStamp)}
                            </p>
                            <FiMoreVertical
                              onClick={(e) =>
                                handleClick(e, singleComment?.timeStamp, item)
                              }
                              className="text-[#5F6161] text-[20px] ml-5 font-bold"
                            />
                          </div>
                          <p className="pl-3 pb-3 pt-2 text-[15px] w-[70%] text-[#5F6161]">
                            {singleComment?.comment}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center flex-col bg-[#EFF7F7] rounded-[5px] mt-5 w-[100%]">
                      <div className="flex items-center justify-around  pt-3 w-[100%]">
                        <img
                          className="w-[40px] h-[40px] ml-2 object-cover rounded-[50%]"
                          src={user}
                          alt=""
                        />
                        <p className="text-[13px] font-bold w-[130px] ml-3 text-[#062A27]">
                          {truncateText(
                            Object.values(item?.comments)?.[0]?.firstName +
                              " " +
                              Object.values(item?.comments)?.[0]?.lastName,
                            20
                          )}
                        </p>
                        <GoDotFill className="text-[#5F6161]  ml-2" />
                        <p className="text-[#5F6161] text-[12px] ml-2">
                          {" "}
                          {timeDifference(
                            Object.values(item?.comments)?.[0]?.timeStamp
                          )}
                        </p>
                        <FiMoreVertical
                          onClick={(e) =>
                            handleClick(
                              e,
                              Object.values(item?.comments)?.[0]?.timeStamp,
                              item
                            )
                          }
                          className="text-[#5F6161] text-[20px] ml-5 font-bold"
                        />
                      </div>
                      <p className="pl-3 pb-3 pt-2 w-[70%] text-[15px] text-[#5F6161]">
                        {Object.values(item?.comments)?.[0]?.comment}
                      </p>
                    </div>
                  )}
                  {Object.values(item?.comments)?.length > 1 && (
                    <div
                      className="w-[100%] flex justify-end items-center text-[#062A27] cursor-pointer"
                      onClick={() => setseeMore(!seeMore)}
                    >
                      {seeMore && selectedPost === item?.id
                        ? "See Less"
                        : "See More"}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={Tribute}
        onClose={handleclose}
        aria-labelledby="add-link-modal-title"
        aria-describedby="add-link-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 340,
            bgcolor: "white",
            borderRadius: "10px",
            background: "#FFF",
            outline: "none",
            boxShadow: 24,
            maxHeight: "90vh",
            overflowY: "auto",
            fontFamily: "Satoshi",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <div className="flex items-center w-[100%] flex-col">
            <div className="flex w-[90%] justify-between items-center  mt-5">
              <div className="flex items-center">
                <img
                  onClick={handleclose}
                  className="w-[25px] h-[25px]"
                  src={back}
                />
                <p className="text-[16px] ml-3 text-[#B08655] font-bold Satoshi-bold">
                  Back to tributes
                </p>
              </div>
              <div
                onClick={handleclose}
                className="flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]"
              >
                <img className="w-[10px]" src={cross} />
              </div>
            </div>
            <div className="flex  items-center mt-5 w-[90%]">
              <img
                className="w-[40px] h-[40px] object-cover rounded-[50%]"
                src={userViewProfile?.userProfile?userViewProfile?.userProfile:profile1}
              />
              <p className="text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]">
                {userViewProfile?.firstName}
                {userViewProfile?.lastName}
              </p>
            </div>
            <div className="flex justify-start flex-col w-[90%] mt-5">
              <label className="mb-1">Title</label>
              <input
                type="text"
                className="w-[100%] outline-none border border-[#DCE5E5] h-[40px]  rounded-[5px] pl-3 pr-3"
                onChange={(e) =>
                  setTributeData({ ...tributeData, title: e.target.value })
                }
                value={tributeData?.title}
              />
            </div>
            <div className="flex justify-start flex-col w-[90%] mt-5">
              <label className="mb-1">Description</label>
              <textarea
                type="text"
                className="w-[100%] outline-none border border-[#DCE5E5] min-h-[70px] h-[40px]  rounded-[5px] pl-3 pr-3"
                onChange={(e) =>
                  setTributeData({
                    ...tributeData,
                    description: e.target.value,
                  })
                }
                value={tributeData?.description}
              />
              <div
                className="flex justify-start flex-col mt-3"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleInputChange}
                  accept="image/*"
                />
                <label className="custom-input-label" htmlFor="fileInput">
                  <input
                    type="text"
                    className="drag-drop-input"
                    placeholder="Drag and drop image here or click to upload"
                    value={inputValue}
                    readOnly
                    style={{ display: "none" }}
                  />
                </label>
                <button
                  onClick={handleLuPlusCircleClick}
                  className="outline-none border underline text-[#062A27] Satoshi-bold font-bold border-[#062A27] bg-[#F1F9F8] border-dashed h-[40px] rounded-[5px] mt-3"
                >
                  Choose File
                </button>
              </div>
                {inputValue?.name && (
    <p className='mt-2 font-bold'>Selected Image:</p>
)}
{inputValue?.name && (
    <>
        <img src={URL.createObjectURL(inputValue)} alt="Event Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
        <button
            onClick={handleRemoveImage}
            className='mt-2 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white'>
            Remove Image
        </button>
    </>
)}
              <div className="flex justify-center items-center w-[100%]">
                <p className="text-[14px] text-[#040A1B] mt-2">
                  Drag to upload photo
                </p>
              </div>
              <button
                onClick={() => addTribute()}
                className="bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[100%] font-[500] text-[16px] cursor-pointer text-white"
              >
                <img src={tick} className="mr-2 w-[20px]" />
                Publish Tribute
              </button>
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            handleDeleteCmnt(cmntTimeStamp);
            handleClose();
          }}
          className="flex items-center"
        >
          <img className="w-[20px] mr-3" src={delet} alt="delete" />
          <p className="text-[red]">Delete comment</p>
        </MenuItem>
      </Menu>
    </>
  );
}
