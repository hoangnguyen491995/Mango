import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Customers/GetListWithFiltering?LoadIndex=";
const URL_CENTER = "&CustomerName=";
const URL_END = "&SortType=0";

export class APIGetClientByFilter extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public GetClientByFilter = async (body): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_START +
          body.loadIndex +
          URL_CENTER +
          body.customerName +
          URL_END +
          body.sortType
      )
      .catch(catchAxiosError);
    return data;
  };
}
