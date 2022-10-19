import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Employees/GetListTimeByDate?employeeId=";
const URL_END = "&date=";

export class GetListTimeByDate extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getListTimeByDate = async (idTech, date): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + idTech + URL_END + date)
      .catch(catchAxiosError);
    return data;
  };
}
