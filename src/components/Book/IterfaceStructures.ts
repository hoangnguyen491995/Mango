export interface IListEvents {
  begins: string;
  ends: string;
  startS: number;
  endS: number;
  color: string;
  resource: number;
  title: string;
  uid: number;
  notes: string;
  text: string;
  border: string | null;
  isGroup: number;
  ticketstatus: number;
  isTimeOff: number;
  name: string;
  customerID: number;
  services: string;
  numGuest: number;
  appointmentId: number;
  serviceDateString: string | null;
  appointmentStatusName: string | null;
  appointmentStatusId: number;
  isBookOnline: boolean;
  isConfirmOB: boolean;
  noteEmployeeOff: string;
  noteApt: string;
  appointmentDetailId: number;
  isVIP: string | null;
  isMember: string | null;
  isNew: string | null;
  duration: number;
  durations: string;
  isRequestTech: number;
  isGroupAppointment: number;
  isSpecial: number;
  comeUp: number;
  idParty: number;
  rgb: string | null;
  borderStyle: string | null;
  depositAmount: number;
  isChangeTime: string | null;
  appointmentDetailIDs: string;
  isStartAllSameTime: boolean;
}

export interface IInforTech {
  employeeID: number;
  nickName: string;
  imageFileName: string;
  backGroundColor: string;
  lockIn: string;
}

export interface IEvents {
  id: number;
  title: string;
  start: Date | null | string;
  end: Date | null |string;
  resourceId: number;
  stringToDay: string | null;
  appointmentId: number;
  appointmentDetailId: number;
  color: string;
  colorBorder: string;
  services: string;
  employeeName: string;
  employeeID: number;
  appointmentStatusId: number;
  ticketstatus: number;
  isConfirmOB: boolean;
  noteApt: string;
  isRequestTech: number;
  comeUp: number;
  isSpecial: number;
  isStartAllSameTime: boolean;
  idParty: number;
  isBookOnline: boolean;
  depositAmount: number;
}
export interface IResourceMap {
  resourceId: number;
  resourceTitle: string;
  imageFileName: string | null;
  backGroundColor: string;
  count: number;
  listShiftModel: ListShiftModel[];
  type: string | null;
  lockIn: string | null;
}
export interface IDateFromToListView {
  start: string;
  end: string;
}

export interface IDateFromToWeekView {
  start: string;
  end: string;
  today: string;
}
export interface ITechSalonCenter {
  turnType:             string;
  rowIndex:             number | null;
  turnCode:             string | null;
  isManualTurn:         number;
  isSale:               boolean;
  touchID:              string;
  rvcNo:                number | null;
  employeeID:           number;
  imageFileName:        null | string;
  employeeName:         string;
  indexNum:             number;
  isServing:            number;
  servingEnd:           Date | null;
  servingStart:         Date | null;
  lastTurn:             Date | null;
  lastTurnEarn:         number;
  id:                   number;
  currentTicket:        number;
  currentGuest:         string;
  lockIn:               Date | null;
  logInTimeAdjusted:    null;
  logInTime:            Date | null;
  sizeImage:            string;
  takeTurn:             number;
  wsid:                 string;
  serviceAmount:        number;
  turn:                 number;
  adjTurn:              number;
  bonusTurn:            number;
  partialTurn:          number;
  countTicket:          number | null;
  techColorID:          number;
  backGroundColor:      string;
  shadowTechBusy:       number;
  alphaAppointmentTech: number;
  isDefault:            boolean;
  nextAppointment:      string;
  beginTime:            string;
  endTime:              string;
  isOffSchedule:        boolean;
  listShiftModel:       ListShiftModel[];
  bookingIndex:         number;
  maxIndex:             number;
  showTurn:             number;
  showAmount:           number;
  showNextAppointment:  number;
  isLogIn: boolean,
  isLogOut: boolean,
}

export interface ListShiftModel {
  start: string;
  end:   string;
}

export interface ICountIntervalTime{
  label: number,
  count: number,
}
export interface IInforShedulerDetail {
  actIns: Number,
  isCopyAppt: boolean,
  mangoMarketing: string,
  copyAppointment: boolean,
  depositAmount: Number,
  listAppointmentDetail: ListAppointmentDetail[];

}
export interface ListAppointmentDetail {
  appointmentServiceDetail: AppointmentServiceDetail[];
  appointmentID: number;
  appointmentStatusID: number;
  appointmentSubject: string;
  customerID: number;
  serviceDate: Date;
  startTime: Date;
  endTime: Date;
  employeeID: number;
  customerName: string;
  rgb: string;
  colorStyle: null;
  comments: string;
  employeeName: string;
  checkNo: number;
  diff: number;
  rvcNo: number;
  aptStartTime: Date;
  isShowCheckIn: null;
  isBookOnline: boolean;
  isConfirmOB: boolean;
  idParty: number;
  noteAppointment: string | null;
  customerPhone: string | null;
  isShowAptCommentGroup: null;
  isProduct: null;
  isCard: null;
  depositAmount: number;
}
export interface AppointmentServiceDetail {
  appointmentID: number;
  originalAppointmentID: number;
  idParty: null;
  idCombine: null;
  trnSeq: number;
  appointmentStatusID: number;
  repay: number;
  appointmentDetailID: number;
  itemID: number;
  itemName: string;
  startTime: Date;
  endTime: Date;
  employeeID: number;
  employeeName: string;
  duration: number;
  amount: number;
  totalAmount: number;
  aptStartTime: Date;
  checkinTime: Date;
  inService: null;
  outService: Date;
  categoryID: number;
  isCategory: number;
  customerID: number;
  customerName: string;
  checkNo: number;
  statusEmployee: string;
  isService: number;
  isProduct: number;
  isFee: number;
  isGiftCard: number;
  durationFlTech: number;
  numTech: number;
  isRequestTech: null;
  rvcNo: null;
  bookType: null;
}
  
