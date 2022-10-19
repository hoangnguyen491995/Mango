export interface ITixAppt {
  groupEmployeeDetails: IGroupEmployeeDetail[];
  serviceDate: string;
  appointmentStatusID: string;
  indexNum: number;
  numberGuest: number;
  appointmentStatusName: null;
  originalAppointmentID: number;
  orgCheckNo: number;
  appointmentSubject: string;
  customerID: number;
  lastName: null;
  firstName: null;
  customerName: string;
  customerPhone: null;
  startTime: string;
  backStartTimeAppt: null;
  nextStartTimeAppt: null;
  beginStartTimeAppt: null;
  endStartTimeAppt: null;
  endTime: null;
  barcodeTicket: null;
  checkinTime: string;
  waitingList: null;
  isModifying: null;
  isReminder: null;
  isNew: null;
  isGroup: number;
  isParty: null;
  checkNo: number;
  isDeleted: null;
  isDelete: null;
  employeeID: number;
  employeeName: null;
  comments: string;
  bookType: number;
  checkParty: number;
  wattingTime: null;
  serviceTime: null;
  inServiceDate: null;
  outService: string;
  inService: string;
  employeeAccept: string;
  isCategory: number;
  isRelease: number;
  idParty: number;
  colorStyle: null;
  rePay: number;
  needChange: number;
  timeChange: number;
  isCombine: number;
  idCombine: number;
  totalDuration: number;
  numEmployee: number;
  totalPartyByAptStatus: number;
  highlightTicket: number;
  isBocked: number;
  aptStartTime: null;
  createDate: null;
  isCreateAndChange: null;
  rvcNo: number;
  contactPhone: string;
  showIconTicketInfo: number;
  showIconClientInfo: number;
  showDetailService: number;
  showIcon: number;
  popup: number;
  dropDrag: number;
  lastChange: null;
  status: null;
  nameSlice: null;
  customerType: string;
  groupEmployeeDetail: string;
  highlightMessage: string;
  doneAndInServce: number;
  isSpecial: number;
  statusOffer: string;
}
export interface IGroupEmployeeDetail {
  avatar: string;
  name: string;
  color: string;
  employeeId: string;
  isRequest: boolean;
}
export interface ITicketDetail {
  listClover: any[];
  techName: string;
  model: IModel;
  countLstTicket: number;
  mainApt: number;
  empId: number;
  checkNo: number;
}

export interface IModel {
  listTicket: IListTicket[];
  customer: null;
}

export interface IListTicket {
  checkNo: null;
  originalAppointmentID: number;
  customerID: number;
  employeeID: number;
  customerName: string;
  aptComment: string;
  techName: string;
  isMember: number;
  orderBy: number;
  lstDetailTicket: ILstDetailTicket[];
  lstDetailCategory: any[];
}

export interface ILstDetailTicket {
  stt: number;
  appointmentStatusID: number;
  aType: number;
  checkNo: number;
  byPassEmpID: number;
  isRequestTech: boolean;
  orgCheckNo: number;
  appointmentID: number;
  orgAppointment: number;
  employeeID: number;
  customerID: number;
  trnDesc: string;
  itemName: null;
  itemCode: string;
  itemPrice: number;
  baseSub: number;
  sliptAmount: number;
  baseSrc: null;
  baseTax: null;
  baseTTL: number;
  duration: number;
  employeeName: string;
  customerName: null;
  aptMain: number;
  isParty: null;
  isAddGuest: null;
  isTagFriend: null;
  idParty: number;
  isGroup: boolean;
  isService: boolean;
  trnSeq: number;
  orgTrnSeq: number;
  appointmentDetailID: number;
  statusEmployee: string;
  dscRef: number;
  needChange: null;
  isMember: null;
  refundRef: string;
  clientMain: null;
  orderBy: number;
  isService2: number;
  isProduct: number;
  isGiftCard: number;
  isRetail: number;
  isFee: number;
  saleID: number;
  saleName: string;
  remainTip: null;
  totalTip: null;
  isPlus: boolean;
  packID: null;
  repay: null;
  idCombine: number;
  startTime: Date;
  strStartTime: null;
  aptStartTime: Date;
  strAptStartTime: null;
  checkinTime: Date;
  strCheckinTime: null;
  inService: Date;
  strInService: null;
  outService: Date;
  strOutService: null;
  bookType: number;
  numTech: number;
  durationFlTech: number;
  isCategory: number;
  mainEmpID: number;
  extraRef: number;
  extraDesc: number;
  childTicket: null;
  childExtra: null;
  noteDesc: string;
  idGirftCard: null;
  itemStartTime: Date;
  stringISTime: string;
  itemEndTime: Date;
  stringIETime: string;
}
export interface IGetListCancelReasonForTicket {
  id: number;
  reasons: string;
  isActive: boolean;
  createBy: string;
  createTime: Date;
  orderNum: number;
  rvcNo: number;
  voidReasons: string;
  lastChangeBy: string;
  lastChangeDate: string;
}
export interface ITicketDetailAppt {
  checkNo: number;
  appointmentID: number;
  clientName: string;
  checkinTime: string;
  indexNum: number;
  status: number;
  rvcNo: number;
  bookType: number;
  listApptDetail: ListApptDetail[];
}

