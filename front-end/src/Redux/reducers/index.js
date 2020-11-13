import { combineReducers } from 'redux';
import apiProductsReducer from './apiProductsReducer';
import shoppingListReducer from './shoppingListReducer';
import socketReducer from './socketReducer';

const rootReducer = combineReducers({ apiProductsReducer, shoppingListReducer, socketReducer });

export default rootReducer;
