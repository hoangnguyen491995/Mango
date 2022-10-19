import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/SendSMSListBook";

export class SendSMSListBook extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public sendSMSListBook = async (phone, from, to): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_API + "?phone=" + phone + "&from=" + from + "&to=" + to)
      .catch(catchAxiosError);
    return data;
  };
}
