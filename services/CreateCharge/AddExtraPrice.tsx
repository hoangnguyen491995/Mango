import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/AddExtraPrice?appointmentId=";
const URL_END = "&lstItem=%27";
const URL_END_VALUE = "%27&value=";

// POST CATEGORY

export class AddExtraPrice extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public addExtraPrice = async (
    AptID,
    Item,
    value
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START + AptID + URL_END + Item + URL_END_VALUE + value)
      .catch(catchAxiosError);
    return data;
  };
}

//https://backend_bd.enrichcous.com:4443/api/CheckOut/AddExtraPrice?appointmentId=5000759&lstItem=%278533635%27&value=20
