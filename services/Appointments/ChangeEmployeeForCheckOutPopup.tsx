import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API =
  "/api/Appointments/ChangeEmployeeForCheckOutPopup?appointmentId=";

export class ChangeEmployeeForCheckOutPopup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public changeEmployeeForCheckOutPopup = async (
    appointmentId,
    checkNo,
    employeeId,
    isFullTurn,
    currentEmployeeId
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .put(
        URL_API +
          appointmentId +
          "&checkNo=" +
          checkNo +
          "&employeeId=" +
          employeeId +
          "&isFullTurn=" +
          isFullTurn +
          "&currentEmployeeId=" +
          currentEmployeeId
      )
      .catch(catchAxiosError);
    return data;
  };
}
