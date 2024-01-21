import React, { useState, useEffect } from "react";
import MyContext from "./myContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../redux/cartRedux";

function MyState(props) {
  const [islogged, setIslogged] = useState(null);
  const [productsWithId, setProductsWithId] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
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

      setProductsWithId(productsWithId);
    };

    fetchData();
  }, []);

  const GetUser = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        setIslogged(userlogged);
        if (userlogged) {
          const getUser = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUser();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const CurrentUser = GetUser();

  useEffect(() => {
    const fetchCartData = async () => {

      if (islogged && CurrentUser) {
        try {
          const subCollectionRef = collection(
            db,
            `cart/${CurrentUser[0].uid}/UserItems`
          );

          const querySnapshot = await getDocs(subCollectionRef);
          const productId = []
          querySnapshot.docs.forEach((data) => {
            productId.push(data.data().productid)
          })
          dispatch(setQuantity({ quantity: querySnapshot.size, id: productId }))

        } catch (error) {
          console.error(error);
          // Handle the error if needed
        }
      } else {
      }
    };

    fetchCartData();
  }, [islogged, CurrentUser, dispatch]);

  return (
    <MyContext.Provider value={{ islogged, CurrentUser, productsWithId }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
