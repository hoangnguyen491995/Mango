import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/GetWaitingHistory?date=";

export class APIGetWaitingListHistory extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public GetWaitingListHistory = async (date): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + date)
      .catch(catchAxiosError);
    return data;
  };
}
