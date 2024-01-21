import React from 'react'
import { Link } from 'react-router-dom'

const TopProducts = () => {
  return (
    <div className='mt-10 w-full'>
      <div className='w-full h-10 flex justify-between px-8 items-end'><h1 className=' text-xl font-semibold tracking-tighter'>TopProducts</h1>
      <Link to="/topProducts" >More</Link></div>
        <div className=' mx-2 md:w-[95%] h-48 flex flex-wrap justify-between items-center md:p-3 bg-slate-400 md:m-auto '>          
        </div>
    </div>
  )
}

export default TopProducts