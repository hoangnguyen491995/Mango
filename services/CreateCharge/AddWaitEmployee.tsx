import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/AddWaitEmployee?appointmentID=";
const URL_END = "&employeeID=";
const URL_END1 = "&rvcNo=";
const URL_END2 = "&isStart=";

export class AddWaitEmployee extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public addWaitEmployee = async (
    ApptID:number,
    EmployeeID:number,
    rvcNo:number,
    isStart:boolean
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_START +
          ApptID +
          URL_END +
          EmployeeID +
          URL_END1 +
          rvcNo +
          URL_END2 +
          isStart
      )
      .catch(catchAxiosError);
    return data;
  };
}

// https://backend_bd.enrichcous.com:4443/api/Appointments/AddWaitEmployee?appointmentID=50001067&employeeID=50007&rvcNo=5&isStart=false
