import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/LoadTurnTracker?isManualTurn=";

export class LoadTurnTracker extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public loadTurnTracker = async (isManualTurn): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + isManualTurn)
      .catch(catchAxiosError);
    return data;
  };
}
