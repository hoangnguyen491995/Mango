import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Customers/GetListWithFiltering?LoadIndex="

export class GetInfoClient extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getInfoClient = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST+"50")
      .catch(catchAxiosError);
    return data;
  };
}