import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/TrackDurAptAll?AptID=";

export class TrackDurAptAll extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public trackDurAptAll = async (AptID): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + AptID)
      .catch(catchAxiosError);
    return data;
  };
}
