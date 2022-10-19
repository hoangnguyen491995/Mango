export interface IAppt {
  AppointmentID: number;
  Name: string;
  Date: string;
  CustomerID: number;
  IsStartAllSameTime: boolean;
  StartTimeTix: string;
  TotalDuration: null;
  Note: string;
  listTicket: IListTicket[];
}

export interface IListTicket {
  EmployeeID: number;
  EmployeeNickName: string;
  IsRequestTech: boolean;
  listService: IListService[];
}
export interface IListService {
  IsChangeTime: false;
  IsRequestTech: true;
  ItemID: number;
  ItemName: string;
  ItemPrice: number;
  ItemDur: number;
  IDParty: 0;
  StartTime: string;
  EndTime: string;
  IsCategoryBook: false;
}
export interface IDataContextAddNewTix {
  showContent: IShowRightContent;
  setShowContent: Function;
  idAppt: number; // index appt
  setIdAppt: Function;
  startTimeTix: string; // start time header
  startDateTix: string; // start date header
  idClientTix: number; // id client khi click (left)
  idService: number; // id service khi click (center)
  indexItemService: number;
  durValue: number; // dur service input (right)

  idItemService: number; // id item service khi chọn (right)
  idTech: number; // id tech khi chọn (right)
  setStartTimeTix: Function;
  setStartDateTix: Function;
  setIdClientTix: Function;
  setIdService: Function;
  setIndexItemService: Function;
  setDurValue: Function;

  setIdItemService: Function;
  setIdTech: Function;
  dataItemTix: any;
  setDataItemTix: Function;
  statusChange: boolean;
  setStatusChange: Function;
  clearContext: Function;
  openItem;
  setOpenItem;
  customPriceID;
  setCustomPriceId
}
export interface ITypeCategory {
  id: number;
  categoryID: number;
  columnName: string;
  styleName: null;
  indexColumn: number;
  rvcNo: number;
  isActive: boolean;
  backgroudColumn: null;
  backgroudColor: null;
  boderColor: null;
  fontColor: null;
  priceColor: null;
  isCategoryGroup: boolean;
  styleBackgroundPrice: null;
}
export interface IItemCategory {
  categoryID: number;
  groupID: number;
  categoryCode: string;
  categoryName: string;
  isService: boolean;
  isGiftCard: boolean;
  isFee: boolean;
  imageFileName: string;
  isCombo: boolean;
  isPackage: boolean;
  isSubscription: boolean;
  color: string;
}
export interface IItemService {
  columnName: string;
  fontColor: string;
  priceColor: string;
  indexColumn: null;
  backgroudColor: string;
  styleBackgroundPrice: number;
  boderColor: string;
  isRetail: boolean;
  description: string;
  itemID: number;
  categoryID: number;
  categoryName: null;
  itemCode: string;
  itemName: string;
  basePrice: number;
  duration: number;
  customerPrice: boolean;
  itemColumns: number;
  isCombo: null;
  isPlus: boolean;
}
export interface IInfoClientforMakeAppt {
  customer: ICustomer;
  clientInfomations: IClientInfomation[];
}

export interface IClientInfomation {
  appointmentStatusID: number;
  appointmentStatusName: string;
  bookType: number;
  total: number;
}

export interface ICustomer {
  customerID: number;
  rcpCustomer: null;
  customerCode: null;
  firstName: string;
  lastName: string;
  birthday: null;
  contactPhone: string;
  workPhone: null;
  email: string;
  title: null;
  address: null;
  notes: string;
  customerName: string;
  city: null;
  state: null;
  zip: string;
  totalSpentByYear: number;
  country: null;
  imageFileName: null;
  joinDate: Date;
  passwordLoginWeb: null;
  visitCount: null;
  fristVist: Date;
  lastVist: Date;
  favouritePolish: string;
  favouriteTechs1: string;
  favouriteTechs2: string;
  favouriteTechs3: string;
  favouriteTech: string;
  notesApp: null;
  coupon: string;
  rewardsPoint: number;
  rating: number;
  memberStatus: string;
  isKid: boolean;
  isChild: null;
  ratingDate: null;
  rewardsMember: null;
  isClientVerify: null;
  memberID: string;
  verification: null;
  isVerifyPhoneWithMango: boolean;
  isChangePhoneWhenReward: null;
  isChangePhone: boolean;
  visitCountByYear: number;
  isBlackList: boolean;
  isDeleted: null;
  atRisk: null;
  isVip: null;
  totalAmount: null;
  customerType: string;
}
export interface IRegisterCustomer {
  date: string;
  empId: number;
  gender: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  sex: string;
  portalCode: string;
  isKid: boolean;
  rvcNo: number;
}
export interface IResultFastRegister {
  cus: IResultFastRegisterInfo;
  id: number;
}
export interface IResultFastRegisterInfo {
  customerID: number;
  firstName: string;
  lastName: string;
  joinedDate: null;
  sex: boolean;
  birthday: null;
  lastestUpdate: null;
  contactPhone: null;
  workPhone: null;
  email: string;
  title: null;
  address: null;
  note: null;
  city: null;
  state: null;
  zip: string;
  lastCheckOut: null;
  pns: null;
  phoneNetworkID: null;
  socialSecurity: null;
  isFull: null;
  customerCard: null;
  country: null;
  suite: null;
  imageFileName: null;
  pushingStatus: null;
  lastChange: null;
  portalCode: string;
  password: null;
  mySalon: null;
  passwordSalt: null;
  isChild: boolean;
  isMember: null;
  isVerifyPhoneWithMango: null;
  searchName: null;
}
export interface IAddNewAppt {
  root: IRoot[];
}

