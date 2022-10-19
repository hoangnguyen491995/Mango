import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { IEvents } from "./IterfaceStructures"



interface NumberState {
    value: number;
    openModel: boolean;
    bgColorTicket: {
      bgColor: string,
      appointmentId: number,
      id: string,
      screenX: number, 
      screenY: number,
    },
    dataCopyTicket: any,
    isCopyTicket: boolean,
    statusCopy: string,
    pasteTicket: boolean,
    newPosition: {
      rvcNo: number,
      fromAppointmentID: number,
      fromAppointmentStatus: number,
      serviceDate:  string,
      toEmployeeID: number,
      toEmployeeName: string,
      createBy: string,
    },
    isCancelCopy: boolean,
    _listElm_Title: number| null,
    _listElm_appt: number| null,
    pageCurrent: "" | "book" | "salon-center" | "create-Charge",
    viewTypeCalendar: string,
    timeNewBook: ITimeNewBook,
  }

  interface ITimeNewBook {
    customerId: number,
    dateTime: string,
    employeeName: string,
  }

const dataCopyTicketInit = {  
    id: 0,
    title: "",
    start:  "",
    end: "",
    resourceId: 0,
    stringToDay: "",
    appointmentId: 0,
    appointmentDetailId: 0,
    color: "",
    colorBorder: "",
    services: "",
    employeeName: "",
    employeeID: 0,
    appointmentStatusId: 0,
    ticketstatus: 0,
    isConfirmOB: false,
    noteApt: "",
    isRequestTech: 0,
    comeUp: 0,
    isSpecial: 0,
    isStartAllSameTime: false,
    idParty: 0,
    isBookOnline: false,
    depositAmount: 0,
  
  }


const initialState: NumberState = {
    value: 0,
    openModel: false,
    bgColorTicket: {
      bgColor:"",
      appointmentId: 0,
      id: "",
      screenX: 0, 
      screenY: 0,
    },
    dataCopyTicket: dataCopyTicketInit,
    isCopyTicket: false,
    statusCopy: "",
    pasteTicket: false,
    newPosition: {
      rvcNo: 0,
      fromAppointmentID: 0,
      fromAppointmentStatus: 0,
      serviceDate:  "",
      toEmployeeID: 0,
      toEmployeeName: "",
      createBy: "",
    },
    isCancelCopy: false,
    _listElm_Title:  140 ,
    _listElm_appt: 140,
    pageCurrent: "",
    viewTypeCalendar: "DAY", 
    timeNewBook: {
      customerId: 9999,
      dateTime: "",
      employeeName: "NEXT AVAILABLE",
    }


  };
  const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
      incremented(state) {
        state.value++;
      },
      
      addCount(s, action: PayloadAction<number>) {      
        s.value += action.payload;
      },

      vissibleModel(state, action: PayloadAction<any>){
        state.openModel = true;
        state.timeNewBook = action.payload;
       
        
      },

      closeModel(state){
        state.openModel = false;
      },

      addColorTicketActive(state, action: PayloadAction<any>) {      
        state.bgColorTicket = action.payload;
      },
      clearColorTicketActive(state) {      
        state.bgColorTicket.bgColor = "";
        state.bgColorTicket.appointmentId = 0;
        state.bgColorTicket.id = "";
      },
      addDataCopyTicket(state, action: PayloadAction<any>) {      
        state.dataCopyTicket = action.payload;
        
      },
      clearDataCopyTicket(state) {     
        state.dataCopyTicket = dataCopyTicketInit;
      },
      turnOnIsCopy(state){
        state.isCopyTicket = true; 
        
        if(document)
        {
          const node = document.getElementById(state.bgColorTicket.id); 
          if(node)
          {
            const clone = node.cloneNode(true);
            if(document)
            {
              let parent = node.closest(".rbc-events-container")
              let elmClone = parent?.appendChild(clone);
              const elmCloneHtml = elmClone as HTMLElement;
              elmCloneHtml.style.zIndex = "0"; 
              elmCloneHtml.setAttribute("id", "ticket-clone-copied")
            }
          }
        }   
      },
      turnOffCopy(state){
        state.isCopyTicket = false;
      },
     
      pasteComplete(state){
        state.pasteTicket = !state.pasteTicket;
      },
      addDataNewPosition(state, action: PayloadAction<any>){
        state.newPosition = action.payload
      },
      clickCancelCopy(state, action: PayloadAction<any>){
        state.isCancelCopy = action.payload;
      },
      set_ListElm_Title(state, action: PayloadAction<any>){
        state._listElm_Title = action.payload;
      },
      set_ListElm_Appt(state, action: PayloadAction<any>){
        state._listElm_appt = action.payload;
      },
      setPageCurrent(state, action: PayloadAction<any>){
        state.pageCurrent = action.payload;
      },
      setViewTypeCalendar(state, action: PayloadAction<any>){
        state.viewTypeCalendar = action.payload;
      },
    
      
    },
  });

export const {
  incremented, 
  addCount,
  vissibleModel,
   closeModel, 
   addColorTicketActive,
   clearColorTicketActive,
   addDataCopyTicket,
   clearDataCopyTicket,
   turnOnIsCopy,
   turnOffCopy,
   clickCancelCopy,
   pasteComplete,
   addDataNewPosition,
   set_ListElm_Title,
   set_ListElm_Appt,
   setPageCurrent,
   setViewTypeCalendar
   } = bookSlice.actions;
export default bookSlice.reducer;
