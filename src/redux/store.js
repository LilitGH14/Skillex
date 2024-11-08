import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { thunk } from "redux-thunk";

import generalSlice from "./slices/generalSlice";
import productsSlice from "./slices/productSlice";

const storage = createWebStorage("local");
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    general: generalSlice.reducer,
    products: productsSlice.reducer,
  })
);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
export default store;
