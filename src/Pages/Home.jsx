import React, { useEffect, useState } from "react";
import menu from "../images/Hamburger menu.png";
import Notification from "../images/Notification.png";
import profile1 from "../images/Group 661 (2).png";
import edit from "../images/Edit.png";
import email from "../images/email.png";
import Location from "../images/Location.png";
import calender from "../images/Calendar.png";
import Medallio from "../Components/Medallions";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/Sidebar";
import Myfavorites from "../Components/Myfavorites";
import Posts from "../Components/Posts";
import MyaccountEdit from "../Components/MyaccountEdit";
import { useParams } from "react-router-dom";
import { onValue, ref, update } from "firebase/database";
import { db, storage } from "../Firebase/firebaseConfig";
import Cropper from "../Components/Cropper";
import { GrSubtract } from "react-icons/gr";
import { RiSubtractLine } from "react-icons/ri";
import { getDownloadURL, uploadString, ref as sRef } from "firebase/storage";
import { Box, Button, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { ClipLoader, FadeLoader } from "react-spinners";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/userSlice";
export default function Home() {
  let dispatch = useDispatch();

  const userdata = useSelector((state) => state.user);

  const [favorites, setfavorites] = useState(false);
  const [navigate, setnavigate] = useState({
    fav: true,
    post: false,
  });

  const [post, setpost] = useState(false);
  const [btnloader, setBTnloader] = useState(false);
  const [Medallions, setMedallions] = useState(true);
  const [account, setaccount] = useState(false);
  let [slide, setSlide] = useState();
  const handlefvrt = () => {
    setfavorites(true);
    setpost(false);
    setMedallions(false);
    setaccount(false);
  };
  const handlepost = () => {
    setfavorites(false);
    setpost(true);
    setMedallions(false);
    setaccount(false);
  };
  const handleMedallions = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(true);
    setaccount(false);
  };
  const handleaccount = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(false);
    setaccount(true);
    setSlide(false);
  };

  let handleslide = () => {
    setSlide(!slide);
  };
  let handleslideclose = () => {
    setSlide(false);
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/home/myAccount") {
      setfavorites(false);
      setpost(false);
      setMedallions(false);
      setaccount(true);
      setSlide(false);
    }
  }, []);

  let currentUser = localStorage.getItem("userId");
  let [userData, setUserdata] = useState({});
  const [loading, setloading] = useState(true);
  const getSingleChild = () => {
    setloading(true);
    const starCountRef = ref(db, `User/${currentUser}`);

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setUserdata(data);
      setloading(false);
    });
  };
  useEffect(() => {
    getSingleChild();
  }, []);

  dispatch(setUser(userData));
  let [cropModal, setcropModal] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState("");
  let [myprflimg, setmyprflimg] = useState(null);
  const [key, setKey] = useState("");
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const handleclosecropper = () => {
    setcropModal(false);
  };
  let [tempimg, settempimg] = useState(null);

  let handleImageChange = (event) => {
    // profileImage
    setProfile("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setProfile(reader.result);
        setKey(key + 1);
        setcropModal(true);
      });
    } else {
      // If no file selected (e.g., user canceled cropping), clear the input field
      event.target.value = null;
    }
  };
  let [removeprofile, setRemoveprofile] = useState(false);
  let handleopenremove = () => {
    setRemoveprofile(!removeprofile);
  };
  const handleremoveimg = async (event) => {
    event.preventDefault();
    setBTnloader(true);
    update(ref(db, `User/${currentUser}`), {
      profileImage: "",
    })
      .then(() => {
        setProfileImage("");
        handleCloseshare();
        handleopenremove();
        setBTnloader(false);
        toast.success("Profile picture remove successfuly!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setBTnloader(true);
    let returnIfHttps = (string) => {
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

    if (returnIfHttps(tempimg) === false) {
      let name = "profileimg" + currentUser;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, tempimg.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `User/${currentUser}`), { profileImage: URL });
              setProfileImage("");
              handleCloseshare();
              setBTnloader(false);
              toast.success("Profile picture change successfuly!");
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  let [isModalOpen, setisModalOpen] = useState(false);

  let handleopenshare = () => {
    setisModalOpen(true);
  };
  let handleCloseshare = () => {
    setisModalOpen(false);
  };

  return loading ? (
    <div className="w-[100%] h-[100vh] flex justify-center  items-center ">
      <FadeLoader color="#062A27" />
    </div>
  ) : (
    <>
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={profile}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={settempimg}
        isCircle={true}
        handleFormSubmit={handleopenshare}
      />

      <div className="flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative">
        {slide && (
          <div className="h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 ">
            {" "}
          </div>
        )}
        {slide && (
          <div className="flex  justify-start w-[100%] flex-col  ">
            <Sidebar
              handleslideclose={handleslideclose}
              handleaccount={handleaccount}
              setaccount={setaccount}
            />
          </div>
        )}
        <div className="flex justify-between items-center w-[90%] mt-5">
          <div
            onClick={handleslide}
            className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]"
          >
            <img className="w-[24px] " src={menu} />
          </div>
          <div className="flex justify-start  flex-col ">
            <p className="text-[14px] text-[#062A27]  orelega-one-regular">
              The
            </p>
            <p className="text-[16px] text-[#062A27] mt-[-5px] flex ">
              <p className="orelega-one-regular text-[20px]">Sentiments Co.</p>{" "}
              &trade;
            </p>
          </div>
          <div className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]">
            <img className="w-[24px] " src={Notification} />
          </div>
        </div>
        <div className="flex  items-center  w-[90%] mt-8 ">
          <div className="w-[120px] h-[120px]  rounded-[50%] relative">
            {userdata?.profileImage && (
              <div
                onClick={handleopenremove}
                className="  rounded-full w-[20px]  h-[20px] absolute top-[5px] right-[14px] flex justify-center items-center text-sm font-[1500] text-white bg-red-600"
              >
                <RiSubtractLine />
              </div>
            )}
            <label
              htmlFor="img"
              className="w-[0px] h-[0px] absolute  top-1 left-[86px]"
            >
              {!userdata?.profileImage && (
                <div className=" border rounded-full w-[22px] h-[22px] flex justify-center  text-sm font-[1500] text-white bg-[#062A27]">
                  +
                </div>
              )}

              <input
                key={key}
                type="file"
                name="img"
                id="img"
                className="opacity-0 w-[0px] h-[0px]"
                onChange={handleImageChange}
              />
            </label>
            <img
              src={userdata?.profileImage ? userdata?.profileImage : profile1}
              className="rounded-full border-[3px] border-[white] w-[120px] h-[120px]"
            />
          </div>

          <div className="flex justify-start  items-start flex-col w-[59%] ml-5">
            <h1 className="font-[600] text-[20px] text-black  mt-1 Satoshi-bold ">
              {userdata?.firstName} {userdata?.lastName}
            </h1>
            <div className="flex items-center justify-center mt-3">
              <img width={15} src={email} />
              <p className="ml-1 text-[14px]">{userdata?.email}</p>
            </div>
            {/* <div className='flex items-center justify-center mt-3'>
    <img width={15} src={Location}/>
    <p className='ml-1 text-[14px]'>{userdata?.city} {userdata?.state?",":""} {userdata?.state}</p>
    </div> */}
          </div>
        </div>

        <div className="w-[90%]  rounded-[20px] border  bg-white flex  mt-8 items-center flex-col">
          <div className="flex justify-between items-center w-[100%] border-b overflow-x-scroll ">
            <p
              className="p-3 whitespace-nowrap cursor-pointer text-[#5F6161] "
              onClick={handlefvrt}
              style={
                favorites
                  ? {
                      borderBottom: "2px solid black",
                      color: "#062A27",
                      fontFamily: "Satoshi-bold",
                    }
                  : {}
              }
            >
              My favorites
            </p>
            <p
              className="p-3 cursor-pointer text-[#5F6161]"
              onClick={handlepost}
              style={
                post
                  ? {
                      borderBottom: "2px solid black",
                      color: "#062A27",
                      fontFamily: "Satoshi-bold",
                    }
                  : {}
              }
            >
              Posts
            </p>
            <p
              className="p-3 cursor-pointer text-[#5F6161]"
              onClick={handleMedallions}
              style={
                Medallions
                  ? {
                      borderBottom: "2px solid black",
                      color: "#062A27",
                      fontFamily: "Satoshi-bold",
                    }
                  : {}
              }
            >
              Medallions
            </p>
            <p
              className="p-3 cursor-pointer whitespace-nowrap text-[#5F6161]"
              onClick={handleaccount}
              style={
                account
                  ? {
                      borderBottom: "2px solid black",
                      color: "#062A27",
                      fontFamily: "Satoshi-bold",
                    }
                  : {}
              }
            >
              My account
            </p>
          </div>
          {Medallions && <Medallio toast={toast} />}
          {favorites && <Myfavorites toast={toast} />}
          {post && <Posts toast={toast} userdata={userdata} />}
          {account && <MyaccountEdit toast={toast} />}
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
            width: 340,
            bgcolor: "white",
            borderRadius: "10px",
            background: "#f0f0f0",
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
              <IoClose />
            </div>
          </div>

          <div className="flex justify-center items-center w-[90%] mt-2 flex-col">
            <p className="text-center mb-1">
              Are you sure you want to change profile picture?
            </p>
            <div mt={2} className="flex w-[100%] justify-center mt-1">
              <button
                className="border-[#062A27] border text-[#062A27] rounded-[30px] w-[35%] h-[35px] flex justify-center items-center "
                onClick={handleCloseshare}
              >
                No
              </button>
              <button
                className="bg-[#062A27] text-[white] rounded-[30px] w-[35%] h-[35px] ml-3  flex justify-center items-center "
                onClick={handleFormSubmit}
              >
                {btnloader ? (
                  <div cla>
                    <ClipLoader size={20} color="#ffffff" className="mt-2" />
                  </div>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>

          <br></br>
        </Box>
      </Modal>
      <Modal
        open={removeprofile}
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
            width: 340,
            bgcolor: "white",
            borderRadius: "10px",
            background: "#f0f0f0",
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
              onClick={handleopenremove}
              className="flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]"
            >
              <IoClose />
            </div>
          </div>

          <div className="flex justify-center items-center w-[90%] mt-2 flex-col">
            <p className="text-center mb-1">
              Are you sure you want to remove profile picture?
            </p>
            <div mt={2} className="flex w-[100%] justify-center mt-1">
              <button
                className="border-[#062A27] border text-[#062A27] rounded-[30px] w-[35%] h-[35px] flex justify-center items-center "
                onClick={handleopenremove}
              >
                No
              </button>
              <button
                className="bg-[#062A27] text-[white] rounded-[30px] w-[35%] h-[35px] ml-3 flex justify-center items-center "
                onClick={handleremoveimg}
              >
                {btnloader ? (
                  <div cla>
                    <ClipLoader size={20} color="#ffffff" className="mt-2" />
                  </div>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
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
