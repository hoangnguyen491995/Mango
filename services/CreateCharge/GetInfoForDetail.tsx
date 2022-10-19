import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Customers/GetInfoForCreateCharge?";
const URL_END = 'cusID='
export class GetInfoForDetail extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getInfoForDetail = async (cusID,rdCusID,appID ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + URL_END + cusID + '&rdCusID=' + rdCusID  +'&appID=' + appID )
      .catch(catchAxiosError);
    return data;
  };
}
 //show detail infor customers
//https://backend_bd.enrichcous.com:4443/api/Customers/GetInfoForCreateCharge?cusID=724323&rdCusID=0&appID=100020477