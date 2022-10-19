// Delete CATEGORY

import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Appointments/DeleteCategory?personId=";
const URL_END = "&rvcNo=";

export class DeleteCategory extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public deleteCategory = async (CateID, rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START + CateID + URL_END + rvcNo)
      .catch(catchAxiosError);
    return data;
  };
}


