import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/LoginTechEmpClock?empId=";

export class LoginTechEmpClock extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public loginTechEmpClock = async (empId): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST + empId)
      .catch(catchAxiosError);
    return data;
  };
}
