import React from "react";

const PaymentLeft = (prop) => {
    return (
        <div className="border-b h-[163px] border-slate-300 py-4 pr-3 flex gap-4 m-5">
            <div className="basis-[170px] h-[130px] rounded">
                <img
                    src={prop.img}
                    alt="product_img"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-2 flex flex-col justify-between gap-2">
                <div className="flex flex-col">
                    <h1 className="text-lg font-[500]">{prop.pname}</h1>
                    <p className="text-slate-500 py-1">{prop.brand}</p>
                    <p className="text-slate-500 py-1">{prop.year}</p>
                </div>
                <div className="flex items-center gap-2">

                    <span>Qty: </span><span className="mt-[2px]">
                        {prop.productDetails[prop.index].quantity}
                    </span>

                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between text-right">
                <div className="text-lg font-[500]">Rs.{prop.price}</div>

            </div>
        </div>
    );
};

export default PaymentLeft;
