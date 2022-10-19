import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_START = "/api/CheckOut/AddUpdatePreTip?checkNo=";
const URL_END = "&amountTip=";
const URL_END1 = "&rvcNo=5&EmployeeID=";

export class UpdatePreTip extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public updatePreTip = async (
    CheckNo,
    Tip,
    EmployeeID
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_START + CheckNo + URL_END + Tip + URL_END1 + EmployeeID)
      .catch(catchAxiosError);
    return data;
  };
}
//https://backend_bd.enrichcous.com:4443/api/CheckOut/AddUpdatePreTip?checkNo=100026412&amountTip=50&rvcNo=0&EmployeeID=0
