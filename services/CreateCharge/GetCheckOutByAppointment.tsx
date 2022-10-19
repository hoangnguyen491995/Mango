import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/GetCheckOutByAppointment?appointmentId=";

// call khi sang createcharge để lấy IDCheckNO
export class GetCheckOutApptID extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getCheckOutApptID = async (ApptID): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + ApptID)
      .catch(catchAxiosError);
    return data;
  };
}
//https://backend_bd.enrichcous.com:4443/api/CheckOut/GetCheckOutByAppointment?appointmentId=100021960