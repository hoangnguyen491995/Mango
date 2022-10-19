import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Customers/";
const URL_END = "/GetInfoCustomerForMakeApt";

export class APIClientInfo extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public ClientInfo = async (idClient): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + idClient + URL_END)
      .catch(catchAxiosError);
    return data;
  };
}
