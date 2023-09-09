
//Array of products 
// const products = [
//   {name : "product1", price:100.00 },
//   {name: "product2", price:200.00},
//   {name: "product2", price:200.00},
// ]

import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";



function App() {
  const [darkMode , setDarkMode ] = useState<boolean>(false);
  const paletteType= darkMode? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode : paletteType,
      background:{
        default: paletteType === "light" ? "#eaeaea" :"#121212",
      }
    }
  })
function handleThemeChange(){
  setDarkMode(!darkMode);
}
  return (
    
    <ThemeProvider theme={theme}>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
<CssBaseline/>
    <Container>
      <Outlet />    
    </Container>
    </ThemeProvider>
  );
}

export default App;
