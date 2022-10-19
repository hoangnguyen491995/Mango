import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/PosItems/GetListForComboCategory";

const URL_END = "?id=";

export class GetByCategory extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getByCategory = async (ID): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + URL_END + ID)
      .catch(catchAxiosError);
    return data;
  };
}
///api/PosItems/GetListForComboCategory?id=