import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems,productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id ===productToAdd.id
    })
    //If found, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => {
           return cartItem.id === productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1} : cartItem
        })
    }

    //return new array with modified cartItems/ new cart item
    return[...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id === cartItemToRemove.id
    });

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

   
    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id ? {...cartItem,quantity:cartItem.quantity-1} : cartItem
    })

}

const clearCartItem = (cartItems,cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart:() =>{},
    clearItemFromCart: () => {},
    cartCount:0,
    cartTotal:0,
})



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] =useState(0);
    const [cartTotal,setCartTotal] =useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem) => {
            return total +cartItem.quantity;
        },0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,cartItem) => {
            return total +(cartItem.quantity * cartItem.price);
        },0);
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

    const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

    const clearItemFromCart =(cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    
    const value = { isCartOpen, setIsCartOpen,addItemToCart,cartItems, removeItemFromCart, clearItemFromCart,cartCount,cartTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };