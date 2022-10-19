import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/";
const URL_END = "/GetAppointmentScheduleForEdit?groupId=";

export class GetInfoShedulerDetail extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getInfoShedulerDetail = async (id:number): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_API + id + URL_END + "0")
      .catch(catchAxiosError);
    return data;
  };
}
