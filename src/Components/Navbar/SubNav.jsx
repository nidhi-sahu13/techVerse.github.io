import React from 'react'
import { Link } from 'react-router-dom'

export const SubNav = () => {
  return (
    <div className='hidden w-full relative md:flex justify-center'>
      <div className='flex absolute top-0 z-10 justify-center self-center w-fit mt-2'>
        <ul className='flex justify-center items-center gap-10 rounded-full min-h-14 flex-wrap bg-white shadow-NavShadow px-10 '>
            <li className='text-center text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/mobiles' >Mobiles</Link> </li>
            <li className='text-center text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/Tv' >Tv</Link> </li>
            <li className='text-center text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/laptops' > Laptops </Link> </li>
            <li className='text-center text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/tablets'> Tablets </Link> </li>
            <li className='text-center hidden md:block text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/bluetooths' >Blutooth</Link> </li>
            <li className='text-center hidden md:block text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/smartwatch'>Watch</Link> </li>
            <li className='text-center hidden md:block text-[15px] font-medium hover:text-blue-800 text-ellipsis whitespace-nowrap transition-all cursor-pointer'> <Link to='/Allproducts'>More</Link> </li>
        </ul>
    </div>
    </div>
  )
}
