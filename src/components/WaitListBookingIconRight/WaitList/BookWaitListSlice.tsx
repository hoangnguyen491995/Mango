import { createSlice } from "@reduxjs/toolkit";

interface IState {
  numberAll: number;
  numberWalkIn: number;
  numberAppt: number;
}

export const WaitListSlice = createSlice({
  name: "waitListBooking",
  initialState: {
    numberAll: 0,
    numberWalkIn: 0,
    numberAppt: 0,
  },
  reducers: {
    setNumberItem: (state: IState, action) => {
      state.numberAll = action.payload.numberAll;
      state.numberWalkIn = action.payload.numberWalkIn;
      state.numberAppt = action.payload.numberAppt;
    },
  },
});
