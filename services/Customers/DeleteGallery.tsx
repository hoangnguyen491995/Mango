import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/DeleteGallery";


export class DeleteGallery extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public deleteGallery = async (customerId : number , ids: number): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .delete(URL_API + "?customerId=" + customerId + "&ids=" + ids )
      .catch(catchAxiosError);
    return data;
  };
}
