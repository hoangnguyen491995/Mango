import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetListCancelReasonForTicket";

export class GetListCancelReasonForTicket extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getListCancelReasonForTicket = async (
    checkNo,
    appID,
    status
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {
        params: {
          checkNo,
          appID,
          status,
        },
      })
      .catch(catchAxiosError);
    return data;
  };
}
