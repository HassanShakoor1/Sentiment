import React, { useState } from 'react'
import menu from "../images/Hamburger menu.png"
import Notification from "../images/Notification.png"
import profile from "../images/Ellipse 2723.png"
import edit from "../images/Edit.png"
import email from "../images/email.png"
import Location from "../images/Location.png"
import calender from "../images/Calendar.png"
import Medallio from "../Components/Medallions"
import Sidebar from '../Components/Sidebar'
import Myfavorites from '../Components/Myfavorites'
import Posts from '../Components/Posts'
import MyaccountEdit from '../Components/MyaccountEdit'
export default function Home() {
    const [favorites,setfavorites]=useState(true)
    const [post,setpost]=useState(false)
    const [Medallions,setMedallions]=useState(false)
    const [account,setaccount]=useState(false)
    let [slide,setSlide]=useState()
    const handlefvrt =()=>{
        setfavorites(true)
        setpost(false)
        setMedallions(false)
        setaccount(false)
    }
    const handlepost =()=>{
        setfavorites(false)
        setpost(true)
        setMedallions(false)
        setaccount(false)
    }
    const handleMedallions =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(true)
        setaccount(false)
    }
    const handleaccount =()=>{
        setfavorites(false)
        setpost(false)
        setMedallions(false)
        setaccount(true)
        setSlide(false)
    }
   
    
    let handleslide=()=>{
        setSlide(!slide);
    }
    let handleslideclose=()=>{
        setSlide(false)
    }
  return (
    <>
    <div className='flex  items-center flex-col w-[100%] min-h-[100vh] bg-[#f0f0f0] relative'>
    {slide && <div className='h-[100%] w-[100%] absolute bg-[#062A27] bg-opacity-50 z-50 '>  </div>}
    {slide &&
        <div className='flex  justify-start w-[100%] flex-col  ' >
    <Sidebar
    handleslideclose={handleslideclose}
    handleaccount={handleaccount}
    /></div>}
    <div className='flex justify-between items-center w-[90%] mt-5'>
    <div onClick={handleslide} className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
    <img className='w-[24px] ' src={menu}/>
    </div>
    <div className='flex justify-start  flex-col '>
    <p className='text-[14px] text-[#062A27]  orelega-one-regular'>The</p>
    <p className='text-[16px] text-[#062A27] mt-[-5px] flex '><p className='orelega-one-regular text-[20px]'>Sentiments Co.</p> &trade;</p>
    </div>
    <div className='border flex justify-center items-center border-[#E5D6C5] bg-white w-[40px] h-[40px] rounded-[50%]'>
    <img className='w-[24px] ' src={Notification}/>
    </div>
    </div>
    <div className='flex    w-[90%] mt-8 '>
    <div className='w-[150px] h-[150px] object-cover rounded-[50%] relative'>
    <img src={profile}/>
    <div className=' flex justify-center items-center bg-white w-[30px] h-[30px] absolute top-0 right-4 rounded-[50%]'>
    <img width={17} src={edit}/>
    </div>
    </div>
    <div className='flex justify-start  items-start flex-col w-[59%] ml-5'>
    <h1 className='font-[600] text-[20px] text-black  mt-1 Satoshi-bold ' >Jeremy Kaminsky</h1>
    <div className='flex items-center justify-center mt-3'>
    <img width={15} src={email}/>
    <p className='ml-1 text-[14px]'>Keremykami23@yahoo.com</p>
    </div>
    <div className='flex items-center justify-center mt-3'>
    <img width={15} src={Location}/>
    <p className='ml-1 text-[14px]'>South Carolina</p>
    </div>
    <div className='flex items-center justify-center mt-3'>
    <img width={15} src={calender}/>
    <p className='ml-1 text-[14px]'>Jan 01, 2024</p>
    </div>
    </div>
    </div>
    <div className='w-[90%]  rounded-[20px] border  bg-white flex  mt-8 items-center flex-col'>
    <div className='flex justify-between items-center w-[100%] border-b overflow-x-scroll '>
    <p className='p-3 whitespace-nowrap cursor-pointer text-[#5F6161] ' onClick={handlefvrt} style={favorites ? { borderBottom: "2px solid black",color:"#062A27",fontFamily:"Satoshi-bold" } : {}} >My favorites</p>
    <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handlepost} style={post ? { borderBottom: "2px solid black",color:"#062A27",fontFamily:"Satoshi-bold" } : {}}>Posts</p>
    <p className='p-3 cursor-pointer text-[#5F6161]' onClick={handleMedallions} style={Medallions ? { borderBottom: "2px solid black",color:"#062A27",fontFamily:"Satoshi-bold" } : {}}>Medallions</p>
    <p className='p-3 cursor-pointer whitespace-nowrap text-[#5F6161]' onClick={handleaccount} style={account ? { borderBottom: "2px solid black",color:"#062A27",fontFamily:"Satoshi-bold" } : {}}>My account</p>
    </div>
   {Medallions &&
<Medallio/>
   }
   {favorites &&
    <Myfavorites/>
       }
       {post &&
        <Posts/>
           }
           {account &&
            <MyaccountEdit/>
               }
   <br></br>
    </div>
    <br></br>
    </div>
   
    </>
  )
}
