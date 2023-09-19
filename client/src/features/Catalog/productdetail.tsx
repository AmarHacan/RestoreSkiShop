import {
  Divider,
  Grid,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/model/Product";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/StoreContext.tsx/StoreContext";
import { LoadingButton } from "@mui/lab";
import { ifError } from "assert";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>("");
  const [quantity, setQuantity] = useState(0);
  const { basket, setBasket, removeItem } = useStoreContext();
  const item =
    basket?.items.find((item) => item.productId == product?.id) ?? null;
  const [submitting, setsubmitting] = useState(false);
  useEffect(() => {
    if (item) setQuantity(item.quantity);

    id &&
      agent.catalog
        .details(parseInt(id))
        .then((product) => setProduct(product))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }
  function handleUpdateCart() {
    setsubmitting(true);
    if (!item || quantity >= item.quantity) {
      const updatedquantity = item ? quantity - item.quantity : quantity;
      agent.basket
        .addItem(product?.id!, updatedquantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setsubmitting(false));
    } else {
      const updatedquantity = item.quantity - quantity;
      agent.basket
        .removeItem(product?.id!, updatedquantity)
        .then(() => removeItem(product?.id!, updatedquantity))
        .catch((error) => console.log(error))
        .finally(() => setsubmitting(false));
    }
  }

  if (isLoading) return <LoadingComponents />;
  if (!product) return <h3>product not found {error}</h3>;
  if (error) return <Typography>{error}</Typography>;
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
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Divider sx={{ mb: 4 }} />
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

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                label="Quantity in Cart"
                type="number"
                fullWidth
                value={quantity}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={
                  item?.quantity === quantity || (!item && quantity == 0)
                }
                sx={{ height: "55px" }}
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                loading={submitting}
                onClick={handleUpdateCart}
              >
                {item ? "Update Quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
// useEffect(() => {
//   axios
//     .get(`http://localhost:5000/api/products/${id}`)
// .then((response) => setProduct(response.data))
// .catch((error) => console.log(error))
// .finally(() => setLoading(false));
// }, [id]);
