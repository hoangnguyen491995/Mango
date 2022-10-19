import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/login";

export class Login extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public login = async (body): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START, body)
      .catch(catchAxiosError);
    return data;
  };
}
