import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, CssBaseline } from "@mui/material";
import { Product } from "../../app/model/Product";
import Header from "../../app/layout/Header";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react";
import React from "react";

interface Props{
    product : Product;
}
export default function ProductCard({product}:Props){
    
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
          ${(product.price/100).toFixed(2) }
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card></>
    )
}