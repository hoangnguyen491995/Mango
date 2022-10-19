import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
  
const URL_TEST = "/api/Employees/GetListInfoBasic?EmployeeId=";
const URL_END = "&TakeAppt="

export class GetInfoTech extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getInfoTech = async (): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + "0" + URL_END + "1")
      .catch(catchAxiosError);
    return data;
  };
}
