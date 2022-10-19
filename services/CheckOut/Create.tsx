import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/Create?IsLoginRequired=";

export class Create extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public create = async (IsLoginRequired, PassCode): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + IsLoginRequired + "&PassCode=" + PassCode)
      .catch(catchAxiosError);
    return data;
  };
}
