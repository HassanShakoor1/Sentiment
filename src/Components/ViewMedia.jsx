import React, { useEffect, useState } from "react";
import media from "../images/Video playlist.png";
import img1 from "../images/miss.jpg";
import chat from "../images/Chat.png";
import img2 from "../images/imgg (1).jpg";
import img3 from "../images/imgg (2).jpg";
import img4 from "../images/imgg (3).jpg";
import img5 from "../images/imgg (4).jpg";
import AudioPlayer from "react-h5-audio-player";
import smile from "../images/Smiling.png";
import send from "../images/Send message.png";
import comnt from "../images/comnt.png";
import profile1 from "../images/Group 661 (2).png";
import InputEmoji from "react-input-emoji";
import { Slide } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FiMoreVertical } from "react-icons/fi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import editb from "../images/editb.png";
import delet from "../images/Delete Bin 4.png";
import ReactPlayer from "react-player";
import EmojiPicker from "emoji-picker-react";
import { useNavigate, useParams } from "react-router-dom";
import { get, ref, remove, set, update } from "firebase/database";
import { db } from "../Firebase/firebaseConfig";
import user from "../images/Ellipse 2723 (1).png";
import { Slide as slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function ViewMedia({
  userViewProfile,
  imageData,
  videoData,
  audioData,
  id,
}) {
  const [slide, setSlide] = useState(false);
  const [singleImage, setSingleImage] = useState();
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(false);
  const [voice, setVoice] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [tempCmt, setTempCmt] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSlide = (imageData) => {
    setSlide(true);
    setSingleImage(imageData);
    const comments = imageData?.comments || [];
    setComments(comments);
  };

  const handleSlideClose = () => {
    setSlide(false);
    setTempCmt([]);
  };
  const [cmntTimeStamp, setCmntTimeStamp] = useState("");
  const handleClick = (event, timeStamp) => {
    setAnchorEl(event.currentTarget);
    setCmntTimeStamp(timeStamp);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImage = () => {
    setImage(true);
    setVoice(false);
    setVideo(false);
  };

  const handleVideo = () => {
    setImage(false);
    setVideo(true);
    setVoice(false);
  };

  const handleVoice = () => {
    setImage(false);
    setVideo(false);
    setVoice(true);
  };

  const handleAddComment = (comment) => {
    if (comment.comment && comment.name) {
      setTempCmt([...tempCmt, comment]);
      const profileRef = ref(
        db,
        `/Profile/${id}/imageMedia/${singleImage?.id}`
      );

      get(profileRef)
        .then((snapshot) => {
          const imageData = snapshot.val() || {};
          const updatedData = {
            ...imageData,
            comments: [...(imageData.comments || []), comment],
          };
          const updates = {};
          updates[`/Profile/${id}/imageMedia/${singleImage?.id}`] = updatedData;

          return update(ref(db), updates);
        })
        .then(() => {
          toast.success("Comment added successfully");
          setTimeout(function () {
            handleSlideClose();
          }, 1500);
          setText("");
          setName("");
        })
        .catch((error) => {
          toast.error("Failed to add comment: " + error.message);
        });
    } else {
      toast.error("All fields are required");
    }
  };

  const handleOnEnter = (text) => {
    // Add any necessary functionality here
  };
  const currentUser = localStorage.getItem("userId");

  let updateCmnt = () => {
    if (tempCmt?.length > 2) {
      setTempCmt([]);
      handleSlideClose();
    }
  };

  const handleDeleteCmnt = (timeStamp) => {
    const postRef = ref(
      db,
      `Profile/${id}/imageMedia/${singleImage?.id}/comments`
    );
    get(postRef).then((snapshot) => {
      const posts = snapshot.val();

      if (posts) {
        let remainingComnt = posts.filter((elm) => {
          return elm.timeStamp != timeStamp;
        });

        set(
          ref(db, `Profile/${id}/imageMedia/${singleImage?.id}/comments`),
          remainingComnt
        ).then(() => {
          let remainingComments = comments.filter((elm) => {
            return elm.timeStamp != timeStamp;
          });
          setComments(remainingComments);
          let remainingtmp = tempCmt.filter((elm) => {
            return elm.timeStamp != timeStamp;
          });
          console.log(remainingtmp);
          setTempCmt(remainingtmp);
        });
      }
    });
  };

  return (
    <>
      <div className="w-[100%] rounded-[20px] bg-white flex mt-2 items-center flex-col">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={slide}
          toastClassName="custom-toast"
        />
        <div className="flex justify-evenly items-center w-[100%] border-b overflow-x-scroll">
          <p
            className="p-3 whitespace-nowrap cursor-pointer text-[#5F6161]"
            onClick={handleImage}
            style={
              image ? { borderBottom: "2px solid black", color: "#062A27" } : {}
            }
          >
            Image
          </p>
          <p
            className="p-3 cursor-pointer text-[#5F6161]"
            onClick={handleVideo}
            style={
              video ? { borderBottom: "2px solid black", color: "#062A27" } : {}
            }
          >
            Video
          </p>
          <p
            className="p-3 cursor-pointer text-[#5F6161]"
            onClick={handleVoice}
            style={
              voice ? { borderBottom: "2px solid black", color: "#062A27" } : {}
            }
          >
            Voice
          </p>
        </div>
        {image && (
          <>
            {imageData.length === 0 ? (
              <div className="flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]">
                <img className="w-[70px]" src={media} alt="No media found" />
                <h1 className="font-bold text-[16px] mt-3">No media found</h1>
                <p className="text-[#5F6161] text-[13px] w-[70%] text-center mt-3">
                  No media has been added yet in collection
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-wrap w-[90%] mt-3">
                {imageData.map((img, index) => (
                  <div
                    key={index}
                    id={img.id}
                    className="w-[47%] mt-5 h-[180px] relative rounded-[8px]"
                  >
                    <img
                      className="w-[100%] h-[180px] object-cover rounded-[8px]"
                      src={img.mediaImage}
                      alt={`Image ${index}`}
                    />
                    <div
                      onClick={() => handleSlide(img)}
                      className="flex justify-center items-center w-[30px] h-[30px] bottom-2 right-2 rounded-[50%] border bg-[black] bg-opacity-50 absolute border-[white]"
                    >
                      <img className="w-[18px]" src={chat} alt="Chat Icon" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {video && (
          <>
            {videoData.length === 0 ? (
              <div className="flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]">
                <img className="w-[70px]" src={media} alt="No media found" />
                <h1 className="font-bold text-[16px] mt-3">No media found</h1>
                <p className="text-[#5F6161] text-[13px] w-[70%] text-center mt-3">
                  No media has been added yet in collection
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-wrap w-[90%] mt-3">
                {videoData.map((vid, index) => (
                  <div
                    key={index}
                    className="w-[100%] mt-5 h-[180px] relative rounded-[8px]"
                  >
                    <ReactPlayer
                      url={vid.videoLink}
                      width="100%"
                      height="180px"
                      style={{ borderRadius: "8px", overflow: "hidden" }}
                      controls={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {voice && (
          <>
            {audioData.length === 0 ? (
              <div className="flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]">
                <img className="w-[70px]" src={media} alt="No media found" />
                <h1 className="font-bold text-[16px] mt-3">No media found</h1>
                <p className="text-[#5F6161] text-[13px] w-[70%] text-center mt-3">
                  No media has been added yet in collection
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-wrap w-[90%] mt-3">
                {audioData.map((audio, index) => (
                  <div
                    key={index}
                    className="w-[100%] mt-5 relative rounded-[8px]"
                  >
                    <AudioPlayer
                      src={audio.mediaVoice}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Slide
        in={slide}
        direction="up"
        timeout={{ appear: 500, enter: 500, exit: 500 }}
      >
        <div className="slide_main_div relative">
          <div className="title_and_icon_main">
            <div
              className="close absolute top-[15px] bg-white flex justify-center items-center right-2 h-[30px] w-[30px] rounded-[50%]"
              onClick={handleSlideClose}
            >
              <IoIosClose style={{ fontSize: "35px" }} />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-[100%]">
            <div className="flex justify-start flex-col w-[90%]">
              <div className="flex justify-start items-center w-[100%] mt-5">
                <img
                  className="w-[50px] h-[50px] border-2 border-[#B08655] object-cover rounded-[50%]"
                  src={userViewProfile?.userProfile?userViewProfile?.userProfile:profile1}
                />
                <p className="text-[16px] font-bold Satoshi-bold ml-3 border-b-2 border-[#B08655] text-[#B08655] ">
                  {userViewProfile?.firstName} {userViewProfile?.lastName}
                </p>
              </div>
              <p className="text-[16px] font-bold Satoshi-bold mt-5 text-[#062A27]  ">
                {singleImage?.imageTitle}
              </p>
              <p className="text-[15px] mt-2 text-[#5F6161]">
                {singleImage?.imageDes}
              </p>
            </div>
            <p className="text-[#062A27] mt-5 w-[100%] p-2 flex justify-center items-center border-t border-b border-[#D4E2E2]">
              COMMENTS
            </p>

            {comments.length == 0 && tempCmt.length === 0 && (
              <div className="w-[100%] flex justify-center items-center flex-col mt-5 ">
                <img className="w-[60px]" src={comnt} />
                <p className="text-[#062A27] text-[16px] font-bold Satoshi-bold mt-1">
                  This post has no comments yet
                </p>
                <p className="w-[50%] mt-1 text-[14px] text-[#5F6161] text-center">
                  Share your opinion and leave a comment below
                </p>
              </div>
            )}

            <div className="flex  items-center flex-col sm:h-[160px] h-[250px] overflow-y-scroll w-[90%] mt-5 ">
              {tempCmt.map(
                (tempCmt, index) =>
                  tempCmt.comment &&
                  tempCmt.name && (
                    <div
                      key={index}
                      className="w-[100%] flex flex-col items-center"
                    >
                      <div className="flex justify-between items-center w-[100%]">
                        <div className="flex items-center">
                          <img
                            className="w-[40px] h-[40px] object-cover rounded-[50%]"
                            src={user}
                            alt={tempCmt.name}
                          />
                          <p className="text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]">
                            {tempCmt.name}
                          </p>
                          <GoDotFill className="text-[#5F6161] ml-2" />
                          <p className="text-[#5F6161] ml-2">{tempCmt.date}</p>
                        </div>
                        <FiMoreVertical
                          onClick={handleClick}
                          className="text-[#5F6161] text-[20px] font-bold"
                        />
                      </div>

                      <div className="w-[100%] flex items-center">
                        <p className="ml-[50px] text-[#5F6161] text-[14px] ">
                          {tempCmt.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}

              {comments.map((item, index) => (
                <div
                  key={index}
                  className="w-[100%] flex flex-col items-center"
                >
                  <div
                    key={index}
                    className="flex justify-between items-center w-[100%]"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-[40px] h-[40px] object-cover rounded-[50%]"
                        src={user}
                        alt={item.name}
                      />
                      <p className="text-[16px] font-bold Satoshi-bold ml-3 text-[#062A27]">
                        {item.name}
                      </p>
                      <GoDotFill className="text-[#5F6161] ml-2" />
                      <p className="text-[#5F6161] ml-2">{item.date}</p>
                    </div>
                    {currentUser && (
                      <FiMoreVertical
                        onClick={(e) => handleClick(e, item.timeStamp)}
                        className="text-[#5F6161] text-[20px] font-bold"
                      />
                    )}
                  </div>

                  <div className="w-[100%] flex items-center">
                    <p className="ml-[50px] text-[#5F6161] text-[14px] ">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[90%] absolute bottom-[60px] flex   items-center  mt-[42px]">
            <input
              type="text"
              placeholder="Name"
              className="w-[78%] h-[44px] text-[14px] outline-none border rounded-full ml-[10px] pl-[10px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-[90%] h-[50px] absolute bg-[white] bottom-0 items-center ">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Add a comment...."
              className="w-[80%] text-[14px] outline-none border-none"
            />
            <img
              onClick={() => {
                text && name
                  ? handleAddComment({
                      userId: userId,
                      name,
                      comment: text,
                      timeStamp: new Date().toISOString(),
                    })
                  : () => {
                      console.log("error");
                    };
              }}
              className="w-[30px] cursor-pointer"
              style={{ opacity: text && name ? "100%" : "50%" }}
              src={send}
              alt="send"
            />
          </div>
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
