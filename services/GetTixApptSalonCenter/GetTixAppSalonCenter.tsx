import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/GetListTickets?Page=";

interface Props {
  Page: number;
  Quantity: number;
  RvcNo: number;
  AppointmentId: string;
  Status: string;
}
export class APIGetTixSalonCenter extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public GetTixSalonCenter = async (body: Props): Promise<IResponse> => {
    const appointmentId =
      body.AppointmentId != "" ? "&AppointmentId=" + body.AppointmentId : "";
    const status = body.Status != "" ? "&Status=" + body.Status : "";

    const data: IResponse = await this.instance
      .get(
        URL_START +
          body.Page +
          `&Quantity=${body.Quantity}&RvcNo=${body.RvcNo}${appointmentId}${status}`
      )
      .catch(catchAxiosError);
    return data;
  };
}
