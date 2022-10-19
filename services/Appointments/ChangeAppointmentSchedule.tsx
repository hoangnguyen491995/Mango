import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/ChangeAppointmentSchedule";


export class ChangeAppointmentSchedule extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public changeAppointmentSchedule = async (param : any): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .post(URL_API, param)
      .catch(catchAxiosError);
    return data;
  };
}
