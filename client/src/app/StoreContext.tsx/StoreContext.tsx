import {PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../model/Basket";




interface StoreContextValue{
    basket: Basket | null,
    setBasket: (basket: Basket) => void,
    removeItem: (productId: number, quantity: number)=> void,
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);
 
export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context==null){
        throw Error('Oops - We do not seem to be in the provider');
    }
    return context;
 }

 export function StoreProvider({children} : PropsWithChildren<any>){
    const [basket, setBasket] = useState<Basket|null>(null);
        console.log("initialized", basket)

    function removeItem(productId: number, quantity:number){
        console.log("storecontext removed");
        console.log(basket?.items[0].quantity);
        if(!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i=>i.productId==productId);
        if(itemIndex>=0){
            items[itemIndex].quantity-=quantity;
        }
        if(items[itemIndex].quantity===0){
            items.splice(itemIndex,1);
        }
        setBasket(state =>{
            return {...state!,items}//return as new state
        });
                console.log(basket?.items[0].quantity);
    }
    return(
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )

 }
 