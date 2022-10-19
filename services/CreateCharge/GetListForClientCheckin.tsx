import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Categories/GetListForClientCheckin?";
const URL_END = 'rvcNo='
export class GetListForClientCheckin extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getListForClientCheckin = async (rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + URL_END + rvcNo )
      .catch(catchAxiosError);
    return data;
  };
}
