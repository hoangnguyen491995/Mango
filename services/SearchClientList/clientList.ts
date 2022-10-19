import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Customers/GetListWithFiltering?LoadIndex=100"
const URL_END= '&CustomerName='
export class GetSearchInfoClient extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getSearchInfoClient = async ( NameValue:string): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get( URL_TEST + URL_END + NameValue )
      .catch(catchAxiosError);
    return data;
  };
}