export interface ListApptDetail {
  appointmentDetailID: number;
  employeeID: number;
  employeeName: string;
  isCategory: boolean;
  isRequestTech: boolean;
  listServies: ListServy[];
}

export interface ListServy {
  amount: number;
  itemCode: number;
  itemName: string;
  trnSeq: number;
  duration: number;
}
export interface IGetTicketPayment {
  tmp: number;
  subTotalAmount: number;
  promoTaxTip: number;
  amountDue: number;
  paid: number;
  balance: number;
  promo: number;
  taxTotal: number;
  tip: number;
  items: number;
  paymentDesc: string;
}
export interface IGetInformationForCheckoutPopup {
  infoCustomers: InfoCustomers;
  rdAptDetail: null;
  rdTrackClientGroupCombine: RDTrackClientGroupCombine[];
  appointmentMinimize: { [key: string]: number | null };
  redeem: string;
}

export interface InfoCustomers {
  customerID: number;
  firstName: string;
  lastName: string;
  contactPhone: string;
  email: string;
  rewardsPoint: number;
  visitCountByYear: number;
  totalSpentByYear: number;
  fristVist: Date;
  lastVist: Date;
  favouritePolish: string;
  favouriteTechs1: string;
  favouriteTechs2: string;
  favouriteTechs3: string;
  imageFileName: string;
  notes: string;
  rvcNo: number;
  rating: number;
  isNew: number;
  joinDate: Date;
  customerName: string;
}
export interface RDTrackClientGroupCombine {
  customerID: number;
  appointmentID: number;
  appointmentStatusID: number;
  checkNo: number;
  checkinTime: string;
  clientName: string;
  imageFileName: null;
}

export interface IClientInfo {
  customerID: number;
  rcpCustomer: null;
  customerCode: null;
  firstName: null;
  lastName: null;
  birthday: Date | null;
  contactPhone: string;
  workPhone: null;
  email: string;
  title: null;
  address: null;
  notes: null;
  customerName: string;
  city: null;
  state: null;
  zip: null;
  totalSpentByYear: number;
  country: null;
  imageFileName: null | string;
  joinDate: null;
  passwordLoginWeb: null;
  visitCount: null;
  fristVist: null;
  lastVisit: Date | null;
  favouritePolish: null;
  favouriteTechs1: string;
  favouriteTechs2: string;
  favouriteTechs3: string;
  favouriteTech: string;
  notesApp: null;
  coupon: string;
  rewardsPoint: number;
  rating: number;
  memberStatus: string;
  isKid: null;
  isChild: boolean | null;
  ratingDate: null;
  rewardsMember: null;
  isClientVerify: null;
  memberID: null;
  verification: null;
  isVerifyPhoneWithMango: null;
  isChangePhoneWhenReward: null;
  isChangePhone: boolean;
  visitCountByYear: null;
  isBlackList: boolean;
  isDeleted: null;
  atRisk: null;
  isVip: null;
  totalAmount: null;
  customerType: string;
}
export interface ITixDetail {
  infoCustomers: null;
  rdAptDetail: RDAptDetail[];
  rdTrackClientGroupCombine: null;
  appointmentMinimize: AppointmentMinimize;
  redeem: null;
}

export interface AppointmentMinimize {
  appointmentID: number;
  appointmentStatusID: number;
  customerID: number;
  rvcNo: number;
  checkNo: number;
  history: number;
  isGroup: number;
  groupID: number;
  employeeID: number;
  employeeName: string;
}

export interface RDAptDetail {
  stt: number;
  appointmentStatusID: number;
  aType: null;
  checkNo: number;
  byPassEmpID: null;
  isRequestTech: boolean;
  orgCheckNo: null;
  appointmentID: number;
  orgAppointment: null;
  employeeID: number;
  customerID: number;
  trnDesc: null;
  itemName: null;
  itemCode: string;
  itemPrice: number;
  baseSub: null;
  sliptAmount: null;
  baseSrc: null;
  baseTax: null;
  baseTTL: null;
  duration: number;
  employeeName: string;
  customerName: string;
  aptMain: null;
  isParty: null;
  isAddGuest: null;
  isTagFriend: null;
  idParty: number;
  isGroup: null;
  isService: boolean;
  trnSeq: number;
  orgTrnSeq: null;
  appointmentDetailID: number;
  statusEmployee: string;
  dscRef: null;
  needChange: null;
  isMember: null;
  refundRef: null;
  clientMain: null;
  orderBy: null;
  isService2: null;
  isProduct: number;
  isGiftCard: number;
  isRetail: null;
  isFee: number;
  saleID: null;
  saleName: null;
  remainTip: null;
  totalTip: null;
  isPlus: null;
  packID: null;
  repay: number;
  idCombine: number;
  startTime: Date;
  strStartTime: null;
  aptStartTime: Date;
  strAptStartTime: null;
  checkinTime: Date;
  strCheckinTime: null;
  inService: Date;
  strInService: null;
  outService: Date;
  strOutService: null;
  bookType: number;
  numTech: number;
  durationFlTech: number;
  isCategory: number;
  mainEmpID: null;
  extraRef: null;
  extraDesc: null;
  childTicket: null;
  childExtra: null;
  noteDesc: null;
  idGirftCard: null;
  itemStartTime: null;
  stringISTime: null;
  itemEndTime: null;
  stringIETime: null;
}
