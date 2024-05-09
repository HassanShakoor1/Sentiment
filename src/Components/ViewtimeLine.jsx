import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import emtpy from "../images/empty (2) 1.png"
import couple from "../images/Rectangle 34624485.png"
export default function ViewtimeLine() {
    const dataArray = [
        { year: '2022', event: '25th Wedding Anniversary in Maui on February 01', image: couple },
        { year: '2020', event: '25th Wedding Anniversary in Maui on February 01', image: couple },
      ];
   
  return (
    <>
    {dataArray.length === 0 ? (
    <div className='flex justify-center items-center flex-col w-[100%] mt-5 '>
    <div className='flex justify-center border border-[#DFE1E1] rounded-[20px]  items-center flex-col h-[250px] w-[90%]'>
    <img className='w-[70px]' src={emtpy}/>
    <h1 className='font-bold Satoshi-bold text-[16px] text-[#062A27]  mt-3'>No timeline events found</h1>
    <p className='text-[#5F6161] text-[13px] mt-3'>Alex Smith's timeline is empty at the moment.</p>
    </div>  </div>):(
<div className='flex justify-start flex-col w-[90%] mt-5'>
<div className='text-[16px] text-[#062A27] font-bold Satoshi-bold '>SIGNIFICANT EVENTS</div>
<div>
{dataArray.map((item, index) => (
  <div key={index} className='flex justify-start w-[100%] mt-3 flex-col'>
    <div className='w-[70px] h-[30px] font-bold Satoshi-bold flex justify-center items-center rounded-[5px] bg-[#D3E8E6]'>
      {item.year}
    </div>
    <div className='flex justify-center mt-4 h-[90px] items-center border-l border-dashed border-[#5F6161]'>
      <img className='w-[53px] ml-3 h-[53px] rounded-[4px] object-cover' src={item.image} alt='Couple' />
      <p className='text-[#5F6161] ml-3'>{item.event}</p>
    </div>
  </div>
))}
</div>
</div>
)}
    </>
  )
}
