import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/GetTicketPayment?appointmentId=";

export class GetTicketPayment extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getTicketPayment = async (appointmentId): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + appointmentId)
      .catch(catchAxiosError);
    return data;
  };
}
