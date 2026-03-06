import { useContext, useReducer, useEffect, createContext } from "react";
const AppContext = createContext();
import reducer from './reducer';
import cartItems from './data';
import { 
    CLEAR_CART, 
    REMOVE, 
    INCREASE, 
    DECREASE, 
    LOADING, 
    DISPLAY_ITEMS } from './action';


const initialState = {
    loading: false,
    cart: new Map(cartItems.map((item) => [item.id, item])),
}

export const AppProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState);

const clearCart = () => {
    dispatch({ type: CLEAR_CART });
}

const removeProduct = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
}

const increaseAmount = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
}

const decreaseAmount = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
}

    return (
        <AppContext.Provider value={{ ...state, clearCart, removeProduct, increaseAmount, decreaseAmount }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}