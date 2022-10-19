import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/DeclineOnlineBooking";

export class DeclineOnlineBooking extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public declineOnlineBooking = async (rvcNo: Number, appointmentID: Number, employeeID: Number): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST + `?rvcNo=${rvcNo}&appointmentID=${appointmentID}&employeeID=${employeeID}`)
      .catch(catchAxiosError);
    return data;
  };
}
