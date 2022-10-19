import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/AddGallery";


export class AddGallery extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public addGallery = async (param : any): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .post(URL_API, param)
      .catch(catchAxiosError);
    return data;
  };
}
