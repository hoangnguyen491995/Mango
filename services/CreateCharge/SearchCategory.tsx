import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/HLstItemCacheJson?CateID=";

export class GetCheckOutCacheJson extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getCheckOutCacheJson = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START )
      .catch(catchAxiosError);
    return data;
  };
}