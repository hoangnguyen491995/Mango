//https://backend_bd.enrichcous.com:4443/api/Appointments/VoidItem?sum=5128452&Checkno=100025918
import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Appointments/VoidItem?sum=";
const URL_END = "&Checkno=";

export class DeleteVoidItem extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public deleteVoidItem = async (SumID, CheckNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START + SumID + URL_END + CheckNo)
      .catch(catchAxiosError);
    return data;
  };
}
