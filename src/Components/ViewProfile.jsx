import React, { useEffect, useState } from "react";
import menu from "../images/Hamburger menu.png";
import Notification from "../images/Notification.png";
import edit from "../images/Editbl.png";
import img from "../images/miss.jpg";
import eye from "../images/Eyewh.png";
import { IoIosMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Timeline from "./Timeline";
import CreatenewProfile from "./CreatenewProfile";
import Media from "./Media";
import profile1 from "../images/Group 661 (2).png";
import cover from "../images/Group 659 (3).png";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { RiRobot2Line } from "react-icons/ri";
import ViewtimeLine from "./ViewtimeLine";
import ViewBio from "./ViewBio";
import cross from "../images/cross.png";
import ViewMedia from "./ViewMedia";
import ViewTribute from "./ViewTribute";
import ViewDetails from "./ViewDetails";
import Share from "./Share";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setViewProfile } from "../Redux/viewProfileSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { db } from "../Firebase/firebaseConfig";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../Pages/NotFound";
import { FadeLoader } from "react-spinners";
import logo from "../images/logo.png";
import Chatbot from "./Chatbot";

export default function ViewProfile() {
  let dispatch = useDispatch();
  const { id } = useParams();
  const admin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const userViewProfile = useSelector((state) => state.viewprofile);
  let [slide, setSlide] = useState();

  let handleslide = () => {
    setSlide(true);
  };
  let handleslideclose = () => {
    setSlide(false);
  };

  const [timeline, setfavorites] = useState(false);
  const [bio, setpost] = useState(false);
  const [media, setMedallions] = useState(true);
  const [tributes, setTributes] = useState(false);
  const [destails, setDetails] = useState(false);
  const [aiAssistant, setAIAssistant] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handlefvrt = () => {
    setfavorites(true);
    setpost(false);
    setMedallions(false);
    setTributes(false);
    setDetails(false);
    setAIAssistant(false);
  };
  const handlepost = () => {
    setfavorites(false);
    setpost(true);
    setMedallions(false);
    setTributes(false);
    setDetails(false);
    setAIAssistant(false);
  };
  const handleMedallions = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(true);
    setTributes(false);
    setDetails(false);
    setAIAssistant(false);
  };
  const handletributes = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(false);
    setTributes(true);
    setDetails(false);
    setAIAssistant(false);
  };

  const handledetails = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(false);
    setTributes(false);
    setDetails(true);
    setAIAssistant(false);
  };

  const handleAIAssistant = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(false);
    setTributes(false);
    setDetails(false);
    setAIAssistant(true);
    setChatbotOpen(true);
  };

  const [filled, setFilled] = useState(
    userViewProfile?.favoriteProfile || false
  );

  useEffect(() => {
    setFilled(userViewProfile?.favoriteProfile || false);
  }, [userViewProfile]);

  const handleClick = () => {
    const newStatus = !filled;
    setFilled(newStatus);
    updateFavoriteStatus(newStatus);
  };

  const updateFavoriteStatus = (status) => {
    const updates = {};
    updates[`/Profile/${userdata?.id}/favoriteProfile`] = status;
    return update(ref(db), updates)
      .then(() => {
        if (status) {
          showSuccessToast("Medallions successfully added to favorites!");
        } else {
          showSuccessToast("Medallions successfully removed to favorites!");
        }
      })
      .catch((error) => {
        toast.error("Failed to update favorite status: " + error.message);
        setFilled(!status); // Revert the state if the update fails
      });
  };

  let [isModalOpen, setisModalOpen] = useState(false);
  let handleopenshare = () => {
    setisModalOpen(true);
  };
  let handleCloseshare = () => {
    setisModalOpen(false);
  };
  const [loading, setloading] = useState(true);
  let [userdata, setUserdata] = useState("");
  let [events, setEvents] = useState([]);
  let [imageData, setImageData] = useState([]);
  let [videoData, setVideoData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  let [audioData, setAudioData] = useState([]);

  const returnDbRef = (tabel, key, value) => {
    const dbRef = query(ref(db, tabel), orderByChild(key), equalTo(value));
    return dbRef;
  };

  const getSingleChild = () => {
    setloading(true);
    onValue(returnDbRef("Tags/", "tagId", id), async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        const thedata = Object.values(data)?.[0];
        console.log('Tag Data:', thedata);

        if (thedata.status === true && thedata.userid) {
          onValue(
            returnDbRef("Profile/", "id", thedata.userid),
            async (snapshot) => {
              const data = await snapshot.val();
              const profileData = Object.values(data)?.[0];
              console.log('Profile Data:', profileData);

              if (profileData) {
                // Ensure all cemetery fields are included
                const completeProfileData = {
                  ...profileData,
                  cemeteryName: profileData?.cemeteryName || 'Not specified',
                  cemeteryLocation: profileData?.cemeteryLocation || 'Not specified',
                  cemeteryPlot: profileData?.cemeteryPlot || 'Not specified',
                  donationsUrl: profileData?.donationsUrl || 'Not specified',
                  linkObituary: profileData?.linkObituary || 'Not specified',
                  linkTitle: profileData?.linkTitle || 'Not specified',
                  linkUrl: profileData?.linkUrl || 'Not specified',
                  linkThumbnail: profileData?.linkThumbnail || 'Not specified'
                };

                setUserdata(completeProfileData);
                dispatch(setViewProfile(completeProfileData));
                if (completeProfileData?.timeline) {
                  setEvents(Object.values(completeProfileData?.timeline));
                } else {
                  setEvents([]);
                }
                if (completeProfileData?.imageMedia) {
                  setImageData(Object.values(completeProfileData?.imageMedia));
                } else {
                  setImageData([]);
                }
                if (completeProfileData.videoMedia) {
                  setVideoData(Object.values(completeProfileData.videoMedia));
                } else {
                  setVideoData([]);
                }
                if (completeProfileData.voiceMedia) {
                  setAudioData(Object.values(completeProfileData.voiceMedia));
                } else {
                  setAudioData([]);
                }
                setloading(false);
              } else {
                navigate(`/`);
              }
            }
          );
        } else {
          navigate(`/home`);
          sessionStorage.setItem("tempTag", id);
        }
      } else {
        onValue(returnDbRef("Profile/", "id", id), async (snapshot) => {
          const data = await snapshot.val();
          if (data) {
            const thedata = Object.values(data)?.[0];
            if (thedata) {
              setUserdata(thedata);
              dispatch(setViewProfile(thedata));
              if (thedata?.timeline) {
                setEvents(Object.values(thedata?.timeline));
              } else {
                setEvents([]);
              }
              if (thedata?.imageMedia) {
                setImageData(Object.values(thedata?.imageMedia));
              } else {
                setImageData([]);
              }
              if (thedata.videoMedia) {
                setVideoData(Object.values(thedata.videoMedia));
              } else {
                setVideoData([]);
              }
              if (thedata.voiceMedia) {
                setAudioData(Object.values(thedata.voiceMedia));
              } else {
                setAudioData([]);
              }
              setloading(false);

              if (checkIfAdded) {
                const starCountRef = ref(db, `Profile/${id}`);
                onValue(starCountRef, async (snapshot) => {
                  const data = await snapshot.val();
                  if (data) {
                    setUserdata(data);
                    dispatch(setViewProfile(data));
                    if (data?.timeline) {
                      setEvents(Object.values(data?.timeline));
                    } else {
                      setEvents([]);
                    }
                    if (data?.imageMedia) {
                      setImageData(Object.values(data?.imageMedia));
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
                    setloading(false);
                  } else {
                    setloading(false);
                    setNotFound(true);
                  }
                });
              } else {
                setNotFound(true);
              }
            } else {
              navigate("/");
            }
          } else {
            navigate("/");
          }
        });
      }
    });
  };
  useEffect(() => {
    getSingleChild();
  }, []);

  const showSuccessToast = (message) => {
    toast.dismiss();
    toast.success(message);
  };
  const shareUrl = window.location.href;
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share your Sentiments profile",
          text: `I wanted to share something meaningful with you all I've recently created a Memorial on Sentiments for our beloved ${
            userViewProfile?.firstName + " " + userViewProfile?.lastName
          }, and I would be deeply grateful if you could take a moment to share any memories or anecdotes you have of them. You contributions will help us honour their memory and keep their spirit alive in our hearts.`,
          url: shareUrl,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  console.log(userViewProfile);
  return loading ? (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <FadeLoader color="#062A27" />
    </div>
  ) : (
    <>
      <div className="flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative">
        {slide && (
          <div className="h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 ">
            {" "}
          </div>
        )}
        <div className="flex justify-center items-center w-[90%] mt-5">
          <div className="flex justify-start  flex-col ">
            {/* <p className="text-[14px] text-[#062A27]  orelega-one-regular">
              The
            </p>
            <p className="text-[16px] text-[#062A27] mt-[-5px] flex ">
              <p className="orelega-one-regular text-[20px]">Sentiments Co.</p>{" "}
              &trade;
            </p> */}
            <img className="h-[45px] w-[240px] object-cover" src={logo} />
          </div>
        </div>
        <div className="flex  items-center flex-col w-[90%] rounded-[22px] mt-5  bg-white">
          <div className="w-[100%] h-[216px] flex justify-center items-center relative ">
            <img
              className="rounded-[10px] w-[100%] h-[100%]"
              src={
                userViewProfile?.coverImage
                  ? userViewProfile?.coverImage
                  : cover
              }
            />
            <div className=" flex justify-center items-center  w-[100%]  absolute bottom-[-60px] ">
              <div className=" flex justify-center items-center  w-[114px] h-[114px]  realtive ">
                <img
                  className="w-[114px] h-[114px] border-4 border-white object-cover rounded-[50%]"
                  src={
                    userViewProfile?.userProfile
                      ? userViewProfile?.userProfile
                      : profile1
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-[95%] mt-3 z-30">
            {admin && (
              <div className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]">
                <>
                  {userViewProfile?.favoriteProfile ? (
                    <GoHeartFill
                      className="text-[#062A27] text-[20px]"
                      onClick={() => handleClick()}
                    />
                  ) : (
                    <GoHeart
                      className="text-[#062A27] text-[20px]"
                      onClick={() => handleClick()}
                    />
                  )}
                </>
              </div>
            )}
            <div
              onClick={handleShare}
              className="border ml-3 flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]"
            >
              <RiShareForwardLine className="text-[#062A27] text-[20px]" />
            </div>
          </div>
          <p className="text-[#5F6161] text-[13px] mt-[25px]">
            {userViewProfile?.headingText}
          </p>
          <h1 className="text-[16px] font-bold Satoshi-bold mt-1 text-[#062A27]">
            {userViewProfile?.firstName} {userViewProfile?.lastName}
          </h1>
          <h1 className="text-[14px] font-bold  mt-1 text-[#062A27]">
            {userViewProfile?.birthDate === "Invalid Date"
              ? ""
              : userViewProfile?.birthDate}{" "}
            {userViewProfile?.deathDate === "Invalid Date" ? "" : "-"}{" "}
            {userViewProfile?.deathDate === "Invalid Date"
              ? ""
              : userViewProfile?.deathDate}
          </h1>
          <div className="w-[100%] rounded-[20px]  bg-white flex  mt-4 items-center flex-col">
            <div className="flex justify-between items-center w-[100%] border-b overflow-x-scroll ">
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handleMedallions}
                style={
                  media
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                Media
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handlefvrt}
                style={
                  timeline
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                Timeline
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handlepost}
                style={
                  bio
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                Bio
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handletributes}
                style={
                  tributes
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                Tributes
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handledetails}
                style={
                  destails
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                Details
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161] flex items-center justify-center"
                onClick={handleAIAssistant}
                style={
                  aiAssistant
                    ? {
                        borderBottom: "2px solid black",
                        color: "#062A27",
                        fontFamily: "Satoshi-bold",
                      }
                    : {}
                }
              >
                <RiRobot2Line className="text-[22px] hover:scale-110 transition-transform" title="AI Assistant" />
              </p>
            </div>
            {timeline && <ViewtimeLine events={events} loading={false} />}
            {bio && <ViewBio userViewProfile={userViewProfile} />}
            {media && (
              <ViewMedia
                handleslideclose={handleslideclose}
                imageData={imageData}
                audioData={audioData}
                videoData={videoData}
                userViewProfile={userViewProfile}
                id={userdata?.id}
              />
            )}
            {tributes && (
              <ViewTribute
                userViewProfile={userViewProfile}
                id={userdata?.id}
              />
            )}
            {destails && <ViewDetails userViewProfile={userViewProfile} />}
            {aiAssistant && (
              <div className="w-full p-4">
                {console.log('ViewProfile - userViewProfile:', userViewProfile)}
                <Chatbot 
                  isActive={true}
                  userProfile={userViewProfile}
                />
              </div>
            )}
            <br></br>
          </div>
          <br></br>
        </div>
        <br></br>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseshare}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "white",
            borderRadius: "10px",
            background: "#FFF",
            outline: "none",
            boxShadow: 24,
            maxHeight: "600px",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <div className="flex justify-end w-[90%] mt-3">
            <div
              onClick={handleCloseshare}
              className="flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]"
            >
              <img className="w-[10px]" src={cross} />
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 w-[100%]">
            <Share toast={toast} />
          </div>
          <br></br>
        </Box>
      </Modal>
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
    </>
  );
}
