import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/VoidItem?sum=";

export class VoidItem extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public voidItem = async (sum, Checkno): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST + sum + "&Checkno=" + Checkno)
      .catch(catchAxiosError);
    return data;
  };
}
