import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/GetCustomerMoreInfo";


export class GetCustomerMoreInfo extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getCustomerMoreInfo = async (
    customerId: Number
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_API +"?customerId=" +
        customerId 
         
      )
      .catch(catchAxiosError);
    return data;
  };
}
