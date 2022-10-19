import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/LoadReceipt?checkNo=";

export class LoadReceipt extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public loadReceipt = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + param.checkNo + "&rvcNo=" + param.rvcNo)
      .catch(catchAxiosError);
    return data;
  };
}
