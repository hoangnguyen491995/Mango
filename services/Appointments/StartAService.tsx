import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/StartAService";

export class StartAService extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public startAService = async (AppointmentDetailID, appID): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST +
        `?AppointmentDetailID=${AppointmentDetailID}&appID=${appID}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
