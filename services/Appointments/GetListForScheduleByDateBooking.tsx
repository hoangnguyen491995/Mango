import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetListForScheduleByDateBooking";
 
export class GetListForScheduleByDateBooking extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getListForScheduleByDateBooking = async (DateFrom, DateTo, sum, InterActive): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {params: {
        DateFrom,
        DateTo, 
        sum,
        InterActive
        
      }} )
      .catch(catchAxiosError);
    return data;
  };
}
