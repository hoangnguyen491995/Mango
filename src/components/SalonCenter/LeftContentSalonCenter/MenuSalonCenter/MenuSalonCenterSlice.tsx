import { createSlice } from "@reduxjs/toolkit";
interface IState {
  size?: string;
  show?:boolean
}
export const MenuSalonCenterSlice = createSlice({
  name: "TabLeftMenuSalonCenter",
  initialState: {
    size: "small",
    show:true
  },
  reducers: {
    setSizeItem: (state: IState, action) => {
      state.size = action.payload;
    },
    setShowRightSalonCenter:(state:IState,action)=>{      
       state.show = action.payload
    }
  },
});
