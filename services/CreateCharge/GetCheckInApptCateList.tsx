import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START =
  "api/Categories/GetCheckInApptCateList?appointment";
const URL_END = "Id=";
const URL_END_RVCNO = "&rvcNo=";

export class GetCheckInApptCateList extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getCheckInApptCateList = async (Id, rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + URL_END + Id + URL_END_RVCNO + rvcNo)
      .catch(catchAxiosError);
    return data;
  };
}

