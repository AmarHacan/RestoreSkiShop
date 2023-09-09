import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Catalog from "../../features/Catalog/Catalog";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}
const navBarMidLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const navBarRSideLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];
const navStyle={
                  color: "inherit",
                  typography: "h6",
                  "&:hover": {
                    border: "1px solid #00FF00",
                    color: "grey.300",
                    backgroundColor: "iherit",
                  },
                  "&.active": {
                    color: "text.primary",
                  },
                };
export default function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4, padding: 0 }}>
        <Toolbar sx={{display:'flex', justifyContent:"space-between"}}>
            
            <Box>
          <Typography
            variant="h6"
            component={NavLink}
            to={"/"}
            sx={{ color: "inherit", textDecoration: "none" }}>
            RE-STORE
          </Typography>
          <Switch onChange={handleThemeChange} checked={darkMode} />
          </Box>

          <List sx={{ display: "flex", justifyContent:"space-between" }}>
            {navBarMidLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display={'flex'} alignItems={'center'}>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent="3" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {navBarRSideLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{ color: "inherit", typography: "h6" ,navStyle}}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
