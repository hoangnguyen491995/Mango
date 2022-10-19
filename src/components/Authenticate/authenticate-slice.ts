import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumberState {
    showPermission: boolean;

}

const initialState: NumberState = {
    showPermission: false,

};
const authenticateSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        showPermissionModal(state) {
            state.showPermission = !state.showPermission;
        },


    },
});
export const {
    showPermissionModal,

} = authenticateSlice.actions;
export default authenticateSlice.reducer;