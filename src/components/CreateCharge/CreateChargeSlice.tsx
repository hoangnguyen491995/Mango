import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  showLeftLogin: string;
  showFormRight: string;
  showFormRightTech: number;
  showAddTech: string;
  showAddClient: string;
  ID: number;
  showClearAddTech: string;
  IDCheckoutCreateCharge: number;
  IDCheckoutAppt: number;
  AddCategoryLeftCreateCharge: string;
  IdClientDetail: number;
  showLeftIdAddClient: boolean;
  listCategoryLeft: Array<[]>;
  setPriceModalManageTip: string;
  showLeftNameClient: string;
  IDItemInTiket: number;
  RenderAddTechLeft: number;
  setPriceModalManageTipDue: number;
  TotalPrice: number;
  tip: number;
  IDTechItem: number;
  ShowTrnSeq: number;
  setchangePrice: number;
}

export const CreateChargeSlice = createSlice({
  name: "CreateCharge",
  initialState: {
    showClearAddTech: "",
    showLeftLogin: "login",
    showFormRight: "tech",
    showAddTech: "techLeft",
    showAddClient: "clientLeft",
    ID: 0,
    IDCheckoutCreateCharge: 0,
    IDCheckoutAppt: 0,
    showFormRightTech: 0,
    AddCategoryLeftCreateCharge: "",
    IdClientDetail: 0,
    showLeftIdAddClient: false,
    listCategoryLeft: [],
    setPriceModalManageTip: "",
    showLeftNameClient: "Add Client",
    IDItemInTiket: 0,
    RenderAddTechLeft: 0,
    setPriceModalManageTipDue: 0,
    TotalPrice: 0,
    tip: 0,
    IDTechItem: 0,
    ShowTrnSeq: 0,
    setchangePrice: 0,
  },
  reducers: {
    setshowFormLeft: (state: IState, action) => {
      state.showLeftLogin = action.payload;
    },
    setchangePrice: (state: IState, action) => {
      state.setchangePrice = action.payload;
    },
    ShowTrnSeq: (state: IState, action) => {
      state.ShowTrnSeq = action.payload;
    },
    showFormRightTechItem: (state: IState, action) => {
      state.IDTechItem = action.payload;
    },
    setshowIDItemInTiket: (state: IState, action) => {
      state.IDItemInTiket = action.payload;
    },
    setshowLeftNameClient: (state: IState, action) => {
      state.showLeftNameClient = action.payload;
    },
    dispatchlistCategoryLeft: (state: IState, action) => {
      // console.log("dispatchlistCategoryLeft", action.payload);
      state.listCategoryLeft = action.payload;
    },
    setshowLeftIdAddClient: (state: IState, action) => {
      state.showLeftIdAddClient = action.payload;
    },
    setIdClientDetail: (state: IState, action) => {
      //ID ClientDetail
      state.IdClientDetail = action.payload;
    },
    showLeftAddTechRender: (state: IState, action) => {
      state.ID = action.payload;
    },
    showLeftAddTech: (state: IState, action) => {
      state.showAddTech = action.payload.showform;
      state.RenderAddTechLeft = action.payload.IdRender;
    },

    showLeftClearTech: (state: IState, action) => {
      state.showClearAddTech = action.payload;
    },
    setAddCategoryLeftCreateCharge: (state: IState, action) => {
      state.AddCategoryLeftCreateCharge = action.payload;
    },

    setShowFormRight: (state: IState, action) => {
      state.showFormRight = action.payload;
    },

    showFormRightTech: (state: IState, action) => {
      state.showFormRightTech = action.payload;
    },
    setIDCheckoutCreateCharge: (state: IState, action) => {
      state.IDCheckoutCreateCharge = action.payload;
    },
    setIDCheckoutAppt: (state: IState, action) => {
      state.IDCheckoutAppt = action.payload;
    },
    setPriceModalManageTip: (state: IState, action) => {
      state.setPriceModalManageTip = action.payload;
    },
    setPriceModalManageTipDue: (state: IState, action) => {
      state.setPriceModalManageTipDue = action.payload;
    },
    setTotalPriceCreateCharge: (state: IState, action) => {
      state.TotalPrice = action.payload.TotalPrice;
      state.tip = action.payload.Tip;
    },
  },
});
