import React from 'react'

export default function ViewBio({userViewProfile}) {
  return (
    <>
    <div className='flex justify-start flex-col w-[90%] mt-5'>
    <div className='text-[16px] text-[#062A27]  font-bold Satoshi-bold mb-2 '>About</div>
    <p className='  text-[#5F6161]'>{userViewProfile?.bioInformation}</p>
    </div>
    </>
  )
}
