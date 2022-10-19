import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Appointments/GetTicketDetailForCheckout?";

const URL_END = "appointemtId=";
const URL_END1 = "&checkNo=";
export class GetTicketDetailForCheckout extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getTicketDetailForCheckout = async (
    ID: any,
    checkNO: any
  ): Promise<IResponse> => {
    // console.log(checkNO);
    const data: IResponse = await this.instance
      .get(URL_START + URL_END + ID + URL_END1 + checkNO)
      .catch(catchAxiosError);
    return data;
  };
}
// list add tech +
// https://backend_bd.enrichcous.com:4443/api/Appointments/GetTicketDetailForCheckout?appointemtId=100019531&checkNo=1
