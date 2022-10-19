import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
import HttpClient from "@utils/axios/instance";

const URL_API = "/api/Customers/FastRegister";

export class FastRegister extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public fastRegister = async (body: any): Promise<IResponse> => {
    console.log(body);
    const data: IResponse = await this.instance
      .post(URL_API, body)
      .catch(catchAxiosError);
    return data;
  };
}

//https://backend_bd.enrichcous.com:4443/api/Customers/FastRegister
