import React, { useContext } from "react";
import { Layout } from "../Components/Layout/Layout";
import myContext from "../context/Data/myContext";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import ScrollToTop from "../Components/HomeItems/ScrollToTop";
import PaymentLeft from "../Components/Cart/PaymentLeft";
import PaymentRight from "../Components/Cart/PaymentRight";

export default function Payment({ productDetails, setProductDetails }) {


  const dispatch = useDispatch();

  // context data
  const context = useContext(myContext);
  const { CurrentUser } = context;

  const handleDeleteItem = async (itemId) => {
    try {
      const itemRef = doc(db, `cart/${CurrentUser[0].uid}/UserItems`, itemId);
      await deleteDoc(itemRef);
      toast.success("Item Deleted Successfully");
      setProductDetails(
        productDetails.filter((item) => item.itemId !== itemId)
      );
      // Fetch the updated items after deletion (if required)
      // Refetch the items or update the state after deletion
    } catch (error) {
      toast.error("Something went Wrong");
      console.error("Error deleting item:", error);
    }
  };

  // delete all the cart items

  const DeleteAllItem = async () => {
    try {
      // Delete the entire 'UserItems' collection for the user
      const collectionRef = collection(db, `cart/${CurrentUser[0].uid}/UserItems`);
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      dispatch(clearCart());
      toast.success("Items Deleted Successfully");

      // You may choose to update the local state if necessary
      setProductDetails([]);
    } catch (error) {
      toast.error("Something went Wrong");
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = productDetails.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <Layout>
      <div className=" mt-10 ">
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={true} />
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
          className="w-[90%] m-auto text-center min-h-16 py-5 rounded"
        >
          {" "}
          <span
            className="text-lg font-medium cursor-pointer text-blue-500 px-2 border-b border-blue-500"
          >
            Payment.
          </span>
        </div>
        <div className=" flex w-[90%] gap-x-10 flex-wrap mx-auto mt-4 ">
          {productDetails.length > 0 ? (
            <>
              <div className="flex-[2] min-w-[400px] ">
                {productDetails.map((data, index) => {
                  return (
                    <PaymentLeft
                      key={data.itemId} // Assuming itemId is unique and can be used as a key
                      pname={data.productname}
                      img={data.image}
                      price={data.price}
                      itemId={data.itemId}
                      productid={data.productId}
                      onDelete={handleDeleteItem}
                      brand = {data.brand}
                      year = {data.warranty}
                      setProductDetails={setProductDetails}
                      productDetails={productDetails}
                      index={index}
                    />
                  );
                })}
              </div>
              <PaymentRight tprice={totalPrice} ship={20} gst={0} onDelete={DeleteAllItem} />
            </>
          ) : (
            <>
              <div className=" w-[90%] h-[60vh] flex-col shadow flex justify-center items-center mx-auto">
                <img
                  src="/Images/cart.webp"
                  alt="cartimage"
                  className=" w-48 "
                />
                <h1 className=" text-lg font-semibold mt-3 ">
                  Missing Cart items?
                </h1>
                <p className="text-sm font-medium text-slate-600 pt-1 pb-3">
                  Add the items to buy the products.{" "}
                </p>

                <Link
                  to="/"
                  className="relative inline-flex items-center justify-center mt-2 p-4 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border border-blue-500 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Back to Home
                  </span>
                  <span className="relative invisible">Back to Home</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
