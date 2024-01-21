import React from 'react'
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'
import { IoTvSharp } from 'react-icons/io5'
import { CgAppleWatch } from "react-icons/cg";
import { BsEarbuds } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className=' w-72 h-[326px] p-5 rounded-lg border border-[#ededed] mt-10 hidden md:block'>
        <h1 className=' text-base -tracking-tighter font-semibold text-slate-700 uppercase '>Categories</h1>
        <div className='flex flex-col gap-4 mt-4'>
            <Link to='/mobiles' className='flex justify-between items-center text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><FaMobileAlt className='text-xl text-blue-700'/></i>
                <h2 className='text-base  font-medium '>Mobiles</h2>
                </div>
                <span>+</span>
            </Link>
            <Link to='/laptops' className='flex justify-between items-center  text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><FaLaptop className='text-xl text-blue-700'/></i>
                <h2 className='text-lg font-medium'>Laptop</h2>
                </div>
                <span>+</span>
            </Link>
            <Link to="/smartwatch" className='flex justify-between items-center  text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><CgAppleWatch className='text-xl text-blue-700 '/></i>
                <h2 className='text-lg font-medium'>Watch</h2>
                </div>
                <span>+</span>
            </Link>
            <Link to="/bluetooths" className='flex justify-between items-center  text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><BsEarbuds className='text-xl text-blue-700'/> </i>
                <h2 className='text-lg '>Bluetooth</h2>
                </div>
                <span>+</span>
            </Link>
            <Link to="/Tv" className='flex justify-between items-center  text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><IoTvSharp className='text-xl text-blue-700'/> </i>
                <h2 className='text-lg '>Tv</h2>
                </div>
                <span>+</span>
            </Link>
            <Link to="/tablets" className='flex justify-between items-center  text-slate-500 hover:text-blue-700 cursor-pointer'>
                <div className='flex gap-3 items-center'>
                <i><FaTabletAlt className='text-xl text-blue-700'/> </i>
                <h2 className='text-lg'>Tab</h2>
                </div>
                <span>+</span>
            </Link>
        </div>
    </div>
  )
}

export default Categories