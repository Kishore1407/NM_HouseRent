import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = (key) => ({
  key,
  storage,
});
const persistUserSlice = persistReducer(
  persistConfig("userPersistStore"),
  userSlice
);

export const store = configureStore({
  reducer: {
    // user: userSlice,
    user: persistUserSlice,
  },
});

export const persistedReducer = persistStore(store);
