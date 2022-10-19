import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Appointments/DetailInfoTixSalonPopup";

export class GetDetailInfoTixSalonPopup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getDetailInfoTixSalonPopup = async (
    checkNo,
    status,
    appID,
    loadDetail
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_API, {
        params: {
          checkNo,
          status,
          appID,
          loadDetail,
        },
      })
      .catch(catchAxiosError);
    return data;
  };
}
