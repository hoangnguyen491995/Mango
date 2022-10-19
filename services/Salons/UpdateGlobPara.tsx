import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Salons/UpdateGlobPara";

export class UpdateGlobPara extends HttpClient {

  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public updateGlobPara = async (ParaName:string , ParaStr: number): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST + `?ParaName=${ParaName}&ParaStr=${ParaStr}` )
      .catch(catchAxiosError);
    return data;
  };
}
