import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/NotifyOnlineBooking";

export class NotifyOnlineBooking extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public notifyOnlineBooking = async (rvcNo, limit): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST +
        `?rvcNo=${rvcNo}&&limit=${limit}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
