import { createSlice } from "@reduxjs/toolkit";
interface IState {
    addNew?: boolean
}
export const ConfirmBooking = createSlice({
    name: "ConfirmBooking",
    initialState: {
        addNew: false
    },
    reducers: {
        setAddNewBooking: (state: IState, action) => {
            state.addNew = action.payload
        }
    },
});
interface IState {
    isChangeData?: boolean,

}
export const isChangeDataTixSalonCenter = createSlice({
    name: "isChangeDataTixSalonCenter",
    initialState: {
        isChangeData: false,

    },
    reducers: {
        setIsChangeData: (state: IState, action) => {
            state.isChangeData = action.payload
        },

    },
});
interface IState {

    isChangeDataTech?: boolean
}
export const isChangeDataTechSalonCenter = createSlice({
    name: "isChangeDataTechSalonCenter",
    initialState: {
        isChangeDataTech: false
    },
    reducers: {
        setIsChangeDataTech: (state: IState, action) => {
            state.isChangeDataTech = action.payload
        }
    },
});
interface IState {

    showSelectTechService?: boolean
}
export const showSelectTechService = createSlice({
    name: "showSelectTechService",
    initialState: {
        showSelectTechService: false
    },
    reducers: {
        setShowSelectTechService: (state: IState, action) => {
            state.showSelectTechService = action.payload
        }
    },
});
