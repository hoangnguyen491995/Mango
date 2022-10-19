import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/UpdateNote";

export class UpdateNote extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updateNote = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_API, param)
      .catch(catchAxiosError);
    return data;
  };
}
