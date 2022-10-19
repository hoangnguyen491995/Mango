import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/GetInformationForCheckoutPopup?AppointmentID=";

interface Body {
  AppointmentID: number;
  History: number;
  AppStatus: number;
  Checkno: number;
  CusID: number;
  IsGroup: number;
  GroupID: number;
}
export class GetInformationForCheckoutPopup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getInformationForCheckoutPopup = async (
    body: Body
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_API +
          body.AppointmentID +
          "&History=" +
          body.History +
          "&AppStatus=" +
          body.AppStatus +
          "&Checkno=" +
          body.Checkno +
          "&CusID=" +
          body.CusID +
          "&IsGroup=" +
          body.IsGroup +
          "&GroupID=" +
          body.GroupID
      )
      .catch(catchAxiosError);
    return data;
  };
}
