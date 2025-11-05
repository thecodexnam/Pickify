import React,{createContext,useEffect,useState} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const[cart,setCart] = useState(() => {
        try{
            const savedCart = localStorage.getItem('cart')
            return savedCart ? JSON.parse(savedCart) :[]
        }

        catch {
                return[]
        }
    })
    // IT WILL SAVE THE CART IN LOCALSTORAGE WITH ITEM ID ELSE IT WILL BE EMPTY ARRAY
    
    // SYNC CART TO LOCALSTORAGE WHENEVER IT CHANGE
    useEffect(() =>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    // ADD AB ITEM TO CART OR INCREASE ITS QUANTITY IF ALREADY PRESENT
    const addToCart = (item,quantity = 1) =>{
        setCart(prevCart =>{
            const existingItem = prevCart.find(ci => ci.id === item.id)
            if(existingItem){
                return prevCart.map(ci => 
                    ci.id === item.id 
                    ?{...ci,quantity: ci.quantity + quantity} :ci  )
            }

            else{
                return [...prevCart,{...item,quantity}]
            }
        })
    }
}