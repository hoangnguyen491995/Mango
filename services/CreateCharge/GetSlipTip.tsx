import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/GetSlipTip?checkno=";

export class GetSlipTip extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getSlipTip = async (CheckNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + CheckNo)
      .catch(catchAxiosError);
    return data;
  };
}
// 'https://backend_bd.enrichcous.com:4443/api/CheckOut/GetSlipTip?checkno=1000388'
