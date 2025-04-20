import React from 'react'
import img from '../images/Rectangle 34624494.png'
import link from '../images/tabler_link.png'
import cover from "../images/Group 659 (3).png"
import { FaPlus } from 'react-icons/fa6'
export default function ViewDetails({userViewProfile}) {
  let handleOpenLink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = 'http://' + link;
    }
    window.open(link, '_blank');
  }
  let handleOpenurl = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = 'http://' + link;
    }
    window.open(link, '_blank');
  }
  let handleOpencustumlink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = 'http://' + link;
    }
    window.open(link, '_blank');
  }

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + '...';
    }
  }

  return (
<>
<div className='flex justify-start mt-5  flex-col w-[90%] '>
<p className='text-[18px] text-[#062A27] font-bold Satoshi-bold '>CEMETERY INFORMATION</p> 
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-5 Satoshi-bold font-bold'>Cemetery Name</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-5 font-bold'><p className='mr-2'>:</p>{truncateText(userViewProfile?.cemeteryName,20)} </p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Cemetery Plot Number</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p>{userViewProfile?.cemeteryPlot}</p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Cemetery Location</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p>{userViewProfile?.cemeteryLocation}</p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Donation URL</p>
<p onClick={()=>handleOpenurl(userViewProfile?.donationsUrl)} className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold Satoshi-bold '><p className='mr-2'>:</p><p className='underline text-[#0F6FEC] cursor-pointer'>{truncateText(userViewProfile?.donationsUrl,18)}</p></p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Obituary Link</p>
<p onClick={()=>handleOpenLink(userViewProfile?.linkObituary)} className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold Satoshi-bold '><p className='mr-2'>:</p><p className='underline text-[#0F6FEC] cursor-pointer'>{truncateText(userViewProfile?.linkObituary,18)}</p></p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 font-bold Satoshi-bold'>Link</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p></p>
</div>
<div className='flex w-[100%] flex-col mt-5 p-4 rounded-[10px] border border-[#E7EEEE] justify-start '>
<div className=' flex justify-start items-center'>
<img className='w-[120px] h-[70px] rounded-[8px] object-cover' src={userViewProfile?.linkThumbnail?userViewProfile?.linkThumbnail:cover}/>
<p className='text-[16px] font-bold text-[#5F6161] Satoshi-bold ml-3'>{userViewProfile?.linkTitle}</p>
</div>
<button  onClick={()=>handleOpencustumlink(userViewProfile?.linkUrl)}   className='bg-[#062A27] Satoshi-bold rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[1000] text-[18px] cursor-pointer text-white'><img src={link} className='mr-2 w-[25px]'/>Vist Link</button>
</div>
</div>
</>
  )
}
