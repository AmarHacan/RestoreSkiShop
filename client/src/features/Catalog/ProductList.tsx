import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";
import { Product } from "../../app/model/Product"
import ProductCard from "./ProductCard";
import { Grid4x4 } from "@mui/icons-material";



interface Props{
    products : Product[];
}
export default function ProductList({products}:Props){
    return(
      <Grid container spacing={4}>
        {products.map(product=>(
        <Grid item xs={3} key={product.id}>
       <ProductCard product={product}/>
        </Grid>
 
        ))}

      </Grid>
    )

}