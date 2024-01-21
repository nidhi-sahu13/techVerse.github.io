import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../Components/Layout/Layout";
import { SubNav } from "../Components/Navbar/SubNav";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import myContext from "../context/Data/myContext";
import Mymodal from "../Components/modal/Mymodal";
import { Bars } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity } from "../redux/cartRedux";
import ScrollToTop from "../Components/HomeItems/ScrollToTop";
import CartRight from "../Components/Cart/CartRight";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Productpage = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  // context data
  const context = useContext(myContext);
  const { islogged, CurrentUser } = context;

  const Navigate = useNavigate();

  const isProductPresentInCart = useSelector((state) => {
    return state.cart?.productsId?.includes(id);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        let AllProduct = {};
        let path = `products-${type.toUpperCase()}`;
        const snapshot = await getDocs(collection(db, path));

        snapshot.forEach((doc) => {
          if (doc.id === id) {
            AllProduct = { ...doc.data(), id: doc.id };
          }
        });

        setProduct(AllProduct);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoadingSkeleton(false);
      }
    };

    getProducts();
  }, [type, id]);

  const rate = Number(product.rating);

  const renderRating = () => {
    const ratingElements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        ratingElements.push(<IoMdStar key={i} className="text-blue-600" />);
      } else {
        ratingElements.push(<IoMdStar key={i} className="text-gray-300 " />);
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
          productid: product.id,
          category: product.category,
          quantity: 1,
        });
        dispatch(increaseQuantity(product.id));
        setLoading(false);

        toast.success("Product added to cart successfully");
      } catch (error) {
        setLoading(false);
        toast.error("Error adding product to cart");
        console.error(error);
      }
    } else {
      openModal();
    }
  };

  const goToCart = () => {
    Navigate(`/cart/products`);
  };

  const buy = () => {
    if (islogged) {
      handleShowCartLeftModal();
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

  const [isCartLeftModalOpen, setIsCartLeftModalOpen] = useState(false);

  const handleShowCartLeftModal = () => {
    setIsCartLeftModalOpen(true);
  };

  const handleCloseCartLeftModal = () => {
    setIsCartLeftModalOpen(false);
  };

  return (
    <Layout>
      <SubNav />

      {isCartLeftModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className=" flex items-center justify-center min-h-screen pt-4 px-4 pb-20 tex:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block relative align-bottom bg-white w-fit rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle ">
              <CartRight tprice={product?.price} ship={50} gst={0} />
              <div onClick={handleCloseCartLeftModal} className="absolute top-0 right-0 py-2 px-4 text-xl cursor-pointer ">&#x2716;</div>
            </div>
          </div>
        </div>
      )}

      {!loadingSkeleton ? (
        <div className="pt-9 mt-10">
          <ScrollToTop />
          <Toaster position="top-center" reverseOrder={true} />
          <Mymodal isOpen={isModalOpen} onClose={closeModal}>
            {/* Content for your modal */}
            <div>
              <h1 className="text-lg font-bold mb-2">Cart is Empty</h1>
              <p>You have to log in to buy</p>
            </div>
          </Mymodal>
          <div
            style={{
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              background:
                "linear-gradient(70deg, rgb(255, 254, 254) 0%, rgb(250, 250, 250) 35%, rgb(255, 255, 255) 100%)",
            }}
            className="flex p-1 gap-x-2 md:w-[90%] m-auto flex-wrap "
          >
            <div className=" w-[300px]">
              <img
                className="w-full h-[400px] p-5 object-contain rounded-sm border-none outline-none "
                src={product.image}
                alt=""
              />
            </div>
            <div className="px-5 pb-8 pt-10 min-w-[362px] flex gap-y-4 flex-col flex-1">
              <div className=" text-4xl font-medium mb-0">
                {product.productname}
              </div>
              <div className=" text-lg font-medium tracking-wide ">
                Rs. {product.price}
              </div>
              <div className="flex flex-wrap justify-between ">
                <div>
                  <p className="w-full text-slate-700"> {product.desc} </p>
                </div>
              </div>
              <p className="text-slate-700">{product.warranty}</p>
              <div className="text-xl flex items-center">
                <p className=" text-lg font-normal tracking-wide  mr-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
                    {product?.rating}
                  </span>{" "}
                </p>
                {renderRating()}{" "}
              </div>

              <div className="flex gap-x-3 ">
                <button
                  onClick={isProductPresentInCart ? goToCart : addtoCart}
                  type="button"
                  className=" items-center rounded h-10 w-[150px] justify-center bg-blue-600 px-4 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] relative inline-flex overflow-hidden border border-blue-500 group "
                >
                  {loading ? (
                    <Bars
                      visible={true}
                      height="25"
                      width="25"
                      color="#fff"
                      riaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <>
                      {isProductPresentInCart ? (
                        <>
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
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
                          <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
                            Go to Cart
                          </span>
                          <span className="relative invisible">
                            Back to Home
                          </span>
                        </>
                      ) : (
                        <>
                          <FaCartPlus className="mr-1 h-4 w-4" />
                          Add to cart
                        </>
                      )}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={buy}
                  className="text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-0 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-9 mt-10">
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={true} />
      <Mymodal isOpen={isModalOpen} onClose={closeModal}>
        {/* Skeleton content for your modal */}
        <div>
          <h1 className="text-lg font-bold mb-2">
            <Skeleton width={150} height={20} />
          </h1>
          <p>
            <Skeleton count={3} />
          </p>
        </div>
      </Mymodal>
      <div
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
          background:
            "linear-gradient(70deg, rgb(255, 254, 254) 0%, rgb(250, 250, 250) 35%, rgb(255, 255, 255) 100%)",
        }}
        className="flex p-1 gap-x-2 md:w-[90%] m-auto "
      >
        <div className=" w-[300px]">
          {/* Skeleton for product image */}
          <Skeleton height={400} />
        </div>
        <div className="px-5 pb-8 pt-10 flex gap-y-4 flex-col flex-1">
          <div className="text-4xl font-medium mb-0">
            {/* Skeleton for product name */}
            <Skeleton width={200} height={32} />
          </div>
          <div className="text-lg font-medium tracking-wide">
            {/* Skeleton for product price */}
            <Skeleton width={100} height={20} />
          </div>
          <div className="flex flex-wrap justify-between">
            <div>
              {/* Skeleton for product description */}
              <Skeleton count={3} />
            </div>
          </div>
          <p className="text-slate-700">
            {/* Skeleton for product warranty */}
            <Skeleton count={1} />
          </p>
          <div className="text-xl flex items-center">
            <p className="text-lg font-normal tracking-wide  mr-4">
              {/* Skeleton for product rating */}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
                <Skeleton width={20} height={14} />
              </span>
            </p>
            {/* Skeleton for product rating stars */}
            {Array(5)
              .fill()
              .map((_, index) => (
                <Skeleton key={index} width={20} height={20} style={{ marginRight: '4px' }} />
              ))}
          </div>
          <div className="flex gap-x-3 ">
            <button
              type="button"
              className=" items-center rounded h-10 w-[150px] justify-center bg-blue-600 px-4 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] relative inline-flex overflow-hidden border border-blue-500 group "
            >
              {/* Skeleton for add to cart button */}
              <Skeleton width={50} height={18} />
            </button>
            <button
              type="button"
              className="text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-0 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {/* Skeleton for buy now button */}
              <Skeleton width={80} height={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
      )}
    </Layout>
  );
};

export default Productpage;
