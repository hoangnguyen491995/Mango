import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/CategoryStypes";

export class APIListCategoryGroup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public ListCategoryGroup = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST)
      .catch(catchAxiosError);
    return data;
  };
}
