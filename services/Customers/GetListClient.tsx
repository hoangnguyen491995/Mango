import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/GetListClient";


export class GetListClient extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getListClient = async (
    clientName: String,
    loadIndex: Number,
    type: Number
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_API +"?clientName=" + clientName + "&loadIndex="+ loadIndex + "&type=" + type
      )
      .catch(catchAxiosError);
    return data;
  };
}