import {
    Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/model/Product";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponent";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>("");


useEffect(()=>{
        id && agent.catalog.details(parseInt(id))
        .then(product=>setProduct(product))
    .catch((error) => setError(error))
      .finally(() => setLoading(false));;
}
,[id]);




  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/products/${id}`)
      // .then((response) => setProduct(response.data))
      // .catch((error) => console.log(error))
      // .finally(() => setLoading(false));
  // }, [id]);



  if (isLoading) return <LoadingComponents/>;
  if (!product) return <h3>product not found {error}</h3>;
if(error) return <Typography>{error}</Typography>
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" >
            {product.name}
          </Typography>
            <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Divider sx={{mb:4}}/>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Type.</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                                <TableRow>
                  <TableCell>Quantity</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
