import { useContext, useReducer, useEffect, createContext } from "react";
const AppContext = createContext();
import reducer from './reducer';
import cartItems from './data';
import { getTotals } from './utils';
import { 
    CLEAR_CART, 
    REMOVE, 
    INCREASE, 
    DECREASE, 
    LOADING, 
    DISPLAY_ITEMS } from './action';

const url = 'https://www.course-api.com/react-useReducer-cart-project';


const initialState = {
    loading: false,
    cart: new Map(),
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { totalAmount, totalPrice } = getTotals(state.cart);


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

    const fetchData = async() => {
        dispatch({ type: LOADING });
        const response = await fetch(url);
        const cart = await response.json();
        console.log(cart);
        dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ 
            ...state, 
            clearCart, 
            removeProduct, 
            increaseAmount, 
            decreaseAmount, 
            getTotals,
            totalAmount, 
            totalPrice,  
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}