import React, { useContext, useState ,useEffect} from "react";
import { Layout } from "../Layout/Layout";
import myContext from "../../context/Data/myContext";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsBagPlus } from "react-icons/bs";
import { SubNav } from "../Navbar/SubNav";
import ScrollToTop from "../HomeItems/ScrollToTop";
import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import Mymodal from "../modal/Mymodal";
import { Toaster, toast } from "react-hot-toast";
import { increaseQuantity } from "../../redux/cartRedux";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";


export const Brands = () => {
  const urlparams = new URLSearchParams(window.location.search);
  const context = useContext(myContext);
  const {islogged,CurrentUser, productsWithId } = context;
  const urldata = urlparams.get('searchTerm');
  const searchdata = urlparams.get('search');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        let filteredProducts;
  
        if (urldata !== null) {
          const filterBrand = productsWithId.filter((ele) => ele.brand === urldata);
          filteredProducts = filterBrand;
        } else {
          filteredProducts = productsWithId.filter(
            (product) =>
              product.productname.toLowerCase().includes(searchdata.toLowerCase()) ||
              product.category.toLowerCase().includes(searchdata.toLowerCase())
          );
        }
  
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error(error);
      } 
    };
  
    fetchData();
  }, [urldata, searchdata, productsWithId]);

  
  const renderRating = (rate) => {
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

  const addtoCart = async (id,category) => {
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
          productid: id,
          category: category,
          quantity: 1,
        });
        dispatch(increaseQuantity(id))
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
    <Layout>
      <SubNav />
      <Toaster position="top-center" reverseOrder={true} />
      <Mymodal isOpen={isModalOpen} onClose={closeModal}>
            {/* Content for your modal */}
            <div>
              <h1 className="text-lg font-bold mb-2">Can not acces cart</h1>
              <p>You have to log in to buy</p>
            </div>
          </Mymodal>
      <div className=" md:w-[90%] md:mx-auto mt-20 ">
        <ScrollToTop />
        <div className=" mb-5">
          <h1 className=" text-lg font-medium  border-b border-slate-300 py-2 text-slate-700 ">
            {urldata || searchdata}
          </h1>
        </div>
        <div className=" flex flex-wrap justify-around gap-5 items-center">
          {searchResults.length<1 ? ( // Check if loading is true, show skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-full min-h-[320px] max-h-[320px] relative group max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm">
                <Skeleton height={200} />
                <div className="px-5 flex flex-col pb-5">
                  <Skeleton height={16} width={150} />
                  <Skeleton height={12} width={100} />
                  <div className="flex items-center space-y-1 space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} height={18} width={18} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2.5 mb-2">
                    <Skeleton height={12} width={60} />
                  </div>
                </div>
                <div className="absolute right-[10px] top-[10px] translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 ease ">
                  <div>
                    <Skeleton height={25} width={25} circle={true} />
                  </div>
                  <div>
                    <Skeleton height={25} width={25} circle={true} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Render actual data when not loading
            searchResults.map((filterdata, index) => (
              <div key={index} className="w-full min-h-[320px] max-h-[320px] relative group max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/${filterdata.category}/${filterdata.id}`}>
                  <img
                    className="p-8 rounded-t-lg w-full h-[200px] object-contain "
                    src={filterdata.image}
                    alt="productimage"
                  />
                </Link>
                <div className="px-5 flex flex-col pb-5">
                  <Link to={`/${filterdata.category}/${filterdata.id}`}>
                    <h5 className="text-[16px] font-normal tracking-tight text-gray-900 dark:text-white">
                      {filterdata.productname}
                    </h5>
                  </Link>
                  <div className="flex items-center space-y-1 space-x-1 rtl:space-x-reverse">
                    {renderRating(filterdata?.rating)}
                  </div>
                  <div className="flex items-center justify-between mt-2.5 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      {filterdata?.rating}
                    </span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      Rs. {filterdata.price}
                    </span>
                  </div>
                </div>
                <div className=" absolute right-[10px] top-[10px] translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 ease ">
                  <div>
                    {
                      loading?<></>:
                      <button onClick={() => addtoCart(filterdata?.productid, filterdata?.category)} className="active:bg-blue-300 active:text-white p-2 rounded cursor-pointer text-black border border-slate-300 hover:text-blue-600 ">
                      <BsBagPlus />
                    </button>
                    }                   
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};
