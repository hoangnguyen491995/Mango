import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Customers/GetForAptSchedulerDetail?id=";
const END_GROUP = "&isGroup=";

export class GetForAptSchedulerDetail extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getForAptSchedulerDetail = async (
    idClient: number,
    idGroup: number
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + idClient + END_GROUP + idGroup)
      .catch(catchAxiosError);
    return data;
  };
}
