import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import img from "../images/Ellipse 2726 (1).png";
import profile1 from "../images/Group 661 (2).png";
import edit from "../images/Combined-Shape.png";
import eye from "../images/Eye.png";
import CreatenewProfile from "./CreatenewProfile";
import { useNavigate, useParams } from "react-router-dom";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "../Firebase/firebaseConfig";
import { BiSolidUser } from "react-icons/bi";
import { FadeLoader } from "react-spinners";
export default function Medallions({ toast }) {
  const [createprofile, setCreateprofile] = useState(false);
  // const { tagUid } = useParams();
  const tagUid = sessionStorage.getItem("tempTag");
  const handlecreate = () => {
    setCreateprofile(true);
  };
  useEffect(() => {
    if (tagUid) {
      setCreateprofile(true);
    }
  }, []);
  const [loading, setloading] = useState(false);
  const handleback = () => {
    setCreateprofile(false);
  };
  const nevigate = useNavigate();
  const handleNavigate = (id) => {
    nevigate(`/editprofile/${id}`);
  };
  const handleNavigateview = (id) => {
    nevigate(`/viewprofile/${id}`);
  };

  let [userprofile, setUserprofile] = useState("");
  let currentUser = localStorage.getItem("userId");
  useEffect(() => {
    setloading(true);
    const starCountRef = query(
      ref(db, "/Profile"),
      orderByChild("userId"),
      equalTo(currentUser)
    );

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      if (data) {
        setUserprofile(Object.values(data));
      } else {
        setUserprofile([]);
      }
      setloading(false);
    });
  }, []);

  return (
    <>
      <>
        {!createprofile && (
          <div className="flex justify-center items-center flex-col w-[100%] mt-2">
            <button
              onClick={handlecreate}
              className="bg-[#062A27] rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-3 w-[90%] font-[500] text-[16px] cursor-pointer text-white Satoshi-bold"
            >
              <FaPlus className="mr-2" />
              Create New Profile
            </button>
            {userprofile.length === 0 && (
              <div className="flex justify-center border border-[#DFE1E1] rounded-[20px] mt-5 items-center flex-col h-[250px] w-[90%]">
                <BiSolidUser className="w-[50px] h-[50px] text-[#5F6161]" />
                <h1 className="font-bold text-[16px] mt-3">No profile found</h1>
                <p className="text-[#5F6161] text-[13px] w-[70%] text-center mt-3">
                  No profile has been added yet in collection
                </p>
              </div>
            )}
            {userprofile.length > 0 &&
              userprofile.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center rounded-[10px] border border-[f0f0f0] shadow-md mt-5 flex-col w-[90%]"
                >
                  <div className="flex  w-[90%] mt-5 ">
                    <img
                      className="w-[80px] h-[80px] rounded-full "
                      src={item?.userProfile ? item?.userProfile : profile1}
                    />
                    <div className="flex flex-col ml-5 w-[80%]">
                      <p className="font-bold text-[16px] Satoshi-bold">
                        {item.firstName} {item.lastName}{" "}
                      </p>
                      <div className="flex items-center ">
                        <p>Relationship:</p>
                        <p className="text-[#5F6161] text-[12px] ml-1 mt-1">
                          {item?.relationship}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p>Created in:</p>
                        <p className="text-[#5F6161] text-[12px] ml-1 mt-1">
                          {item?.createdDate}
                        </p>
                      </div>
                      {/* <p
                        className={`font-bold text-[16px] flex items-center ${
                          item.status === "Verified"
                            ? "text-[#3F9A55]"
                            : "text-red-500"
                        }`}
                      >
                        <p className="text-[black] font-[400] text-[15px] mr-2">
                          Profile type:
                        </p>{" "}
                        {item.status}
                      </p> */}
                    </div>
                  </div>
                  <div className="w-[90%] flex items-center justify-between mb-5 mt-5">
                    <button
                      onClick={() =>
                        handleNavigateview(item.tagId ? item.tagId : item.id)
                      }
                      className="border border-[#062A27] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold"
                    >
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src={eye}
                        alt="view"
                      />
                      View
                    </button>
                    <button
                      onClick={() => handleNavigate(item.id)}
                      className="bg-[#062A27] text-[white] rounded-[30px] w-[47%] h-[40px] flex justify-center items-center Satoshi-bold"
                    >
                      <img className="w-[16px] mr-2" src={edit} alt="edit" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </>

      {createprofile && (
        <CreatenewProfile
          toast={toast}
          handleback={handleback}
          tagUid={tagUid ? tagUid : ""}
        />
      )}
    </>
  );
}
