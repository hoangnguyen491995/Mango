import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/LstItemByFilterLstView?keyword=";

export class LstItemByFilterLstView extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public lstItemByFilterLstView = async (
    keyword,
    startnumber
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + keyword + "&startnumber=" + startnumber)
      .catch(catchAxiosError);
    return data;
  };
}
