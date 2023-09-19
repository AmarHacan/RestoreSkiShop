
//Array of products 
// const products = [
//   {name : "product1", price:100.00 },
//   {name: "product2", price:200.00},
//   {name: "product2", price:200.00},
// ]

import { useContext, useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet, useFetcher } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../StoreContext.tsx/StoreContext";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponent";
import { getCookie } from "../util/util";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>
  {
    const buyerId = getCookie('buyerId');
    // try catch for error handling
    // async await
    if(buyerId){
      agent.basket.getTUserBasket()
      .then(basket=>setBasket(basket))
      .catch(error=>console.log("App.tsx getbasket by buyer id",error))
      .finally(()=>setLoading(false))
    } else{
      setLoading(false);
    }
  },[]);



  const [darkMode , setDarkMode ] = useState<boolean>(false);
  const paletteType= darkMode? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode : paletteType,
      background:{
        default: paletteType === "light" ? "#eaeaea" :"#121212",
      }}})
  function handleThemeChange(){
  setDarkMode(!darkMode);
}

if(loading) return <LoadingComponents message="Initializing App... Getting the FBasket"/>

  return (
    
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar position="bottom-right" theme="colored"/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
<CssBaseline/>
    <Container>
      <Outlet />    
    </Container>
    </ThemeProvider>
  );
}

export default App;
