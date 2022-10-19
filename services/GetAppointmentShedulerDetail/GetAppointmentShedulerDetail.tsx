import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetAppointmentShedulerDetail?Id=";

export class GetInfoShedulerDetail extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getInfoShedulerDetail = async (idClient:number): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST+idClient)
      .catch(catchAxiosError);
    return data;
  };
}
