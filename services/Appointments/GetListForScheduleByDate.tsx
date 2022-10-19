import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetListForScheduleByDate";
 
export class GetListForScheduleByDate extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getListForScheduleByDate = async (DateFrom, DateTo, sum, type): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {params: {
        DateFrom,
        DateTo, 
        sum,
        type,
      }} )
      .catch(catchAxiosError);
    return data;
  };
}
