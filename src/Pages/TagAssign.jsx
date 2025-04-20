import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import profile1 from "../images/Group 661 (2).png";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TagAssign = () => {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filtered, setfiltered] = useState([]);
  const [search, setsearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState({});
  const [userProfiles, setUserProfiles] = useState([]);
  const [profileMode, setProfileMode] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);

  useEffect(() => {
    const UsersRef = ref(db, "User/");
    onValue(UsersRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      MediaKeyStatusMap;
      setAllUsers(Object.values(data));
      setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  }, []);

  //----------------------Filtering the userdata (search functionality)--------------------

  useEffect(() => {
    const result = allUsers?.filter((user) => {
      return user.email?.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  useEffect(() => {
    if (selectedProfile?.id) {
      setRedirectLoading(true);
      const profileRef = query(
        ref(db, "Profile/"),
        orderByChild("userId"),
        equalTo(selectedProfile?.id)
      );
      onValue(profileRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          setUserProfiles(Object.values(data));
          setProfileMode(true);
          setRedirectLoading(false);
        } else {
          setUserProfiles([]);
          setProfileMode(true);
          setRedirectLoading(false);
        }
      });
    }
  }, [selectedProfile]);

  console.log(selectedProfile?.id);

  const assignTag = async (id) => {
    setRedirectLoading(true);
    const findtagRef = query(
      ref(db, "Tags/"),
      orderByChild("tagId"),
      equalTo(tag)
    );
    onValue(findtagRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        const theTagData = Object.values(data)?.[0];

        if (theTagData && theTagData?.status === false) {
          if (id && selectedProfile?.id) {
            await update(ref(db, `Profile/${id}`), {
              status: "Verified",
              tagId: tag,
            }).then(() => {
              update(ref(db, `Tags/${theTagData?.id}`), {
                status: true,
                userid: id,
              }).then(() => {
                navigate(`/viewprofile/${tag}`);
                setRedirectLoading(false);
              });
            });
          }
        } else {
          toast.error("This tag is already assigned to someone else");
        }
      }
    });
  };

  console.log(allUsers);
  const findUnverified = (arr) => {
    const filterDate = arr?.filter((elm) => {
      return elm?.status != "Verified";
    });
    return filterDate;
  };
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      {profileMode ? (
        <div className="w-[95%] h-[95%] relative">
          <IoIosArrowBack
            className="text-2xl absolute left-0 top-[2px] cursor-pointer"
            onClick={() => setProfileMode(false)}
          />
          <p className="text-center">Select medallion to assign QR</p>
          <div className="w-[100%] h-[85%] mt-2 overflow-y-scroll ">
            {userProfiles?.length > 0 ? (
              findUnverified(userProfiles)?.map((elm) => {
                return (
                  <div className="w-[100%] h-[50px] bg-[white] rounded-full shadow-md mt-3 flex items-center cursor-pointer">
                    <div className="w-[17%]  ml-2 h-[100%] flex items-center ">
                      <img
                        src={elm?.profileImage ? elm?.profileImage : profile1}
                        alt="profile"
                        className="w-[40px] h-[40px] object-cover rounded-full ml-1"
                      />
                    </div>
                    <p className="w-[60%] line-clamp-1">
                      {elm?.firstName + " " + elm?.lastName}
                    </p>

                    <div
                      className="w-[17%] h-[30px] rounded-full bg-black ml-1 text-white flex justify-center items-center text-sm"
                      onClick={() => assignTag(elm?.id)}
                    >
                      {redirectLoading && selectedProfile?.id === elm?.id
                        ? "loading..."
                        : "Assign"}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-[100%] h-[100%] flex justify-center items-center">
                No unverified profiles to show
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-[95%] h-[95%] ">
          <p className="text-center">Select your profile to assign QR</p>
          <div className="w-[100%] flex justify-center items-center mt-2 ">
            <input
              type="text"
              className="w-[80%] h-[50px] bg-[white] rounded-full shadow-md pl-3 placeholder:text-[14px] outline-none"
              placeholder="Enter your email to find your account..."
              onChange={(e) => setsearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="w-[100%] h-[85%] mt-2 overflow-y-scroll ">
            {filtered?.map((elm) => {
              return (
                <div className="w-[100%] h-[50px] bg-[white] rounded-full shadow-md mt-3 flex items-center cursor-pointer">
                  <div className="w-[17%]  ml-2 h-[100%] flex items-center ">
                    <img
                      src={elm?.profileImage ? elm?.profileImage : profile1}
                      alt="profile"
                      className="w-[40px] h-[40px] object-cover rounded-full ml-1"
                    />
                  </div>
                  <p className="w-[60%] line-clamp-1">
                    {elm?.firstName ? elm?.firstName : "" + " " + elm?.lastName}
                  </p>

                  <div
                    className="w-[17%] h-[30px] rounded-full bg-black ml-1 text-white flex justify-center items-center text-sm"
                    onClick={() => {
                      !redirectLoading && setSelectedProfile(elm);
                    }}
                    style={{
                      opacity:
                        redirectLoading && selectedProfile?.id != elm?.id
                          ? "50%"
                          : "100%",
                    }}
                  >
                    {redirectLoading && selectedProfile?.id === elm?.id
                      ? "loading..."
                      : "Select"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
    </div>
  );
};

export default TagAssign;
