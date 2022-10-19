import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/DoneAService";

export class DoneAService extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public doneAService = async (appointmentDetailID, rvcNo, employeeId): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_API + "?appointmentDetailID=" + appointmentDetailID + "&rvcNo=" + rvcNo + "&employeeId=" + employeeId)
      .catch(catchAxiosError);
    return data;
  };
}
