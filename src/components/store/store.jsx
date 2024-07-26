import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './reducers/ProductReducer';
import CartReducer from './reducers/CartReducer';
import AuthReducer from './reducers/AuthReducer';
import CategoryReducer from './reducers/CategoryReducer';

const store = configureStore({
    reducer: {
        products: ProductReducer,
        cart: CartReducer,
        auth: AuthReducer,
        categories: CategoryReducer,
    },
});

export default store;
