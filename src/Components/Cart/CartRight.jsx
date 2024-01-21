import React from 'react'
import { useNavigate } from 'react-router';
const CartRight = (prop) => {

    const Navigate = useNavigate();

    const checkout = () => {
        Navigate("/payment/" + localStorage.getItem("userId"))
    }

    return (
        <div className='flex flex-col flex-1 p-5 pb-3 max-h-[400px] mx-auto max-w-[400px] min-w-[300px] shadow'>
            <h1 className='text-xl '>Order Summary</h1>
            <div className='flex justify-between items-center text-sm text-slate-500 py-4 border-slate-300 border-b'>
                <p>Subtotal</p>
                <p>Rs. {prop.tprice}</p>
            </div>
            <div className='flex justify-between items-center text-sm text-slate-500 py-4 border-slate-300 border-b'>
                <p>Shipping estimate</p>
                <p>Rs. {prop.ship}</p>
            </div>
            <div className='flex justify-between items-center text-sm text-slate-500 py-4 border-slate-300 border-b'>
                <p>Tax estimate</p>
                <p>Rs. {prop.gst}</p>
            </div>
            <div className='flex justify-between items-center text-slate-800 font-[500] py-4 border-slate-300 border-b'>
                <p>Total Order</p>
                <p>Rs. {prop.tprice + prop.ship + prop.gst}</p>
            </div>
            {/* <PayPalButtons createOrder={createOrder} onApprove={(data, actions) => { onApprove(data, actions, productIds) }} onError={onError} /> */}
            <button onClick={checkout} type="button" className="text-white bg-gradient-to-r mt-5 align-bottom from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition-all duration-100 active:translate-y-1 active:shadow-none focus:outline-none shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Checkout</button>
        </div>
    )
}

export default CartRight