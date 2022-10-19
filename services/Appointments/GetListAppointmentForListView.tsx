import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/Appointments/GetListAppointmentForListView";
export class GetListAppointmentForListView extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getListAppointmentForListView = async (
    DateFrom,
    DateTo,
    // EmployeeId,
    sum,
    // TakeAppt,
    Filter,
    Page,
    PageSize
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START, {
        params: {
          DateFrom,
          DateTo,
          // EmployeeId,
          sum,
          // TakeAppt,
          Filter,
          Page,
          PageSize,
        },
      })
      .catch(catchAxiosError);
    return data;
  };
}
