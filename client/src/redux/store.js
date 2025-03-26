import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

///persists
const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
// const persistedReducer = persistedReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux toolkit
export const store = configureStore({
  reducer: persistedReducer, // instead of user: userReducer we pass this persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // so we can use in the main.jsx
