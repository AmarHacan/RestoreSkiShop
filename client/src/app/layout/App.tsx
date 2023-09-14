
//Array of products 
// const products = [
//   {name : "product1", price:100.00 },
//   {name: "product2", price:200.00},
//   {name: "product2", price:200.00},
// ]

import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
