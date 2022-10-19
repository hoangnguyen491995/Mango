import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/VoidListItemByEmployee?rvcNo=";
const URL_END = "&employeeID=";
const URL_END1 = "&checkNo=";
const URL_END2 = "&appointmentID=";

export class DeleteListItem extends HttpClient {
    
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public deleteListItem = async (
    rvcNo,
    employeeID,
    IDcheckNo,
    ApptID
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(
        URL_START +
          rvcNo +
          URL_END +
          employeeID +
          URL_END1 +
          IDcheckNo +
          URL_END2 +
          ApptID
      )
      .catch(catchAxiosError);
    return data;
  };
}

//https://backend_bd.enrichcous.com:4443/api/Appointments/VoidListItemByEmployee?rvcNo=5&employeeID=0&checkNo=5000369&appointmentID=5000369
