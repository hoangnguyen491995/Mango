import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/RequestEmployee?appointmentId=";
interface Body {
  appointmentId: number;
  employeeId: number;
  isRequest: boolean;
  rvcNo: number;
}
export class RequestEmployee extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public requestEmployee = async (body: Body): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_API +
          body.appointmentId +
          "&employeeId=" +
          body.employeeId +
          "&isRequest=" +
          body.isRequest +
          "&rvcNo=" +
          body.rvcNo
      )
      .catch(catchAxiosError);
    return data;
  };
}
