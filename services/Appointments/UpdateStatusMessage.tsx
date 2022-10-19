import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/UpdateStatusMessage";

export class UpdateStatusMessage extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public updateStatusMessage = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .put(URL_TEST, param)
      .catch(catchAxiosError);
    return data;
  };
}
