import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./userSlice"
import operatorReducer from "./operatorSlice"

const store = configureStore({
    reducer: {
        userReducer: userReducer,
        operatorReducer: operatorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export default store;