import React ,{useContext} from 'react'
import { Layout } from '../Layout/Layout'
import Banner from './Banner'
import { SubNav } from '../Navbar/SubNav'
import myContext from '../../context/Data/myContext'
import ProductItems from './ProductItems'

const Allproducts = (prop) => {
  // context data
  const context = useContext(myContext);
  const { productsWithId } = context;

  const mobile = "/Images/mobile.jpg";
  const laptop = "/Images/lapy.webp";
  const tablet = "/Images/tablet.jpg";
  const tv = "/Images/Moniter.jpg";
  const watch = "/Images/watch.jpg";
  const BannerImage = [mobile, laptop, tablet, tv, watch];

  return (
    <Layout>
        <SubNav/>
        <Banner images = {BannerImage}/>
        <div className=' md:w-[90%] md:mx-auto mt-10 '>
            <div className=' mb-5' ><h1 className=' text-lg font-medium  border-b border-slate-300 py-2 text-slate-700 '>{prop.alias}</h1></div>
            <div className=' flex flex-wrap justify-around gap-5 items-center'>
            {
                productsWithId.map((data)=>{
                    return <ProductItems key = {data.id} items = {data} type = {prop.type} />
                })
            }
            </div>
        </div>
    </Layout>
  )
}

export default Allproducts