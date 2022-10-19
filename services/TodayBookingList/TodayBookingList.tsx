import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Appointments/GetTodayBookingList?date="
   


export class GetInfoTodayBooking extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getInfoTodayBooking = async (dateEnd:any): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START +dateEnd)
      .catch(catchAxiosError)
    return data
  }
}
