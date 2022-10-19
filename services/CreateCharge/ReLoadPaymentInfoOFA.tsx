import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/ReLoadPaymentInfoOFA?CheckNo=";

export class GetReLoadPayment extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getReLoadPayment = async (CheckNO): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + CheckNO)
      .catch(catchAxiosError);
    return data;
  };
}
//https://backend_bd.enrichcous.com:4443/api/CheckOut/ReLoadPaymentInfoOFA?CheckNo=0
