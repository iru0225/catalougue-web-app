import { combineReducers } from "redux";
import category from './categories.reducer';
import product from './products.reducer';
import cart from './cart.reducer';

export default combineReducers({category, product, cart});