import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/FontTechDescription";

export class FontTechDescription extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public getFontTechDescription = async (rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_TEST, {params: {
        rvcNo        
      }} )
      .catch(catchAxiosError);
    return data;
  };
}
