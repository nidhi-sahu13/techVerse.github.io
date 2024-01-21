import React from "react";
import { useDispatch } from "react-redux";
import { decreseQuantity } from "../../redux/cartRedux";

const CartBox = (prop) => {
  // context data
  const dispatch = useDispatch();
  const removeItem = () => {
    prop.onDelete(prop.itemId);
    console.log(prop)
    dispatch(decreseQuantity(prop.productid));
  };

  const changeQuantity = (e) => {
    const updatedProductDetails = [...prop.productDetails];
    updatedProductDetails[prop.index] = {
      ...updatedProductDetails[prop.index],
      quantity: e.target.value,
    };

    prop.setProductDetails(updatedProductDetails);
  }
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
        <div className="flex items-center gap-8">
          <p className="text-slate-500">Qty</p>
          <div className="relative">
            <select
              name="value"
              id="val"
              onChange={changeQuantity}
              className="text-sm w-14 shadow-sm text-slate-700 font-medium text-left py-1 px-2 appearance-none border border-slate-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              {/* Replace this div with your custom dropdown icon */}
              <svg
                className="h-5 w-5 text-xl fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M6 8l4 4 4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between text-right">
        <div className="text-lg font-[500]">Rs.{prop.price}</div>
        <p
          onClick={removeItem}
          className="text-gray-500 cursor-pointer hover:text-blue-500"
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartBox;
