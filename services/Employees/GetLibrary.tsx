import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/GetLibrary?promotion=";

export class GetLibrary extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getLibrary = async (promotion): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + promotion)
      .catch(catchAxiosError);
    return data;
  };
}
