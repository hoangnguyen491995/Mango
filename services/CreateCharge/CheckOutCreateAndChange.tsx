import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/Create?IsLoginRequired=";
const NUMBER = "0";
// call khi sang createcharge ApptID
export class GetCheckOut extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getCheckOut = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + NUMBER)
      .catch(catchAxiosError);
    return data;
  };
}
//https://backend_bd.enrichcous.com:4443/api/CheckOut/Create?IsLoginRequired=0