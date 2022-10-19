import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/UpdateImageTech";

export class UpdateImageTech extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updateImageTech = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST,  param )
      .catch(catchAxiosError);
    return data;
  };
}
