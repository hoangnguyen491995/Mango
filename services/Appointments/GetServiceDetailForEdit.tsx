import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetServiceDetailForEdit?appointmentId=";
const URL_END = "&groupId=";

export class GetServiceDetailForEdit extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getServiceDetailForEdit = async (
    appointmentId,
    groupId
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + appointmentId + URL_END + groupId)
      .catch(catchAxiosError);
    return data;
  };
}
