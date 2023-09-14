import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";
import { error } from "console";

export default function About(){
const [validationError, setValidationError]=useState([]);

function getValidationError(){
    agent.testerror.getBadRequestError()
    .then(()=>console.log('should not print'))
    .catch((error)=>setValidationError(error));
}



    return(<>


        <Container>
            <Typography gutterBottom variant="h2">Errors for Testing Purpose</Typography>
            <ButtonGroup fullWidth>
                    <Button variant="contained" onClick={()=>agent.testerror.get400Error().catch(er=>console.log(er))}>Get400Error</Button>
                    <Button variant="contained" onClick={()=>agent.testerror.get401Error().catch(er=>console.log(er))}>Get401Error</Button>
                    <Button variant="contained" onClick={()=>agent.testerror.get404Error().catch(er=>console.log(er))}>Get404Error</Button>
                    <Button variant="contained" onClick={()=>agent.testerror.get500ServerError().catch(er=>console.log(er))}>Get500Error</Button>
                    {/* <Button variant="contained" onClick={()=>agent.testerror.getBadRequestError().catch(er=>console.log(er))}>GetBadRequestError</Button> */}
                    <Button variant="contained" onClick={getValidationError}>GetBadRequestError</Button>
            </ButtonGroup>
            {validationError.length>0 &&
            <Alert severity="error">
                 <AlertTitle>
                    Validation Error
                </AlertTitle> 
            <List>
            {validationError.map(error=>(
                <ListItem key={error}>
                        <ListItemText>{error}</ListItemText>
                </ListItem>
            ))}    
            </List>
            
            </Alert>
            
            }
        </Container>



        </>)
}