import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/GetWorkingEmployeeList";

export class GetWorkingEmployeeList extends HttpClient {

  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getWorkingEmployeeList = async (date:string , rvcNo: number, switchView: number, orderByDesc): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {params: {
        date, 
        rvcNo , 
        switchView, 
        orderByDesc       
      }} )
      .catch(catchAxiosError);
    return data;
  };
}
