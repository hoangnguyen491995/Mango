import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/GetClientNote?customerId=";

export class GetClientNote extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getClientNote = async (customerId, isCheckout): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_API + customerId + "&isCheckOut=" + isCheckout)
      .catch(catchAxiosError);
    return data;
  };
}
