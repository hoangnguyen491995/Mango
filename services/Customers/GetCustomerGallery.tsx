import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/GetCustomerGallery";


export class GetCustomerGallery extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getCustomerGallery = async (
    customerId: Number,
    pageSize: Number
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_API +"?customerId=" +
        customerId  + "&pageSize=" + pageSize
         
      )
      .catch(catchAxiosError);
    return data;
  };
}
