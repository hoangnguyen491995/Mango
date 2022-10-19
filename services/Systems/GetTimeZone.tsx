import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_TEST = "/api/Employees/GetListInfoBasic";


class GetTimeZone extends HttpClient {
    constructor() {
      super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
    }
  
    public getTimeZone = async (): Promise<IResponse> => {
      const data: IResponse = await this.instance
        .get(URL_TEST)
        .catch(catchAxiosError);
      return data;
    };
  }

export default GetTimeZone