import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/PosItems/GetListForCheckoutByCategory?categoryId=";
const CATEID = "8";
const URL_END = "&RVCNo=";
const RVCNo = "5";

export class GetCheckOutCacheJson extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getCheckOutCacheJson = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + CATEID + URL_END + RVCNo)
      .catch(catchAxiosError);
    return data;
  };
}
