import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  // mode : string; // 'copy' || 'past' || '';
  // event : any
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      console.log(state.value);

      state.value++;
    },
    addCount(s, action: PayloadAction<number>) {
      console.log(s);
      console.log(action);
      s.value += action.payload;
    },
  },
});

export const { incremented, addCount } = counterSlice.actions;
export default counterSlice.reducer;
