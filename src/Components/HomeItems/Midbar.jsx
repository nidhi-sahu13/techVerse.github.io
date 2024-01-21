import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import NewProducts from "../Stocks/NewProducts";
import BestSeller from "../Stocks/BestSeller";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import TopBrands from "../Stocks/TopBrands";

export const Midbar = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [traind, setTraind] = useState([]);
  const [bestSeller, setBestseller] = useState([]);

  useEffect(() => {
    const allData = async () => {
      const mobileProductsSnapshot = await getDocs(
        collection(db, "products-MOBILE")
      );
      const mobileProducts = mobileProductsSnapshot.docs.map((doc) =>
        doc.data()
      );
      // Fetch documents from 'product-laptop' collection
      const laptopProductsSnapshot = await getDocs(
        collection(db, "products-LAPTOP")
      );
      const laptopProducts = laptopProductsSnapshot.docs.map((doc) =>
        doc.data()
      );
      // Fetch documents from 'product-bluetooth' collection
      const bluetoothProductsSnapshot = await getDocs(
        collection(db, "products-BLUETOOTH")
      );
      const bluetoothProducts = bluetoothProductsSnapshot.docs.map((doc) =>
        doc.data()
      );
      // Fetch documents from 'product-tablet' collection
      const tabProductsSnapshot = await getDocs(
        collection(db, "products-TABLET")
      );
      const tabProducts = tabProductsSnapshot.docs.map((doc) => doc.data());
      // Fetch documents from 'product-TV' collection
      const TVProductsSnapshot = await getDocs(collection(db, "products-TV"));
      const tvProducts = TVProductsSnapshot.docs.map((doc) => doc.data());
      // Fetch documents from 'product-watch' collection
      const watchProductsSnapshot = await getDocs(
        collection(db, "products-WATCH")
      );
      const watchProducts = watchProductsSnapshot.docs.map((doc) => doc.data());

      const productsWithId = [];
    
      // Function to combine product data with IDs
      const combineWithId = (products, snapshot) => {
        snapshot.docs.forEach((doc, index) => {
          productsWithId.push({
            id: doc.id, // Document ID
            ...products[index], // Product data
          });
        });
      };
    
      // Combine product data with IDs
      combineWithId(mobileProducts, mobileProductsSnapshot);
      combineWithId(laptopProducts, laptopProductsSnapshot);
      combineWithId(tvProducts, TVProductsSnapshot);
      combineWithId(watchProducts, watchProductsSnapshot);
      combineWithId(tabProducts, tabProductsSnapshot);
      combineWithId(bluetoothProducts, bluetoothProductsSnapshot);
     
      // Shuffle the array
      const shuffledProducts = shuffleArray(productsWithId);
    
      // Select the first five elements for random display
      const randomFiveProducts = shuffledProducts.slice(0, 5);
      setRandomProducts(randomFiveProducts);
    
    
      // trainding
      setTraind(shuffledProducts.slice(10, 15));
    
      // bestseller
      setBestseller(shuffledProducts.slice(10, 13));
      // Sort the products based on the 'rating' property
      const sortedProducts = [...productsWithId].sort((a, b) => {
        const ratingA = a.rating || 0; // Use 0 if 'rating' is undefined or null
        const ratingB = b.rating || 0; // Use 0 if 'rating' is undefined or null
    
        return ratingB - ratingA; // Sort in descending order, for ascending, swap 'ratingB' and 'ratingA'
      });
    
      // Store top rated products with their IDs
      setRatings(sortedProducts.slice(0, 5));

    };
    allData();
  }, []);

  // Function to shuffle array elements randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className=" w-full md:w-[95%] mx-auto mt-10" id="midbar">
      <div className="flex gap-x-4 ">
        <div className=" hidden md:block h-fit sticky top-8">
          <Categories />
          <BestSeller filterData = {bestSeller} />
        </div>
        <div className=" max-w-full overflow-y-auto">
          <div className="flex gap-x-4 mx-2 flex-wrap ">
          <NewProducts filterData={randomProducts} name="New Arrival" />
          <NewProducts filterData={traind} name="Trainding" />
          <NewProducts filterData={ratings} name="High Rating" />
          </div>
        </div>
      </div>
      <div>
        <TopBrands/>
      </div>
    </div>
  );
};
