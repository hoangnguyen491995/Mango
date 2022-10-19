import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/UpdateCustomerMoreInfo";


export class UpdateCustomerMoreInfo extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updateCustomerMoreInfo = async (param : any): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .put(URL_API, param)
      .catch(catchAxiosError);
    return data;
  };
}
