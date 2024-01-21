import React from "react";
import { Link } from "react-router-dom";

const NewProducts = (p) => {
  return (
    <div className="mt-10 vsm:w-[80%] flex-1 min-w-[280px] ">
      <div className=" flex justify-between pb-3 px-1 border-b border-slate-300 items-center">
        <h1 className=" text-base font-semibold -tracking-tighter"> {p.name} </h1>
        <p>&#10022;</p>
      </div>
      {
        p.filterData.map((data, index)=>{
          return <div key={index} className="my-4 p-3 gap-x-4 vsm:h-32 cursor-pointer h-28 min-w-56 flex rounded-lg border border-slate-300 ">
          <Link to={`/${data.category}/${data.id}`} className="flex-1"><img className="w-full h-full object-contain" src={data.image} alt="kux bhi lol" /></Link>
          <div className="flex-1 flex justify-center gap-y-1 flex-col"><Link to={`/${data.category}/${data.id}`} className=" capitalize text-base font-medium">{data.productname.slice(0,12)}..</Link>
          <p className=" text-sm font-medium text-blue-600">{data.rating}</p>
          <p>Rs. {data.price}</p></div>
        </div>
        })
      }       
    </div>
  );
};

export default NewProducts;
