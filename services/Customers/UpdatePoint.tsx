import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/UpdatePoint";

export class UpdatePoint extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updatePoint = async (Point: number, CustomerID: number  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .put( URL_API +
        "?Point=" +
        Point +
        "&CustomerID=" +
        CustomerID 
       )
      .catch(catchAxiosError);
    return data;
  };
}
