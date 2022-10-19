
import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/UpdatePointEarnStatus";

export class UpdatePointEarnStatus extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updatePointEarnStatus = async (body): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST,  body )
      .catch(catchAxiosError);
    return data;
  };
}
