import {CATEGORIES} from '../actions/category.action';

const INITIAL_STATE = {
    categories: null
}

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES:
            localStorage.setItem('categories', JSON.stringify({...action?.data}));
            
            return {...state, categories: action?.data};
    
        default:
            return state;
    }
}

export default categoryReducer;