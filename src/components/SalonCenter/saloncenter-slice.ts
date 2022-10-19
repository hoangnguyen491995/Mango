import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumberState {
    isChangeTech: boolean;
    isChangeTix: boolean
}

const initialState: NumberState = {
    isChangeTech: false,
    isChangeTix: false
};
const salonCenterSlice = createSlice({
    name: "saloncenter",
    initialState,
    reducers: {
        isChangeDataTech(state) {
            state.isChangeTech = !state.isChangeTech;
        },
        isChangeDataTix(state) {
            state.isChangeTix = !state.isChangeTix;
        },

    },
});
export const {
    isChangeDataTech,
    isChangeDataTix
} = salonCenterSlice.actions;
export default salonCenterSlice.reducer;