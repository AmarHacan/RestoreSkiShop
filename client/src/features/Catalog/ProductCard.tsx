import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, CssBaseline } from "@mui/material";
import { Product } from "../../app/model/Product";
import Header from "../../app/layout/Header";
import { Link, NavLink } from "react-router-dom";
import { Fragment, useState } from "react";
import React from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/StoreContext.tsx/StoreContext";
import { CurrencyFormat } from "../../app/util/util";

interface Props{
    product : Product;
}
export default function ProductCard({product}:Props){
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();
    //function to add clicked item to the basket based on the product id present on the card or product
    
    
    function handleAddItem(productId:number){
      setLoading(true);
      agent.basket.addItem(productId)
      .then(response=>setBasket(response))
      .then(error=>console.log(error))
      .finally(()=>setLoading(false));
    }


    return(<>

    <Card sx={{ maxWidth: 345 }} >
    
     <CardHeader
     avatar={
        <Avatar sx={{bgcolor:'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
        </Avatar>
     } 
    title={product.name}
    titleTypographyProps={{sx:{fontWeight:'bold' , color:'primary.main'}
        }}

     />
      <CardMedia
        sx={{ height: 140, backgroundSize:"contain" , backgroundColor:"primary.light" }}
        image={product.pictureUrl}
        title={product.name} 
        
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" >
          {CurrencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={()=>handleAddItem(product.id)} size="small" >Add to Cart</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card></>
    )
}