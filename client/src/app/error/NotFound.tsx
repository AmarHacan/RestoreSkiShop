import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { link } from "fs/promises";
import { Link, useLocation } from "react-router-dom";

export default function NotFound(){
    const {state} = useLocation();



    return(
        <Container component={Paper}>
        {state?.error?(
        <>
        <Typography variant="h4" >{state.error.title}</Typography>
        <Typography>{state.error.status + " Not Found of Bad Request" }</Typography>
        </>
        ):(
        <>
        <Typography variant="h3">{"Request Not Found of Bad Request" }</Typography>
        </>
         )}
         <Divider/>
         <Button component={Link} to='/catalog' >Goto Catalog Page</Button>
        </Container>
    );
}