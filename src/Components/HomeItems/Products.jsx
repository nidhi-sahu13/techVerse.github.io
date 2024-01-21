import React, { useEffect, useState } from 'react'
import { Layout } from '../Layout/Layout'
import Banner from './Banner'
import { SubNav } from '../Navbar/SubNav'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import ProductItems from './ProductItems'

const Products = (prop) => {
    const mobile = '/Images/mbanner1.jpg'
    const laptop = '/Images/mbanner2.webp'
    const tablet = '/Images/mbanner3.jpg'
    const tv = '/Images/mbanner4.jpg'
    const watch = '/Images/mbanner5.jpg'
    const BannerImage = [mobile,laptop,tablet,tv,watch]

    const [product, setProduct] = useState([])
    useEffect(()=>{
        const getProducts = async () =>{
            const AllProduct = [];
            let path = `products-${prop.type.toUpperCase()}`;
            await getDocs(collection(db,path)).then((SnapShot)=>{
                SnapShot.forEach((doc)=>{
                    AllProduct.push({...doc.data(),id:doc.id})
                })
                setProduct(AllProduct)
            }).catch((err)=>{
                console.log(err.message);
            })
        }
        getProducts();
    },[prop.type])
  return (
    <Layout>
        <SubNav/>
        <Banner images = {BannerImage}/>
        <div className=' md:w-[90%] md:mx-auto mt-10 '>
            <div className=' mb-5' ><h1 className=' text-lg font-medium  border-b border-slate-300 py-2 text-slate-700 '>{prop.alias}</h1></div>
            <div className=' flex flex-wrap justify-around gap-5 items-center'>
            {
                product.map((data)=>{
                    return <ProductItems key = {data.id} items = {data} type = {prop.type} />
                })
            }
            </div>
        </div>
    </Layout>
  )
}

export default Products