import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/CheckIn?Id=";
//100016327
export class PostInfoCheckIn extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public postInfoCheckIn = async (idAppt: number): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST + idAppt)
      .catch(catchAxiosError);
    return data;
  };
}
