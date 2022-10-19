import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Appointments/GetPhoneNumberByAptId";
 
export class GetPhoneNumberByAptId extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getPhoneNumberByAptId = async (AptId): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {params: {
        AptId,
       
      }} )
      .catch(catchAxiosError);
    return data;
  };
}
