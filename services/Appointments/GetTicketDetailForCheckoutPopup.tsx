import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST =
  "/api/Appointments/GetTicketDetailForCheckoutPopup?AppointmentID=";

interface Body {
  AppointmentID: number;
  History: number;
  AppStatus: number;
  Checkno: number;
  CusID: number;
  EmpID: number;
  EmpName: string;
}
export class GetTicketDetailForCheckoutPopup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getTicketDetailForCheckoutPopup = async (
    body: Body
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_TEST +
          body.AppointmentID +
          "&History=" +
          body.History +
          "&AppStatus=" +
          body.AppStatus +
          "&Checkno=" +
          body.Checkno +
          "&CusID=" +
          body.CusID +
          "&EmpID=" +
          body.EmpID +
          "&EmpName=" +
          body.EmpName
      )
      .catch(catchAxiosError);
    return data;
  };
}
