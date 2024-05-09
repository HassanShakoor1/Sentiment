import React from 'react'
import img from '../images/Rectangle 34624494.png'
import link from '../images/tabler_link.png'

import { FaPlus } from 'react-icons/fa6'
export default function ViewDetails() {
  return (
<>
<div className='flex justify-start mt-5  flex-col w-[90%] '>
<p className='text-[18px] text-[#062A27] font-bold Satoshi-bold '>CEMETERY INFORMATION</p> 
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-5 Satoshi-bold font-bold'>Cemetery Name</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-5 font-bold'><p className='mr-2'>:</p> West  Hampton Hampton </p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Cemetery Plot Number</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p>Garden of prayer C</p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Cemetery Location</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p>Henrico, VA</p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 Satoshi-bold font-bold'>Obituary Link</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold Satoshi-bold '><p className='mr-2'>:</p><p className='underline text-[#0F6FEC] cursor-pointer'>See obituary</p></p>
</div>
<div className='flex justify-start w-[100%] '>
<p className='text-[16px] text-[#062A27] w-[50%] mt-2 font-bold Satoshi-bold'>Link</p>
<p className='text-[15px] text-[#5F6161] flex w-[50%] mt-2 font-bold'><p className='mr-2'>:</p></p>
</div>
<div className='flex w-[100%] flex-col mt-5 p-4 rounded-[10px] border border-[#E7EEEE] justify-start '>
<div className=' flex justify-start items-center'>
<img className='w-[120px] h-[70px] rounded-[8px]' src={img}/>
<p className='text-[16px] font-bold text-[#5F6161] Satoshi-bold ml-3'>Alex documentry</p>
</div>
<button    className='bg-[#062A27] Satoshi-bold rounded-[30px] flex border border-[#B08655] justify-center items-center h-[45px] mt-5 w-[100%] font-[1000] text-[18px] cursor-pointer text-white'><img src={link} className='mr-2 w-[25px]'/>Vist Link</button>
</div>
</div>
</>
  )
}
