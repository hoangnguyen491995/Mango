import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/SendSMSChangePasswordClient";


export class SendSMSChangePasswordClient extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public sendSMSChangePasswordClient = async (rvcNo : number , customerID: number, type: string): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .post(URL_API + "?rvcNo=" + rvcNo + "&customerID=" + customerID + "&type=" + type)
      .catch(catchAxiosError);
    return data;
  };
}
