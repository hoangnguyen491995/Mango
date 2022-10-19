import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/GetTicketInformation?appointemtId=";
const URL_END = "&checkNo=";

export class GetTicketInformation extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getTicketInformation = async (
    appointemtId,
    checkNo
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + appointemtId + URL_END + checkNo)
      .catch(catchAxiosError);
    return data;
  };
}
