export interface IDetailTixSalonCenter {
  checkNo: number;
  appointmentID: number;
  clientName: string;
  checkinTime: string;
  indexNum: number;
  status: number;
  rvcNo: number;
  bookType: number;
  listApptDetail: IListApptDetail[];
}

export interface IListApptDetail {
  appointmentDetailID: number;
  employeeID: number;
  employeeName: string;
  isCategory: boolean;
  isRequestTech: boolean;
  listServies: IListServies[];
}

export interface IListServies {
  amount: number;
  itemCode: number;
  itemName: string;
  trnSeq: number;
  duration: number;
}
export interface IListStatusMessage {
  rdStatusWaiting: IRDStatusWaiting[];
  rdStatusDetails: RDStatusDetail[];
}

export interface IRDStatusWaiting {
  id: number;
  description: string;
  addNum: boolean;
  rvcNo: number;
  status: boolean;
}
export interface RDStatusDetail {
  id: number;
  appointmentID: number;
  description: string;
  num: number;
  rvcNo: number;
  status: number;
}
