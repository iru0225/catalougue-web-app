import {PRODUCTS} from '../actions/product.action';

const INITIAL_STATE = {
    products: null
}

const productReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case PRODUCTS:
            return {...state, products: action?.data}
        
        default:
            return state;
    }
}

export default productReducer;