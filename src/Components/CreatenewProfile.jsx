import React, { useRef, useState, useEffect } from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { IoChevronBack } from "react-icons/io5";
import {
  push,
  ref,
  update,
  equalTo,
  onValue,
  orderByChild,
  query,
} from "firebase/database";
import { db, storage } from "../Firebase/firebaseConfig";
import Cropper from "./Cropper";
import { getDownloadURL, uploadString, ref as sRef } from "firebase/storage";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
export default function CreatenewProfile({ handleback, bio, toast, tagUid }) {
  const [selectedRelationship, setSelectedRelationship] = useState("");

  const handleRelationshipChange = (event) => {
    setSelectedRelationship(event.target.value);
  };
  const [mytag, setMyTag] = useState(tagUid);

  const fileInputRef = useRef(null);

  const fileInput = useRef(null);

  const handleLuPlusCircleClick = () => {
    fileInputRef.current.click();
  };
  const handleplus = () => {
    fileInput.current.click();
  };
  const [privacy, setPrivacy] = useState("public");

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };
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
  let [linkimg, setLinkimg] = useState(null);

  let handleLinkImage = (event) => {
    // profileImage
    setLinkimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setLinkimg(reader.result);
      });
    } else {
      event.target.value = null;
    }
  };

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
  const [btnloader, setBTnloader] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [relationship, setRelationship] = useState("");
  const [veteran, setVeteran] = useState("");
  const [headingtext, setHeadingtext] = useState("");
  const [includeHeadline, setIncludeHeadline] = useState("");
  const [linkObituary, setLinkObituary] = useState("");
  const [bioinformation, setBioinformation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [deathdate, setDeathdate] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [quotesection, setQuotesection] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [mainUser, setMainUser] = useState({});
  let currentUser = localStorage.getItem("userId");

  //--------------------------------------------------getting main User-------------------------------------------------

  useEffect(() => {
    const userRef = query(
      ref(db, "User/"),
      orderByChild("id"),
      equalTo(currentUser)
    );
    onValue(userRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        setMainUser(Object.values(data)?.[0]);
      }
    });
  }, []);

  console.log(mainUser);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const nevigate = useNavigate();
  const handleSubmit = async () => {
    if (!mytag) {
      toast.error("Code should not be empty");
      setBTnloader(false);
      return;
    }
    setBTnloader(true);
  
    try {
      const findtagRef = query(
        ref(db, "Tags/"),
        orderByChild("tagId"),
        equalTo(mytag)
      );
  
      onValue(
        findtagRef,
        async (snapshot) => {
          const data = await snapshot.val();
  
          if (!data) {
            // QR code not found
            toast.error("QR not found");
            sessionStorage.removeItem("tempTag");
            setBTnloader(false);
            return;
          }
  
          const theTagData = Object.values(data)?.[0];
  
          if (theTagData?.status) {
            // QR code is already assigned
            toast.error("This QR is already assigned to some other medallion");
            sessionStorage.removeItem("tempTag");
            setBTnloader(false);
            return;
          }
  
          if (!firstName || !lastName) {
            // First and last names are required
            toast.error("First and last name should not be empty");
            setBTnloader(false);
            return;
          }
  
          // Proceed with the rest of the logic
          const formattedDate = new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
  
          let downloadURL = "";
          if (tempimg) {
            const isHttps = tempimg.startsWith("http");
            if (!isHttps) {
              const uniqueNum = Date.now();
              const name = `userprofileimg${uniqueNum}`;
              const storageRef = sRef(storage, name);
              await uploadString(storageRef, tempimg.slice(23), "base64", {
                contentType: "image/png",
              });
              downloadURL = await getDownloadURL(storageRef);
            } else {
              downloadURL = tempimg;
            }
          }
  
          let downloadThumbnailURL = "";
          if (linkimg) {
            const isHttps = linkimg.startsWith("http");
            if (!isHttps) {
              const uniqueNum = Date.now();
              const name = `linkthumbnail${uniqueNum}`;
              const storageRef = sRef(storage, name);
              await uploadString(storageRef, linkimg.slice(23), "base64", {
                contentType: "image/png",
              });
              downloadThumbnailURL = await getDownloadURL(storageRef);
            } else {
              downloadThumbnailURL = linkimg;
            }
          }
  
          const contactsRef = ref(db, "Profile");
          const newContactRef = push(contactsRef);
          const pushKey = newContactRef.key;
  
          const updates = {
            userId: currentUser,
            id: pushKey,
            firstName,
            lastName,
            title,
            relationship,
            veteran: veteran || false,
            headingText: headingtext,
            includeHeadline: includeHeadline || false,
            linkObituary,
            userProfile: downloadURL,
            bioInformation: bioinformation,
            birthDate: formatDate(birthdate),
            deathDate: formatDate(deathdate),
            city,
            state,
            quoteSection: quotesection,
            createdDate: formattedDate,
            tagId: "",
            tags: [mytag],
            postPrivate: "",
            cemeteryName: "",
            cemeteryPlot: "",
            cemeteryCity: "",
            cemeteryState: "",
            cemeteryLocation: "",
            donationsUrl: "",
            timeline: "",
            imageMedia: "",
            videoMedia: "",
            voiceMedia: "",
            favoriteProfile: false,
            linkTitle,
            linkUrl,
            linkThumbnail: downloadThumbnailURL,
          };
  
          await Promise.all([
            update(newContactRef, updates),
            update(ref(db, `Tags/${theTagData?.id}`), {
              status: true,
              userid: pushKey,
            }),
          ]);
  
          toast.success("New Medallion created successfully");
          sessionStorage.removeItem("tempTag");
          localStorage.setItem("tag", mytag);
          handleback();
  
          // Clear state
          setFirstName("");
          setLastName("");
          setTitle("");
          setRelationship("");
          setVeteran("");
          setHeadingtext("");
          setIncludeHeadline("");
          setLinkObituary("");
          setBioinformation("");
          setBirthdate("");
          setDeathdate("");
          setCity("");
          setstate("");
          setQuotesection("");
          settempimg("");
  
          setBTnloader(false);
        },
        { onlyOnce: true } // Ensure this listener triggers only once
      );
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      console.error("Error:", error);
      setBTnloader(false);
    }
  };
  
  let handleopenshare = () => {
    formatDate();
  };

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const handleRemovePrflImage = () => {
    settempimg("");
  };
  const handleRemovelinkimg = () => {
    setLinkimg("");
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
      <div className="flex justify-start  flex-col w-[90%] mt-3">
        <>
          {!bio && (
            <div className="flex items-center ">
              <div
                onClick={handleback}
                className="border flex justify-center items-center border-[#E5D6C5] bg-white w-[30px] h-[30px] rounded-[50%]"
              >
                <IoChevronBack />
              </div>
              <h1 className="ml-3 font-bold text-[16px] text-[#062A27] Satoshi-bold">
                Create New Profile
              </h1>
            </div>
          )}

          <h1 className="mt-5 font-bold text-[16px] text-[#062A27] Satoshi-bold">
            Enter the code
          </h1>
          {!bio && (
            <h1 className="mt-2 font-bold text-[14px] text-[#5F6161]">
              If the link on Sentiment QR is app.sentiment.com/viewprofile/0125
              your code is 0125
            </h1>
          )}

          <div className="flex justify-start flex-col mt-3">
            <input
              type="text"
              placeholder="Enter your code here"
              className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
              value={mytag}
              onChange={(e) => setMyTag(e.target.value)}
            />
          </div>

          <h1 className="mt-5 font-bold text-[16px] text-[#062A27] Satoshi-bold">
            PERSONAL DETAILS
          </h1>
          {!bio && (
            <h1 className="mt-2 font-bold text-[15px] text-[#5F6161]">
              Start by entering as much info as you can about your loved one.
              You will have a chance to update this later.
            </h1>
          )}
          <div className="flex justify-between items-center w-[100%] mt-5">
            <div className="flex justify-start flex-col">
              <label className="mb-2">First Name *</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col">
              <label className="mb-2">Last Name *</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-[95%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start flex-col mt-3">
            <label className="mb-2">Title</label>
            <input
              type="text"
              placeholder="Example Jr - Sr"
              className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex justify-center   w-[100%] flex-col mt-3 ">
              <label className="mb-2" htmlFor="relationship">
                Relationship
              </label>
              <div className="outline-none border flex justify-start items-center border-[#C9C9C9] w-[100%]  h-[35px] rounded-[5px] pl-3">
                <select
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-[98%] bg-transparent outline-none border-none"
                >
                  <option value="">Select Relationship</option>
                  <option value="friend">Friend</option>
                  <option value="family">Family</option>
                  <option value="colleague">Colleague</option>
                </select>
              </div>
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Profile Picture</label>
              <input
                ref={fileInputRef}
                key={key}
                onChange={handleImageChange}
                type="file"
                style={{ display: "none" }}
              />
              <button
                onClick={handleLuPlusCircleClick}
                className="w-[100%] outline-none border underline text-[#062A27] font-bold Satoshi-bold border-[#062A27] bg-[#F1F9F8] border-dashed  h-[40px] rounded-[5px] "
              >
                Choose File
              </button>
            </div>
            {tempimg && <p className="mt-2 font-bold">Selected Image:</p>}
            {tempimg && (
              <>
                <div className="w-[100%] flex justify-center">
                  <img
                    src={tempimg}
                    alt="Event Preview"
                    style={{
                      maxWidth: "50%",

                      marginTop: "10px",
                    }}
                    // className="rounded-full"
                  />
                </div>

                <button
                  onClick={handleRemovePrflImage}
                  className="mt-3 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white"
                >
                  Remove Image
                </button>
              </>
            )}
            <div className="w-[100%] justify-start mt-5">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <input
                  type="checkbox"
                  id="veteran"
                  name="veteran"
                  checked={veteran} // Use checked attribute instead of value
                  onChange={(e) => setVeteran(e.target.checked)} // Update state based on checked property
                  style={{ transform: "scale(1.3)" }}
                />
                <label className="ml-2" htmlFor="veteran">
                  Is a Veteran?
                </label>
                <br />
              </span>
            </div>
            {bio && (
              <div>
                <div className="text-[16px] font-bold Satoshi-bold mt-8">
                  POST PRIVACY
                </div>
                <h2 className="text-[13px] mt-1 mb-1 text-[#5F6161]">
                  Choose your posts privacy settings:
                </h2>
                <div className="flex flex-col">
                  <FormControl
                    className="w-[100%] flex flex-col"
                    component="fieldset"
                  >
                    <RadioGroup
                      row
                      aria-label="privacy"
                      name="privacy"
                      value={privacy}
                      onChange={handlePrivacyChange}
                    >
                      <FormControlLabel
                        value="Public"
                        control={<Radio style={{ color: "#2F9089" }} />}
                        label="Public"
                      />
                      <h2 className="text-[13px] mt-2 mb-2 text-[#5F6161]">
                        If a user selects this option, profile's posts will be
                        visible to anyone visiting the Discover page.
                      </h2>
                      <FormControlLabel
                        value="Private"
                        control={<Radio style={{ color: "#2F9089" }} />}
                        label="Private"
                      />
                      <h2 className="text-[13px] mt-2 mb-2 text-[#5F6161]">
                        By selecting this option, profile's posts will not be
                        displayed in the Discover page.
                      </h2>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )}
            <div className="text-[16px] font-bold Satoshi-bold mt-8">
              HEADLINE TEXT
            </div>
            <h1 className="mt-2 font-bold text-[15px] text-[#5F6161]">
              This headline text is the one that shows above the name of the
              person. If this field is null, the headline text won’t be added.
            </h1>
            <div className="flex justify-start flex-col mt-5">
              <label className="mb-2">Test or phrase</label>
              <input
                type="text"
                placeholder="In loving memory of"
                className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={headingtext}
                onChange={(e) => setHeadingtext(e.target.value)}
              />
            </div>
            <div className="w-[100%] justify-start mt-5">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <input
                  type="checkbox"
                  id="includeHeadline"
                  name="includeHeadline"
                  checked={includeHeadline} // Use checked attribute instead of value
                  onChange={(e) => setIncludeHeadline(e.target.checked)} // Update state based on checked property
                  style={{ transform: "scale(1.3)" }}
                />
                <label className="ml-2" htmlFor="includeHeadline">
                  Don’t include headline text
                </label>
                <br />
              </span>
            </div>
            <p className="text-[16px] font-bold Satoshi-bold mt-8">
              OBITUARY INFORMATION
            </p>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Link To Obituary:</label>
              <input
                type="text"
                className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={linkObituary}
                onChange={(e) => setLinkObituary(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Bio Information:</label>
              <textarea
                type="text"
                className="w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={bioinformation}
                onChange={(e) => setBioinformation(e.target.value)}
              />
            </div>
            <p className="text-[16px] font-bold Satoshi-bold mt-8">LIFE TIME</p>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Birth Date *</label>
              <input
                type="date"
                className="w-[100%] outline-none border border-[#C9C9C9] bg-transparent  h-[35px] rounded-[5px] pl-3 pr-3"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Death Date *</label>
              <input
                type="date"
                className="w-[100%] outline-none border border-[#C9C9C9] bg-transparent  h-[35px] rounded-[5px] pl-3 pr-3"
                value={deathdate}
                onChange={(e) => setDeathdate(e.target.value)}
              />
            </div>
            {!bio && (
              <p className="text-[16px] font-bold Satoshi-bold mt-8">
                LOCATION DETAILS
              </p>
            )}
            {bio && (
              <p className="text-[16px] font-bold Satoshi-bold mt-8">
                LOCATION BEFORE DEATH
              </p>
            )}
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">City:</label>
              <input
                type="text"
                className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">State:</label>
              <select
                className="w-[100%] outline-none border border-[#C9C9C9] h-[35px] rounded-[5px] pl-3 pr-3"
                value={state}
                onChange={(e) => setstate(e.target.value)}
              >
                <option value="" disabled>
                  Select a state
                </option>
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-[16px] font-bold Satoshi-bold mt-8">
              Custom Link
            </p>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Link Title:</label>
              <input
                type="text"
                className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Link URL:</label>
              <input
                type="text"
                className="w-[100%] outline-none border border-[#C9C9C9]  h-[35px] rounded-[5px] pl-3 pr-3"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Link thumbnail:</label>
              <input
                ref={fileInput}
                key={key}
                onChange={handleLinkImage}
                type="file"
                style={{ display: "none" }}
              />
              <button
                onClick={handleplus}
                className="w-[100%] outline-none border underline text-[#062A27] font-bold Satoshi-bold border-[#062A27] bg-[#F1F9F8] border-dashed  h-[40px] rounded-[5px] "
              >
                Choose File
              </button>
            </div>

            {linkimg && <p className="mt-2 font-bold">Selected Image:</p>}
            {linkimg && (
              <>
                <div className="w-[100%] flex justify-center">
                  <img
                    src={linkimg}
                    alt="Event Preview"
                    style={{
                      maxWidth: "50%",

                      marginTop: "10px",
                    }}
                    // className="rounded-full"
                  />
                </div>

                <button
                  onClick={handleRemovelinkimg}
                  className="mt-3 bg-red-500  rounded-[30px] h-[45px]  w-[100%] font-[600] text-[16px] cursor-pointer text-white"
                >
                  Remove Image
                </button>
              </>
            )}

            <p className="text-[16px] font-bold mt-8 Satoshi-bold">
              QUOTE SECTION
            </p>
            <h1 className="mt-2 font-bold text-[15px] text-[#5F6161]">
              This headline text is the one that shows above the name of the
              person.
            </h1>
            <div className="flex justify-start flex-col mt-3">
              <label className="mb-2">Text or phrase:</label>
              <textarea
                type="text"
                placeholder="The way to get started is to quit talking and begin doing. -Walt Disney"
                className="w-[100%] outline-none border border-[#C9C9C9] min-h-[100px]  h-[35px] rounded-[5px] pl-3 pt-2 pr-3"
                value={quotesection}
                onChange={(e) => setQuotesection(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#062A27] rounded-[30px] h-[45px] mt-5 w-[100%] font-[600] text-[16px] cursor-pointer Satoshi-bold text-white"
            >
              {" "}
              {btnloader ? (
                <div cla>
                  <ClipLoader size={20} color="#ffffff" className="mt-2" />
                </div>
              ) : (
                "Activate"
              )}
            </button>
          </div>
        </>
      </div>
    </>
  );
}