export interface IRoot {
  appointment: IAppointment;
}

export interface IAppointment {
  appointmentID: string;
  customerID: string;
  customerName: string;
  customerPhone: string;
  appointmentSubject: string;
  serviceDate: string;
  startTime: string;
  endTime: string;
  appointmentStatusID: string;
  employeeID: string;
  groupEmployeeName: string;
  aptSalon: string;
  aptComment: string;
  totalAmount: string;
  depositAmount: string;
  crearteBy: string;
  isBookOnline: string;
  barcodeTicket: string;
  totalDuration: string;
  isParty: string;
  idParty: string;
  isStartAllSameTime: string;
  apptIndex: string;
  detail: IDetail[];
}

export interface IDetail {
  item: IItem[];
}

export interface IItem {
  itemID: string;
  itemName: string;
  itemPrice: string;
  duration: string;
  employeeID: string;
  employeeName: string;
  type: string;
  isCategory: string;
  isRequestTech: string;
  startTime: string;
  endTime: string;
  durationItem: string;
  isChangeTime: string;
}
export interface IListCategories {
  category: IModel[];
  categoryStypeBasic: IGroup[];
  priceCustom: string;
  openId: number;
}

export interface IModel {
  categoryID: number;
  groupID: number;
  categoryCode: string;
  categoryName: string;
  isService: boolean;
  isGiftCard: boolean;
  isFee: boolean | null;
  imageFileName: string;
  isCombo: boolean | null;
  isPackage: boolean | null;
  isSubscription: boolean | null;
  color: null | string;
}

export interface IGroup {
  id: number;
  categoryID: number;
  columnName: string;
  styleName: null;
  indexColumn: number;
  rvcNo: number;
  isActive: boolean;
  backgroudColumn: null;
  backgroudColor: null;
  boderColor: null;
  fontColor: null;
  priceColor: null;
  isCategoryGroup: boolean;
  styleBackgroundPrice: null;
}
export interface IShowRightContent {
  showSelectTimeTix: boolean;
  showSearchServiceItem: boolean;
  showSelectDuration: boolean;
  showInfoClient: boolean;
  showSearchClient: boolean;
  showSelectTech: boolean;
  showOpenItem: boolean;
}
export interface IEditAppt {
  appointmentID: number;
  isChangeTime: boolean;
  isStartAllSameTime: null | false;
  idParty: number;
  phone: string;
  customerID: number;
  date: string;
  totalDuration: null | number;
  name: string;
  note: string;
  email: null;
  aptStartTime: string;
  listWithTech: ListWithTech[];
}

export interface ListWithTech {
  employeeID: number;
  employeeNickName: string;
  isRequestTech: boolean;
  listServiceWithTech: ListServiceWithTech[];
}

export interface ListServiceWithTech {
  itemID: number;
  itemName: string;
  itemPrice: number;
  itemDur: number;
  startTime: string;
  endTime: string;
  isCategoryBook: boolean;
}
export interface ISearchInforClient {
    customerID:              number;
    rcpCustomer:             null;
    customerCode:            null;
    firstName:               null;
    lastName:                null;
    birthday:                null;
    contactPhone:            string;
    workPhone:               null;
    email:                   string;
    title:                   null;
    address:                 null;
    notes:                   null;
    customerName:            string;
    city:                    null;
    state:                   null;
    zip:                     null;
    totalSpentByYear:        number;
    country:                 null;
    imageFileName:           null;
    joinDate:                null;
    passwordLoginWeb:        null;
    visitCount:              null;
    fristVist:               null;
    lastVisit:               null;
    favouritePolish:         null;
    favouriteTechs1:         string;
    favouriteTechs2:         string;
    favouriteTechs3:         string;
    favouriteTech:           string;
    notesApp:                null;
    coupon:                  string;
    rewardsPoint:            number;
    rating:                  null;
    memberStatus:            string;
    isKid:                   null;
    isChild:                 boolean;
    ratingDate:              null;
    rewardsMember:           null;
    isClientVerify:          null;
    memberID:                null;
    verification:            null;
    isVerifyPhoneWithMango:  null;
    isChangePhoneWhenReward: null;
    isChangePhone:           boolean;
    visitCountByYear:        null;
    isBlackList:             boolean;
    isDeleted:               null;
    atRisk:                  null;
    isVip:                   null;
    totalAmount:             null;
    customerType:            string;
}
