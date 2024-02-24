import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice";
import roomReducer from "../room/roomSlice.js";

const store = configureStore({
    reducer:{
        user:userReducer,
        room:roomReducer
    }
})

export default store;