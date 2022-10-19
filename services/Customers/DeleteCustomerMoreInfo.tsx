import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/DeleteCustomerMoreInfo";


export class DeleteCustomerMoreInfo extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public deleteCustomerMoreInfo = async (id : number, customerId: number): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .delete(URL_API + "?id=" + id + "&customerId=" + customerId)
      .catch(catchAxiosError);
    return data;
  };
}
