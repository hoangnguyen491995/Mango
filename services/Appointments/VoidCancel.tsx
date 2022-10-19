import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/VoidCancel";
interface Param {
  isCancel: boolean;
  reasons: string;
  appointmentId: number;
  checkNo: number;
  partyId: number;
  turnControl: string;
}
export class VoidCancel extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public voidCancel = async (body: Param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST, body)
      .catch(catchAxiosError);
    return data;
  };
}
