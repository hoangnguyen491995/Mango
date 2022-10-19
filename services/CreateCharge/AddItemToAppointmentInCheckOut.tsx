import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/PosItems/AddItemToAppointmentInCheckOut";

export class AddItemAppointment extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public addItemAppointment = async (param: any): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_API, param)
      .catch(catchAxiosError);
    return data;
  };
}

//AddItemAppointment
//https://backend_bd.enrichcous.com:4443/api/PosItems/AddItemToAppointmentInCheckOut
