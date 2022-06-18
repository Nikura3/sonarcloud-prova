import { createSlice } from "@reduxjs/toolkit";

const dimensionSlice = createSlice({
    name: 'dimension',
    initialState: { dimension: [], isSelected: [], isNumeric: [] },
    reducers: {
        addDimension(state, value) {
            state.dimension = value.payload.dimension;
            state.isSelected = value.payload.isSelected;
            state.isNumeric = value.payload.isNumeric;
        },
        changeValue(state, obj) {
            //console.log("change", state.dimension[obj.payload.id], obj.payload.id, obj.payload.checked);
            state.isSelected[obj.payload.id] = obj.payload.checked;
        }
    }
});

export const dimActions = dimensionSlice.actions;

export default dimensionSlice;