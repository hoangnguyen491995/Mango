import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";


const URL_TEST = "/api/PosItems/CheckAssignByEmployee";

interface IEmpAssignService {
  itemId: number;
  empId: number;
}

export class APIEmpAssignSer extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public EmpAssignSer = async (body: IEmpAssignService): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST, body)
      .catch(catchAxiosError);
    return data;
  };
}
