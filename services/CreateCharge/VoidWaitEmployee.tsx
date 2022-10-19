import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/VoidWaitEmployee?appointmentID=";
const URL_END = "&employeeID=";
const URL_END1 = "&rvcNo=";
const URL_END2 = "&isStart=";

export class DeleteWaitEmployee extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public deleteWaitEmployee = async (
    ApptId,
    employeeID,
    rvcNo,
    isStart
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_START +
          ApptId +
          URL_END +
          employeeID +
          URL_END1 +
          rvcNo +
          URL_END2 +
          isStart
      )
      .catch(catchAxiosError);
    return data;
  };
}

// https://backend_bd.enrichcous.com:4443/api/Appointments/VoidWaitEmployee?appointmentID=5000170&employeeID=0&rvcNo=5&isStart=true
