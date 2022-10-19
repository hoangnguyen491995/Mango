import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/ListStatusMessage?rvcNo=";

export class ListStatusMessage extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public listStatusMessage = async (
    rvcNo,
    appointmentId
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + rvcNo + "&appointmentId=" + appointmentId)
      .catch(catchAxiosError);
    return data;
  };
}
