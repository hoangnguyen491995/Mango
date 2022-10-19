import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/StartAllServices?appointmentID=";

export class StartAllServices extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public startAllServices = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_API +
          param.appointmentID +
          "&checkNo=" +
          param.checkNo +
          "&startWithNoTech=" +
          param.startWithNoTech
      )
      .catch(catchAxiosError);
    return data;
  };
}
