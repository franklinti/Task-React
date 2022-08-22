import { configureStore } from "@reduxjs/toolkit"
import reducer from "../controller/ClientesController"

const store = configureStore({
    reducer: {
        clientes: reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;