import {configureStore} from '@reduxjs/toolkit';
//... slices
import productReducer from './slices/product.slice';
import userReducer from './slices/user.slice';
import categoryReducer from './slices/category.slice';
import menuReducer from './slices/menu.slice';

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        categories: categoryReducer,
        menu: menuReducer,
        // autre reducer ..
    }
});

export default store;