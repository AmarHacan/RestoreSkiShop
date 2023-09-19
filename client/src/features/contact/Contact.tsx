import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Basket } from "../../app/model/Basket";
import agent from "../../app/api/agent";


 
export default function Contact(){

    const [basket,setBasket]=useState<Basket | null>();
    const [error,setError]=useState<any>();
    const [loading,setLoading]=useState<boolean>(true);

    useEffect(()=>{
            agent.basket.getTUserBasket()
    .then(basket=>setBasket(basket))
    .catch(error=>setError(error))
    .finally(()=>setLoading(false))
    }
    ,[]);
    console.log(basket);
    return(<>
        
        <Typography variant="h1">{basket && basket.buyerId}</Typography>
        <Typography variant="h1">{basket && basket.items.length}</Typography>
        
        </>)
}