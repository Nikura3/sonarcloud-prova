import dataSlice from "./data";
import dimensionSlice from "./dimension";
import { configureStore } from "@reduxjs/toolkit";
import chartSlice from "./chartSlice";
import formSlice from "./formSlice";//da togliere nel caso

const store = configureStore({
    reducer: {
        dim: dimensionSlice.reducer,
        data: dataSlice.reducer,
        chart: chartSlice.reducer,
        form: formSlice.reducer//da togliere nel caso
    }
});

export default store;