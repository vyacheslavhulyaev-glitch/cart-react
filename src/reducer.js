import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from './action';


const reducer = (state, action) => {
    if(action.type === CLEAR_CART) {
        return { ...state, cart: new Map() };
    }
    if(action.type === REMOVE) {
        const newCart = new Map(state.cart);
        newCart.delete(action.payload.id);
        return { ...state, cart: newCart };
    }

    if(action.type === INCREASE) {
        const newCart = new Map(state.cart);
        const item = newCart.get(action.payload.id);
        newCart.set(action.payload.id, { ...item, amount: item.amount + 1 });
        return { ...state, cart: newCart };
    }

    if(action.type === DECREASE) {
        const newCart = new Map(state.cart);
        const item = newCart.get(action.payload.id);
        if(item.amount === 1) {
            newCart.delete(action.payload.id);
            return { ...state, cart: newCart };
        }
        newCart.set(action.payload.id, { ...item, amount: item.amount - 1 });
        return { ...state, cart: newCart };
    }

    throw new Error(`no matching action type: ${action.type}`);
}

export default reducer;