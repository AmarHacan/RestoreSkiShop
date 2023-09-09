import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/model/Product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog(){

  
    const [ products , setProducts ]=useState<Product[]>([]);
  

  //useeffect hook allow us to apply side effect to a component when it loads and in react we got access to componenet life cycle like what to do when component mounts and when it unmount and when its destroyeed and that is what useeffect is for
  //first parameter is a callback funtion
  //second parameter is dependcies and we place empty [] array as dependencies if we dont put it it will  recall every time it render/mounted and have a setproduct which cause it to rerenders and will stuck in infinite loop
  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
    .then(Response=>Response.json())
    .then(data=>setProducts(data));
  },[])

  // function addProduct(){
  //     setProducts(prevState => [...prevState,
  //       {
  //         id:prevState.length+1,
  //         name:"product"+(prevState.length+1),
  //       price:(prevState.length*100)+100,
  //       description:"any",
  //       pictureUrl:'http://picsum.photos/200',
  //       type:"asd",
  //       brand:"asd",
  //       quantityInStock:122,
  //     }])
  // }
    return(
       <> 
       <ProductList products={products}/>
      <Button variant="contained" /*onClick={addProduct}*/>Add Product</Button> 
    </>
    )
};

