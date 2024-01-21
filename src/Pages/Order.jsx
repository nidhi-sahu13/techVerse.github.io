import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Components/Layout/Layout";
import myContext from "../context/Data/myContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";
import { useParams } from "react-router";
import ScrollToTop from "../Components/HomeItems/ScrollToTop";
import Skeleton from "react-loading-skeleton";

export default function Order() {
  const [productDetails, setProductDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // context data
  const context = useContext(myContext);
  const { islogged, CurrentUser, productsWithId } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (islogged && CurrentUser) {
        try {
          const subCollectionRef = doc(db, 'order', id);
          const docSnapshot = await getDoc(subCollectionRef);

          if (docSnapshot.exists()) {
            const orderData = docSnapshot.data();
            const array = [];
            for (let productId of orderData.products) {
              
              const product = productsWithId.find((data) => data.id === productId);
              
              if (product) {
                array.push(product);
              }
            }
            // Assuming 'products' is an array field in your document
            setProductDetails(array);
            setOrderDetails(orderData);
          } else {
            console.log("data not found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      }
    };

    fetchData();
  }, [islogged, CurrentUser, id, productsWithId]);

  if (loading && productDetails.length === 0) {
    // You can replace this with a loading spinner or any other loading indicator
    return <main className="flex w-[95%] gap-x-5 flex-col md:flex-row flex-wrap mx-auto mt-7 ">
    <ScrollToTop />
    <div className="md:flex-[3] flex-1 relative flex flex-col gap-y-3 ">
      <h1 className=" absolute -top-8 text-sm font-semibold ">
        <span className="text-slate-600 text-lg">OrderId</span> <Skeleton width={50} height={20} />
      </h1>
      {/* ... Other content ... */}
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
        className="h-60 flex flex-col rounded overflow-y-auto orderScroll "
      >
        {/* Skeleton for productDetails */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex p-4 border-b border-slate-100 ">
            <Skeleton width={112} height={80} />
            <div className="flex-1 h-fit flex justify-between px-2 gap-x-2 flex-wrap pt-3 ">
              <Skeleton width={150} height={20} />
              <Skeleton width={80} height={20} />
              <Skeleton width={30} height={20} />
              <Skeleton width={80} height={20} />
            </div>
          </div>
        ))}
      </div>
      {/* ... Other content ... */}
    </div>
    {/* ... Other content ... */}
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
      }}
      className="flex-1 min-w-[270px] p-3 flex flex-col gap-y-6 rounded-sm "
    >
      {/* Skeleton for Customer section */}
      <Skeleton width={180} height={20} />
      {/* Skeleton for user avatar and name */}
      <div className="flex gap-x-4 pb-1 items-center border-b border-slate-100">
        <Skeleton circle width={24} height={24} />
        <Skeleton width={100} height={20} />
      </div>
      {/* Skeleton for product count */}
      <div className="flex gap-x-4 items-center pb-1 border-b border-slate-100">
        <Skeleton circle width={24} height={24} />
        <Skeleton width={150} height={20} />
      </div>
      {/* Skeleton for Contact Info */}
      <div>
        <Skeleton width={180} height={20} className="mb-2" />
        <div className="flex flex-col gap-y-2 pb-2 border-b border-slate-100">
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
        </div>
      </div>
      {/* Skeleton for Shipping Address */}
      <div>
        <Skeleton width={180} height={20} className="mb-2" />
        <div className="flex flex-col gap-y-1 pb-2 border-b border-slate-100">
          <Skeleton width={300} height={60} />
        </div>
      </div>
    </div>
  </main>;
  }

  return (
    <Layout>
      <main className="flex w-[95%] gap-x-5 flex-col md:flex-row flex-wrap mx-auto mt-7 ">
        <ScrollToTop/>
        <div className="md:flex-[3] flex-1 relative flex flex-col gap-y-3 ">
          <h1 className=" absolute -top-8 text-sm font-semibold ">
            <span className="text-slate-600 text-lg">OrderId</span> #{id}
          </h1>
          <div
            style={{
              boxShadow:
                "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            }}
            className="h-60 flex flex-col rounded overflow-y-auto orderScroll "
          >
            {productDetails?.map((data,ind) => {
              
              return (
                <div key={ind} className=" flex h-32 p-4 border-b border-slate-100 ">
                  <div className="w-[112px]">
                    <img
                      src={data.image}
                      className=" object-contain w-full h-full"
                      alt="images"
                    />
                  </div>
                  <div className="flex-1 h-fit flex justify-between px-2 gap-x-2 flex-wrap pt-3 ">
                    <h1>{data.productname}</h1>
                    <p>{data.brand}</p>
                    <p>Rs. {data.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              boxShadow:
                "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            }}
            className="h-32 rounded-sm p-3 "
          >
            <h1 className=" text-xl font-semibold -tracking-tight">Delivery</h1>
            <div className=" flex gap-x-4 pt-4">
              <div className=" basis-28 self-center">
                <img
                  className="h-full w-full object-contain"
                  src="/logo/fedex.svg"
                  alt="fedex"
                />
              </div>
              <div className=" flex justify-between w-full">
                <div className="">
                  <h1 className="text-[1.1rem] font-medium">FedEx</h1>
                  <p className=" text-base font-medium text-slate-500">
                    First class package
                  </p>
                </div>
                <div className=" pr-4">Rs. 20</div>
              </div>
            </div>
          </div>
          <div
            style={{
              boxShadow:
                "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            }}
            className="h-40 rounded-sm flex flex-col"
          >
            <div className="p-3 pb-0 flex-[2]">
              <h1 className=" text-xl font-semibold -tracking-tight">
                Payment Summery
              </h1>
              <div className="py-2">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <span className="text-[0.9rem] font-medium text-slate-800">
                      Subtotal
                    </span>{" "}
                    <span className="text-[0.8rem] font-normal text-slate-600">
                      ({productDetails.length} items)
                    </span>
                  </div>
                  <div className="text-sm">Rs. {orderDetails.totalAmount}</div>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <span className="text-[0.9rem] font-medium text-slate-800">
                      Delivery
                    </span>{" "}
                  </div>
                  <div className="text-sm">Rs. 20.00</div>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <span className="text-[0.9rem] font-medium text-slate-800">
                      Tax
                    </span>{" "}
                    <span className="text-[0.8rem] font-normal text-slate-600">
                      (PDV 20% included)
                    </span>
                  </div>
                  <div className="text-sm">Rs. 00.00</div>
                </div>
              </div>
            </div>
            <div className=" flex-1 flex flex-wrap rounded-sm px-3 py-1 justify-between items-center bg-[#f9fafc] ">
              <h1 className="text-base font-medium text-slate-700">
                total paid by customer
              </h1>
              <p className="text-sm">Rs. {orderDetails.totalAmount}</p>
            </div>
          </div>
        </div>
        <div
          style={{
            boxShadow:
              "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
          }}
          className="flex-1 min-w-[270px] p-3 flex flex-col gap-y-6 rounded-sm "
        >
          <h1 className=" text-xl font-semibold -tracking-tight">Customer</h1>
          <div className="flex gap-x-4 pb-1 items-center border-b border-slate-100">
            <div className=" basis-12">
              <img
                src="/logo/user.png"
                alt="dp"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-medium text-base text-slate-700">
                {CurrentUser[0]?.username}
              </h1>
            </div>
          </div>
          <div className="flex gap-x-4 items-center pb-1 border-b border-slate-100">
            <div className=" basis-12">
              <img
                src="/logo/product.png"
                alt="product"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-medium text-base text-slate-700"> {productDetails.length} Orders</h1>
            </div>
          </div>
          <div>
          <h1 className="text-base font-medium mb-2 text-slate-700">Cantact info</h1>
          <div className="flex flex-col gap-y-2 pb-2 border-b border-slate-100">
            <div className="text-sm flex flex-wrap gap-x-2 items-center text-slate-600">
              <span><MdOutlineMailOutline className="text-lg" /> </span> <span>{CurrentUser[0]?.email} </span>
            </div>
            <div className="text-sm flex flex-wrap items-center gap-x-2 text-slate-600">
              <span ><HiOutlinePhone className="text-lg "/> </span> <span> +91 {CurrentUser[0]?.number} </span>
            </div>
          </div>
          </div>
          <div>
          <h1 className="text-base font-medium mb-2 text-slate-700">
            Shipping Address
          </h1>
          <div className="flex flex-col gap-y-1 pb-2 border-b border-slate-100">
            <p className="text-sm text-slate-600">
              1007, punjagutta, colony <br /> near metro, <br />
              heritage hostal, <br /> Hyderabad telangana, india
            </p>
          </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
