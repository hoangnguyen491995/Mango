import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/AddWaitEmployee?appointmentID=";

export class AddWaitEmployee extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public addWaitEmployee = async (
    appointmentID,
    employeeID,
    rvcNo,
    isStart
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_API +
          appointmentID +
          "&employeeID=" +
          employeeID +
          "&rvcNo=" +
          rvcNo +
          "&isStart=" +
          isStart
      )
      .catch(catchAxiosError);
    return data;
  };
}
