import React, { useEffect, useState } from "react";
import menu from "../images/Hamburger menu.png";
import Notification from "../images/Notification.png";
import cover from "../images/Group 659 (3).png";
import Fade from "@mui/material/Fade";
import edit from "../images/Editbl.png";
import profile1 from "../images/Group 661 (2).png";
import delet from "../images/Delete Bin 4.png";
import img from "../images/miss.jpg";
import eye from "../images/Eyewh.png";
import { IoIosMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Timeline from "./Timeline";
import CreatenewProfile from "./CreatenewProfile";
import Media from "./Media";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaDeleteLeft } from "react-icons/fa6";
import logo from "../images/logo.png";
import Modal from "@mui/material/Modal";
import cross from "../images/cross.png";
import back from "../images/Frame 1171277120.png";
import Box from "@mui/material/Box";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { IoChevronBack, IoClose } from "react-icons/io5";
import CreateEditprofile from "./CreateEditprofile";
import Cropper from "./Cropper";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
  update,
} from "firebase/database";
import { db, storage } from "../Firebase/firebaseConfig";
import { RiSubtractLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { getDownloadURL, uploadString, ref as sRef } from "firebase/storage";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../Redux/profileSlice";
import Tribute from "./Tribute";
import { BsQrCode } from "react-icons/bs";

export default function Editprofile() {
  let dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  const [privacy, setPrivacy] = useState("public");
  const [mytag, setMyTag] = useState("");

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [timeline, setfavorites] = useState(true);
  const [bio, setpost] = useState(false);
  const [media, setMedallions] = useState(false);
  const [tributes, setTributes] = useState(false);
  const [btnloader, setBTnloader] = useState(false);
  const [coverimage, setCoverImage] = useState("");

  const handlefvrt = () => {
    setfavorites(true);
    setpost(false);
    setMedallions(false);
    setTributes(false);
  };
  const handlepost = () => {
    setfavorites(false);
    setpost(true);
    setMedallions(false);
    setTributes(false);
  };
  const handleMedallions = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(true);
    setTributes(false);
  };
  const handleTributes = () => {
    setfavorites(false);
    setpost(false);
    setMedallions(false);
    setTributes(true);
  };
  const nevigate = useNavigate();
  const handleNavigateview = (user) => {
    if (user?.status === "Verified" && user?.tagId) {
      nevigate(`/viewprofile/${user?.tagId}`);
    } else {
      nevigate(`/viewprofile/${user?.id}`);
    }
  };
  let [slide, setSlide] = useState();
  let handleslide = () => {
    setSlide(!slide);
  };
  let handleslideclose = () => {
    setSlide(false);
  };
  const [deleteopen, setdelete] = useState(false);

  const handleOpendelete = () => {
    setdelete(true);
    setAnchorEl(null);
  };

  const handleClosedelete = () => {
    setdelete(false);
  };

  const handleDeleteProfile = () => {
    setdelete(false);
  };
  const [status, setstatus] = useState(false);

  const handleClosestatus = () => {
    setstatus(false);
  };
  const { id } = useParams();

  let [userdata, setUserdata] = useState("");
  const getSingleChild = () => {
    const starCountRef = ref(db, `Profile/${id}`);

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setUserdata(data);
      dispatch(setUserProfile(data));
    });
  };
  useEffect(() => {
    getSingleChild();
    
  }, []);

  console.log(userdata);

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
  //cover img
  let [cropModal1, setcropModal1] = useState(false);
  let [myprflimg1, setmyprflimg1] = useState(null);
  let [cropPrfl1, setCropPrfl1] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const handleclosecropper = () => {
    setcropModal1(false);
    setcropModal(false);
  };
  const [cover1, setcover] = useState("");
  let handleCoverImageChange = (event) => {
    // profileImage
    setcover("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setcover(reader.result);
        setKey(key + 1);
        // dispatch(setProfileImg(reader.result))

        setcropModal1(true);
      });
    }
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
  let [removecover, setRemovecover] = useState(false);
  let handleopenremoveCover = () => {
    setRemovecover(!removecover);
  };
  const handleremoveCoverimg = async (event) => {
    event.preventDefault();
    setBTnloader(true);
    update(ref(db, `Profile/${id}`), {
      coverImage: "",
    })
      .then(() => {
        setCoverImage("");
        handleCloseshare();
        handleopenremoveCover();
        setBTnloader(false);
        toast.success("Cover image remove successfuly!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleremoveimg = async (event) => {
    event.preventDefault();
    setBTnloader(true);
    update(ref(db, `Profile/${id}`), {
      userProfile: "",
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
      let name = "userrprofileimg" + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, tempimg.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Profile/${id}`), { userProfile: URL });
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

  const handlecoverupload = async (event) => {
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

    if (returnIfHttps(coverimage) === false) {
      let name = "userCoverImg" + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, coverimage.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Profile/${id}`), { coverImage: URL });
              handleCloseshare();
              setBTnloader(false);
              toast.success("Cover image change successfuly!");
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
    setisModalcover(false);
  };
  let [isModalcover, setisModalcover] = useState(false);

  let handleopencover = () => {
    setisModalcover(true);
  };
  const [showModal, setShowModal] = useState(false);
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === "Active") {
      setShowModal(true);
    } else {
      setUserdata({ ...userdata, status: newStatus });
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = async () => {
    try {
      await remove(ref(db, `Profile/${id}`));
      toast.success("Profile deleted successfully");
      nevigate("/home");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.warn("Error deleting profile");
    }
  };
  const handleUpdateUser = async () => {
    try {
      await update(ref(db, `Profile/${id}`), {
        ...userdata,
      });
      toast.success("Profile type updated successfully.");
      handleClosestatus();
    } catch (error) {
      console.log("Error updating user data: ", error);
    }
  };

  const assignNewTag = () => {
    if (!mytag) {
      toast.error("Code should not be empty");
      setBTnloader(false);
      return;
    }
    const findtagRef = query(
      ref(db, "Tags/"),
      orderByChild("tagId"),
      equalTo(mytag)
    );
    onValue(findtagRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        const tagData = Object.values(data)?.[0];
        if (tagData && tagData?.status === false && !tagData?.userid) {
          update(ref(db, `Profile/${id}`), {
            tags: userdata?.tags ? [...userdata?.tags, mytag] : [mytag],
          }).then(() => {
            update(ref(db, `Tags/${tagData?.id}`), {
              status: true,
              userid: id,
            }).then(() => {
              toast.success("QR assigned successfuly");
              setMyTag("");
            });
          });
        }
      } else {
        toast.error("QR not found");
      }
    });
  };
  return (
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
      <Cropper
        cropModal={cropModal1}
        handleclosecropper={handleclosecropper}
        theimg={cover1}
        myimg={myprflimg1}
        setmyimg={setmyprflimg1}
        setcrop={setCropPrfl1}
        crop={cropPrfl1}
        aspect={380 / 214}
        setReduxState={setCoverImage}
        isCircle={false}
        handleFormSubmit={handleopencover}
      />
      <div className="flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative">
        {slide && (
          <div className="h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 ">
            {" "}
          </div>
        )}
        {slide && (
          <div className="flex  justify-start w-[100%] flex-col  ">
            <Sidebar handleslideclose={handleslideclose} />
          </div>
        )}
        <div className="flex justify-between items-center w-[90%] mt-5">
          <div
            onClick={handleslide}
            className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]"
          >
            <img className="w-[24px] " src={menu} />
          </div>
          <img className="h-[30px] w-[155px] object-cover" src={logo} />
          <div className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]">
            <img className="w-[24px] " src={Notification} />
          </div>
        </div>
        <div className="flex  items-center flex-col w-[90%] rounded-[21px] mt-5  bg-white">
          <div className="w-[100%]  relative  ">
            {userProfile?.coverImage && (
              <div
                onClick={handleopenremoveCover}
                className="  rounded-full w-[20px]  h-[20px] absolute top-2 right-2 flex justify-center items-center text-sm font-[1500] z-20 text-white bg-red-600"
              >
                <RiSubtractLine />
              </div>
            )}
            <label htmlFor="imgcover" className="w-[100%] absolute">
              {!userProfile?.coverImage && (
                <div className=" border rounded-full w-[20px] h-[20px] flex justify-center absolute  top-2 right-2 items-center text-sm font-[1500] text-white bg-[#062A27]">
                  +
                </div>
              )}
              <input
                key={key}
                type="file"
                name="imgcover"
                id="imgcover"
                className="opacity-0 w-[0px] h-[0px]"
                onChange={handleCoverImageChange}
              />
            </label>
            <img
              className="rounded-[10px] w-[100%]"
              src={userProfile?.coverImage ? userProfile?.coverImage : cover}
            />
            <div className=" flex justify-center items-center  w-[100%]  absolute bottom-[-60px] ">
              <div className="w-[120px] h-[120px]  rounded-[50%] relative">
                {userProfile?.userProfile && (
                  <div
                    onClick={handleopenremove}
                    className="  rounded-full w-[20px]  h-[20px] absolute top-[3px] right-[14px] flex justify-center items-center text-sm font-[1500] text-white bg-red-600"
                  >
                    <RiSubtractLine />
                  </div>
                )}
                <label
                  htmlFor="img"
                  className="w-[0px] h-[0px] absolute top-1  left-[86px]"
                >
                  {!userProfile?.userProfile && (
                    <div className=" border rounded-full w-[20px] h-[20px] flex justify-center   items-center text-sm font-[1500] text-white bg-[#062A27]">
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
                  src={
                    userProfile?.userProfile
                      ? userProfile?.userProfile
                      : profile1
                  }
                  className="rounded-full border-[3px] border-[#f0f0f0] w-[120px] h-[120px]"
                />
              </div>
            </div>
          </div>
          <p className="mt-[70px]"></p>
          {!userProfile?.includeHeadline && (
            <p className="text-[#5F6161] text-[13px] ">
              {userProfile?.headingText}
            </p>
          )}
          <h1 className="text-[16px] font-bold mt-1 text-[#062A27]">
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
          <h1 className="text-[14px] font-bold  mt-1 text-[#062A27]">
            {userProfile?.birthDate === "Invalid Date"
              ? ""
              : userProfile?.birthDate}{" "}
            {userProfile?.deathDate === "Invalid Date" ? "" : "-"}{" "}
            {userProfile?.deathDate === "Invalid Date"
              ? ""
              : userProfile?.deathDate}{" "}
          </h1>
          {/* <p
            className={`font-bold text-[16px] flex items-center ${
              userProfile?.status === "Verified"
                ? "text-[#3F9A55]"
                : "text-red-500"
            }`}
          >
            <p className="text-[black] font-bold text-[14px] mr-2">
              Profile Status:
            </p>{" "}
            {userProfile?.status}
          </p> */}
          <div className="w-[100%] flex justify-center items-center mt-3">
            <button
              onClick={() => handleNavigateview(userProfile)}
              className="bg-[#062A27] text-[white] rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px] mr-2"
            >
              {" "}
              <img className="w-[18px] mr-2" src={eye} />
              Public View
            </button>
            {/* {userProfile?.status != "Verified" && (
              <button
                onClick={handlestatus}
                className="border-[#062A27] border text-[#062A27]  rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px]"
              >
                Status Info
              </button>
            )} */}
            <div
              onClick={handleClick}
              className="border flex justify-center items-center border-[#062A27] ml-2 bg-white w-[35px] h-[35px] rounded-[50%]"
            >
              <IoIosMore className="w-[24px] text-[#062A27] " />
            </div>
          </div>
          <div className="w-[100%] rounded-[20px]  bg-white flex  mt-8 items-center flex-col">
            <div className="flex justify-evenly items-center w-[100%] border-b overflow-x-scroll">
              <p
                className="p-3 whitespace-nowrap cursor-pointer text-[#5F6161] "
                onClick={handlefvrt}
                style={
                  timeline
                    ? { borderBottom: "2px solid black", color: "#062A27" }
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
                    ? { borderBottom: "2px solid black", color: "#062A27" }
                    : {}
                }
              >
                Bio
              </p>
              <p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handleMedallions}
                style={
                  media
                    ? { borderBottom: "2px solid black", color: "#062A27" }
                    : {}
                }
              >
                Media
              </p>
              {/*<p
                className="p-3 cursor-pointer text-[#5F6161]"
                onClick={handleTributes}
                style={
                  tributes
                    ? { borderBottom: "2px solid black", color: "#062A27" }
                    : {}
                }
              >
                Admins
              </p>*/}
            </div>
            {timeline && <Timeline toast={toast} />}
            {bio && <CreateEditprofile toast={toast} bio={bio} />}
            {media && <Media toast={toast} bio={bio} />}
            {tributes && <Tribute toast={toast} />}
            <br></br>
          </div>
          <br></br>
        </div>
        <br></br>
      </div>
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
        getContentAnchorEl={null} //
      >
        <MenuItem
          onClick={() => {
            handleShowModal(), handleClose();
          }}
          className="flex items-center  "
        >
          <p className="text-[#062A27] text-[13px] flex items-center">
            <BsQrCode className="mr-1 w-[25px]" />
            Assign Another QR
          </p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpendelete(), handleClose();
          }}
          className="flex items-center  "
        >
          <p className="text-[red] text-[13px] flex items-center">
            <FaDeleteLeft className="mr-1 w-[25px]" />
            Delete Profile
          </p>
        </MenuItem>
      </Menu>
      <Modal
        open={deleteopen}
        onClose={handleClosedelete}
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
            <div className="flex justify-center flex-col items-center w-[90%]">
              <p className="text-[#062A27] text-center font-bold w-[80%] mt-5">
                Are you sure you want to delete this profile?
              </p>
              <div className="flex justify-between items-center w-[100%]">
                <button
                  onClick={handleDeleteProfile}
                  className="bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[48%] font-[500] text-[16px] cursor-pointer text-white"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-[#b62335] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[48%] font-[500] text-[16px] cursor-pointer text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
          <br />
        </Box>
      </Modal>
      <Modal
        open={status}
        onClose={handleClosestatus}
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
                  onClick={handleClosestatus}
                  className="w-[25px] h-[25px]"
                  src={back}
                />
                <p className="text-[16px] ml-3 text-[#B08655] font-bold Satoshi-bold">
                  Back to profile
                </p>
              </div>
              <div
                onClick={handleClosestatus}
                className="flex justify-center items-center border border-[#E5E8EE] w-[25px] h-[25px] rounded-[50%]"
              >
                <img className="w-[10px]" src={cross} />
              </div>
            </div>
            <div className="flex justify-center flex-col items-center w-[90%]">
              <div>
                <div className="text-[16px] font-bold Satoshi-bold mt-5">
                  Profile type
                </div>
                <div className="flex flex-col">
                  <FormControl
                    className="w-[100%] flex flex-col"
                    component="fieldset"
                  >
                    <RadioGroup
                      row
                      aria-label="privacy"
                      name="privacy"
                      value={userdata?.status}
                      onChange={handleStatusChange}
                    >
                      <FormControlLabel
                        value="Unverified"
                        control={<Radio style={{ color: "#2F9089" }} checked />}
                        label="Unverified"
                      />
                      <h2 className="text-[13px] mt-2 mb-2 text-[#5F6161]">
                        Unverified profiles are FREE and fully functional
                        profiles that only the creator of the profile can see.
                        You can convert your unverified profile to a fully
                        active and public profile.
                      </h2>
                      {/* <FormControlLabel
                        value="Limited"
                        control={<Radio style={{ color: "#2F9089" }} />}
                        label="Limited"
                      />
                      <h2 className="text-[13px] mt-2 mb-2 text-[#5F6161]">
                        Limited profiles are FREE and accessible to the public
                        and connected to a Turning Hearts medallion, but with
                        limited accessibility. Visitors can only view the
                        Memorial page but not the Tribute page to contribute
                        their own post and interact with others.
                      </h2> */}
                      <FormControlLabel
                        value="Active"
                        control={<Radio style={{ color: "#2F9089" }} />}
                        label="Verified"
                      />
                      <h2 className="text-[13px] mt-2 mb-2 text-[#5F6161]">
                        Verified profiles are paid profiles that are connected
                        to a Sentiments medallion.
                      </h2>
                    </RadioGroup>
                  </FormControl>
                  {/* <button
                    onClick={handleUpdateUser}
                    className="bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[500] text-[15px] cursor-pointer text-white Satoshi-bold"
                  >
                    Change Profile Type
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <br />
        </Box>
      </Modal>
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
        open={isModalcover}
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
              Are you sure you want to change cover image?
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
                onClick={handlecoverupload}
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
      <Modal
        open={removecover}
        onClose={handleopenremoveCover}
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
              onClick={handleopenremoveCover}
              className="flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]"
            >
              <IoClose />
            </div>
          </div>

          <div className="flex justify-center items-center w-[90%] mt-2 flex-col">
            <p className="text-center mb-1">
              Are you sure you want to remove cover image?
            </p>
            <div mt={2} className="flex w-[100%] justify-center mt-1">
              <button
                className="border-[#062A27] border text-[#062A27] rounded-[30px] w-[35%] h-[35px] flex justify-center items-center "
                onClick={handleopenremoveCover}
              >
                No
              </button>
              <button
                className="bg-[#062A27] text-[white] rounded-[30px] w-[35%] h-[35px] ml-3 flex justify-center items-center "
                onClick={handleremoveCoverimg}
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
      <Modal
        open={showModal}
        onClose={handleShowModal}
        aria-labelledby="activation-instructions-modal"
        aria-describedby="activation-instructions-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 340,
            height: 210,
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
            <div className="flex justify-start  flex-col w-[90%] mt-1">
              <h1 className="mt-2 font-bold text-[16px] text-[#062A27] Satoshi-bold">
                Enter the code
              </h1>

              <h1 className="mt-1 font-bold text-[14px] text-[#5F6161]">
                If the link on Sentiment QR is
                app.sentiment.com/viewprofile/0125 your code is 0125
              </h1>

              <div className="flex justify-start flex-col mt-2">
                <input
                  type="text"
                  placeholder="Enter your code here"
                  className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                  value={mytag}
                  onChange={(e) => setMyTag(e.target.value)}
                />
              </div>
              <div className="w-[100%] flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handleShowModal()}
                  className="border border-[#062A27] text-[#062A27] rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px] "
                >
                  {" "}
                  Cancel
                </button>
                <button
                  onClick={assignNewTag}
                  className="bg-[#062A27] text-[white] rounded-[30px] w-[120px] h-[35px] flex justify-center items-center text-[13px] "
                >
                  {" "}
                  Assign
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
