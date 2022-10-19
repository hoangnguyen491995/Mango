import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/CheckIn";

export class CheckIn extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public checkIn = async (appointmentId ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST +
        `?Id=${appointmentId}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
