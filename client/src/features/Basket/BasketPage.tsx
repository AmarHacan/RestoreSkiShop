import { useContext, useEffect, useState } from "react";
import { Basket } from "../../app/model/Basket";
import agent from "../../app/api/agent";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingComponents from "../../app/layout/LoadingComponent";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/StoreContext.tsx/StoreContext";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import Checkout from "../Checkout/Checkout";
import { Link } from "react-router-dom";

interface Props {
  productId: number;
}

export default function BasketPage() {
  const { removeItem, basket, setBasket } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function HandleAddItem(
    productId: number,
    quantity: number = 1,
    name: string
  ) {
    setStatus({ loading: true, name: name });
    agent.basket
      .addItem(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function HandleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name: name });
    agent.basket
      .removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .then()
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));

    console.log(basket);
  }

  if (basket == null) return <>Not Found Basket</>;
  if (basket.items.length == 0) return <>items null</>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Sub-Total&nbsp;</TableCell>
              {/* <TableCell align="right">&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* {item.name} */}
                  <Box display="flex">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 20, marginRight: 30 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading && status.name == "rem" + item.productId
                    }
                    onClick={() =>
                      HandleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name == "add" + item.productId
                    }
                    onClick={() =>
                      HandleAddItem(item.productId, 1, "add" + item.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="center">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </TableCell>

                {/* <TableCell align="right">{item.tyer}</TableCell> */}
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading && status.name == "del" + item.productId
                    }
                    color="error"
                    onClick={() =>
                      HandleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
                    sx={{ alignContent: "center" }}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
