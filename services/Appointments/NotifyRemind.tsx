import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/NotifyRemind?time=";

export class NotifyRemind extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public notifyRemind = async (
    time,
    appointmentId,
    customerId
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_TEST +
          time +
          "&appointmentId=" +
          appointmentId +
          "&customerId=" +
          customerId
      )
      .catch(catchAxiosError);
    return data;
  };
}
