import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/CancelAppointment";

export class CancelAppointment extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public postCancelAppointment = async (appointmentId, reason, rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST +
        `?appointmentId=${appointmentId}&reason=${reason}&rvcNo=${rvcNo}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
