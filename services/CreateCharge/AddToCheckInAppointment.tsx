///api/Appointments/AddCategory?appointmentId=
import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Appointments/AddCategory?appointmentId=";
const URL_END = " &customerId=";
const URL_END_CATEID = " &cateId=";

// POST CATEGORY

export class AddToCheckInAppointment extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public addToCheckInAppointment = async (
    CateID,
    CusID,
    AptID
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START + CateID + URL_END + CusID + URL_END_CATEID + AptID)
      .catch(catchAxiosError);
    return data;
  };
}
