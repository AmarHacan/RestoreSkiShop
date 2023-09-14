import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError(){
    const {state} = useLocation();

    return(<>
    <Container component={Paper}>
       
        {state?.data? (<>

        <Typography>{state.data.title} </Typography>
        
        <Divider/>
        
        <Typography variant="body1">{state.data.detail || 'Internal Server Error'}</Typography>
        </>)    :   <Typography gutterBottom variant="h5" >Server Error</Typography>
}
    </Container>

    </>

)

}