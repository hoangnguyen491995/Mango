import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
import { parseUrl } from "query-string";

const URL_TEST = "/api/Appointments/CreateOrUpdate";
export interface IAddNewAppt {
  root: Root;
}

export interface Root {
  Appointment: IAppointment;
}

export interface IAppointment {
  AppointmentID: string;
  CustomerID: string;
  CustomerName: string;
  CustomerPhone: string;
  AppointmentSubject: string;
  ServiceDate: string;
  StartTime: string;
  EndTime: string;
  AppointmentStatusID: string;
  EmployeeID: string;
  GroupEmployeeName: string;
  AptComment: string;
  TotalAmount: string;
  DepositAmount: string;
  CrearteBy: string;
  IsBookOnline: string;
  BarcodeTicket: string;
  TotalDuration: string;
  IDParty: string;
  IsStartAllSameTime: string;
  ApptIndex: string;
  Detail: IDetail;
}

export interface IDetail {
  Item: IItem[];
  _ApptIndex: string;
}

export interface IItem {
  ItemID: string;
  ItemName: string;
  ItemPrice: string;
  Duration: string;
  EmployeeID: string;
  EmployeeName: string;
  Type: string;
  IsCategory: string;
  IsRequestTech: string;
  StartTime: string;
  EndTime: string;
  DurationItem: string;
  IsChangeTime: string;
}

export class APIConfirmAddNewTicket extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public ConfirmAddNewTicket = async (body): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST, body)
      .catch(catchAxiosError);
    return data;
  };
}
