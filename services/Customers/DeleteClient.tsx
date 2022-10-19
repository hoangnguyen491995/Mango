import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Customers/DeleteClient";


export class DeleteClient extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public deleteClient = async (rvcNo : number , clientID: number, deleteBy: string): Promise<IResponse> => {
    const data: IResponse = await this.instance
    .delete(URL_API + "?rvcNo=" + rvcNo + "&clientID=" + clientID + "&deleteBy=" + deleteBy)
      .catch(catchAxiosError);
    return data;
  };
}
