import {ADD_ITEM, SET_ITEM, REDUCE_ITEM, REMOVE_ITEM} from '../actions/cart.action';

const INITIAL_STATE = {
    carts: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM:
            if (state?.carts.length > 0) {
                let duplicate = state.carts.find(item => {
                    return item.id === action?.data.id;
                })

                if (duplicate) {
                    let cart = state.carts;
                    cart = cart.map(e => (
                        e.id === action?.data.id ? {...duplicate, qty: duplicate.qty + 1} : e
                    ));

                    localStorage.setItem('carts', JSON.stringify(cart));
                    return {...state, carts: cart}
                }
            }

            let data = [...state.carts, {...action?.data, qty: action.data.qty = 1}];
            localStorage.setItem('carts', JSON.stringify(data));
            return {...state, carts: data}

        case REDUCE_ITEM:
            if (state?.carts.length > 0) {
                let duplicate = state.carts.find(item => {
                    return item.id === action?.data.id;
                })

                if (duplicate) {
                    let cart = state.carts;
                    if (duplicate.qty === 1) {
                        let data = cart.filter(e => e.id !== action?.data.id);
                        localStorage.setItem('carts', JSON.stringify(data));
                        return {...state, carts: data}
                    }
                    cart = cart.map(e => (
                        e.id === action?.data.id ? {...duplicate, qty: duplicate.qty - 1} : e
                    ));
                    localStorage.setItem('carts', JSON.stringify(cart));
                    return {...state, carts: cart}
                }
            }

            localStorage.removeItem('carts');
            return {...state, carts: []}

        case REMOVE_ITEM:
            if (state?.carts.length > 0 && state?.carts.length !== 1) {
                localStorage.setItem('carts', JSON.stringify(state.carts.filter(e => e.id !== action?.data.id)));
                return {...state, carts: state.carts.filter(e => e.id !== action?.data.id)}
            }

            localStorage.removeItem('carts')
            return {...state, carts: state.carts.filter(e => e.id !== action?.data.id)}

        case SET_ITEM:
            return {...state, carts: action?.data}
        default:
            return state;
    }
}

export default cartReducer;