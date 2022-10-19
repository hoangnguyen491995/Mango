export interface IDetailClosedTicket {
  user: number;
  lastRow: number;
  listTicketManager: ListTicketManager[];
}

export interface ListTicketManager {
  appointmentStatusID: number;
  serviceDate: Date;
  appointmentStatusName: string;
  originalAppointmentID: number;
  appointmentID: number;
  appointmentSubject: string;
  customerName: string;
  startTime: Date;
  endTime: Date;
  inService: Date;
  outService: Date;
  lastChange: Date;
  employeeName: string;
  checkNo: number;
  paymentMode: string;
  tipAmount: number;
  totalBase: number;
  discount: number;
  isCombide: boolean;
  deleteReason: string;
  rating: null;
}

export interface DataType {
  key: number;
  ticket: number;
  client: string;
  tech: string;
  serviceproduct: string;
  tickettotal: number;
  tip: number;
  paymenttype: string;
  closeddatetime: Date;
}
