import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumberState {
  apptId: number;
  checkNo: number;
  indexAppt: number;
  indexTech: number;
  idSelectTech: number;
  isListItemTickets: number;
  idSelectClient: number;
  isChangeData: boolean;
}

const initialState: NumberState = {
  apptId: 0,
  checkNo: 0,
  indexAppt: 0,
  indexTech: 0,
  idSelectTech: 0,
  isListItemTickets: 0,
  idSelectClient: 0,
  isChangeData: false,
};
const createChargeSlice = createSlice({
  name: "saloncenter",
  initialState,
  reducers: {
    setApptId(state, action: PayloadAction<number>) {
      state.apptId = action.payload;
    },
    setCheckNo(state, action: PayloadAction<number>) {
      state.checkNo = action.payload;
    },
    setIndexAppt(state, action: PayloadAction<number>) {
      state.indexAppt = action.payload;
    },
    setIndexTech(state, action: PayloadAction<number>) {
      state.indexTech = action.payload;
    },
    setIdSelectTech(state, action: PayloadAction<number>) {
      state.idSelectTech = action.payload;
    },
    setIdSelectClient(state, action: PayloadAction<number>) {
      state.idSelectTech = action.payload;
    },
    setIsChangeData(state) {
      state.isChangeData = !state.isChangeData;
    },
    setListItemApptTickets(state, action: PayloadAction<number>) {
      state.idSelectTech = action.payload;
    },
  },
});
export const {
  setApptId,
  setCheckNo,
  setIndexAppt,
  setIndexTech,
  setIdSelectTech,
  setIdSelectClient,
  setListItemApptTickets,
  setIsChangeData,
} = createChargeSlice.actions;
export default createChargeSlice.reducer;
