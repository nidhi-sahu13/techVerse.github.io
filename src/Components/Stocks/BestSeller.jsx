import React from 'react'
import { IoMdStar } from 'react-icons/io'
import { Link } from 'react-router-dom'

const BestSeller = (prop) => {

  const renderRating = (rate) => {
    const ratingElements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        ratingElements.push(<IoMdStar key={i} className="text-blue-600" />);
      } else {
        ratingElements.push(<IoMdStar key={i} className="text-gray-200 " />);
      }
    }
    return ratingElements;
  };

  return (
    <div className="mt-10 w-72 ">
      <div className=" flex justify-between py-3 px-1 border-b border-slate-300 items-center">
        <h1 className=" text-base font-semibold -tracking-tighter">Best Seller</h1>
        <Link to="/newProducts">+</Link>
      </div>
      {
        prop.filterData.map((data, index)=>{
          return <Link to={`/${data.category}/${data.id}`} key={index} className="my-4 p-3 flex cursor-pointer rounded-lg max-h-24 ">
          <div className="flex-1"><img className='w-full h-full object-contain' src={data.image} alt="kux bhi" /></div>
          <div className="flex-1 flex flex-col justify-center gap-y-1"><h1 className=" capitalize text-base font-medium">{data.productname.slice(0,12)}..</h1>
          <div className='flex gap-x-1'>
              {
                renderRating(Number(data.rating))
               }
          </div>
          <p>Rs. {data.price} </p></div>
        </Link>
        })
      }     
    </div>
  )
}

export default BestSeller