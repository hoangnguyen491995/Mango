import { configureStore } from "@reduxjs/toolkit";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { MenuSalonCenterSlice } from "src/components/SalonCenter/LeftContentSalonCenter/MenuSalonCenter/MenuSalonCenterSlice";
import { WaitListSlice } from "src/components/WaitListBookingIconRight/WaitList/BookWaitListSlice";
import counterReducer from "src/components/Header/header-slice";
import bookReducer from "src/components/Book/book-slice";
import saloncenterReducer from "src/components/SalonCenter/saloncenter-slice";
import createChargeReducer from "src/components/CreateCharge/createcharge-slice";
import authenticateSlice from "src/components/Authenticate/authenticate-slice";
import {
  ConfirmBooking,
  isChangeDataTechSalonCenter,
  isChangeDataTixSalonCenter,
  showSelectTechService,
} from "./reducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    book: bookReducer,
    saloncenter: saloncenterReducer,
    createCharge: createChargeReducer,
    authenticate:authenticateSlice,
    SalonCenter: MenuSalonCenterSlice.reducer,
    CreateCharge: CreateChargeSlice.reducer,
    AddNewBooking: ConfirmBooking.reducer,
    Booking: WaitListSlice.reducer,
    IsChangeDataTixSalonCenter: isChangeDataTixSalonCenter.reducer,
    IsChangeDataTechSalonCenter: isChangeDataTechSalonCenter.reducer,
    ShowSelectTechService: showSelectTechService.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//export default store
