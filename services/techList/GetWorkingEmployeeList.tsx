import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
  
const URL_TEST = "/api/Employees/GetWorkingEmployeeList?date=";
const URL_END = "&switchView="

export class GetWorkingInfoTech extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getWorkingInfoTech = async (day ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + day + URL_END + "1")
      .catch(catchAxiosError);
    return data;
  };
}