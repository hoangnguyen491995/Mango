import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/PosItems/GetListByCategory?cateId=";

export class APIItemService extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public ItemService = async (idService): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + idService)
      .catch(catchAxiosError);
    return data;
  };
}
