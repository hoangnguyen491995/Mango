import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/CancelNoShow";

export class CancelNoShow extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public postCancelNoShow = async (appointmentId, reason ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST +
        `?appointmentId=${appointmentId}&reason=${reason}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
