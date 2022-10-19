import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/ChangeClientByIDApt?apt=";

export class ChangeClientByIDApt extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public changeClientByIDApt = async (apt, CustomerID): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .put(URL_API + apt + "&CustomerID=" + CustomerID)
      .catch(catchAxiosError);
    return data;
  };
}
