export interface IGetTicketDetailForCheckout {
  listClover: any[];
  techName: string;
  model: Model;
  countLstTicket: number;
  mainApt: number;
  empId: number;
  checkNo: number;
}

export interface Model {
  listTicket: ListTicket[];
  customer: null;
  newFormatListTickets: NewFormatListTicket[];
}

export interface ListTicket {
  checkNo: null;
  originalAppointmentID: number;
  customerID: number;
  employeeID: number;
  customerName: string;
  aptComment: string;
  techName: string;
  isMember: number;
  orderBy: number;
  lstDetailTicket: Ticket[];
  lstDetailCategory: any[];
}

export interface Ticket {
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
  clientMain: number;
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
  childTicket: Ticket | null;
  childExtra: null;
  noteDesc: string;
  idGirftCard: null;
  itemStartTime: Date;
  stringISTime: string;
  itemEndTime: Date;
  stringIETime: string;
}

export interface NewFormatListTicket {
  originalAppointmentID: number;
  customerName: string;
  listTicketDetail: ListTicketDetail[];
}

export interface ListTicketDetail {
  employeeId: number;
  tickets: Ticket[];
}
