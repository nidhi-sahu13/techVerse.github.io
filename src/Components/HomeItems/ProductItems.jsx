import React, { useState, useContext} from "react";
import { BsBagPlus } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { increaseQuantity } from "../../redux/cartRedux";
import myContext from "../../context/Data/myContext";
import Mymodal from "../modal/Mymodal";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProductItems = (prop) => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useContext(myContext);
  const { islogged, CurrentUser } = context;

  const dispatch = useDispatch()
  
  const rate = Number(prop.items.rating);
  const renderRating = () => {
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

  const addtoCart = async () => {
    if (islogged) {
      setLoading(true);
      try {
        const cartRef = doc(collection(db, "cart"), CurrentUser[0].uid);
        const subCollectionRef = collection(cartRef, "UserItems");

        // Create a new document reference within the UserItems subcollection
        const newDocRef = doc(subCollectionRef);
        // Set the data directly to the new document reference using setDoc
        await setDoc(newDocRef, {
          userId: CurrentUser[0].uid,
          productid: prop.items.id,
          category: prop.items.category,
          quantity: 1,
        });
        dispatch(increaseQuantity(prop.items.id))
        setLoading(false);

        toast.success("Product added to cart successfully",)
      } catch (error) {
        setLoading(false);
        toast.error("Error adding product to cart")
        console.error(error);
      }
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={true} />
          <Mymodal isOpen={isModalOpen} onClose={closeModal}>
            {/* Content for your modal */}
            <div>
              <h1 className="text-lg font-bold mb-2">Cart is Empty</h1>
              <p>You have to log in to buy</p>
            </div>
          </Mymodal>
      {
        prop.items?
        <div className="w-full min-h-[320px] max-h-[320px] relative group max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <ScrollToTop/>
      <Link to={`/${prop.type}/${prop.items.id}`}>
        <img
          className="p-8 rounded-t-lg w-full h-[200px] object-contain "
          src={prop.items.image}
          alt="productimage"
        />
      </Link>
      <div className="px-5 flex flex-col pb-5">
        <Link to={`/${prop.type}/${prop.items.id}`}>
          <h5 className="text-[16px] font-normal tracking-tight text-gray-900 dark:text-white">
            {prop.items.productname}
          </h5>
        </Link>
        <div className="flex items-center space-y-1 space-x-1 rtl:space-x-reverse">
          {renderRating()}
        </div>
        <div className="flex items-center justify-between mt-2.5 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {prop.items?.rating}
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            Rs. {prop.items.price}
          </span>
        </div>
      </div>
      <div className=" absolute right-[10px] top-[10px] translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 ease ">
        <div>
          {
            loading?<></>:
            <button onClick={addtoCart} className="active:bg-blue-300 active:text-white p-2 rounded cursor-pointer text-black border border-slate-300 hover:border-blue-600 hover:text-blue-600 ">
            <BsBagPlus />
          </button>
          }
        </div>
      </div>
    </div>
        :<div>Loading</div>
      }
    </>
  );
};

export default ProductItems;
