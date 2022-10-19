import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Employees/ChangeTechOnPopup?techID=";
const URL_MID = "&trn=";
const URL_END = "&IsResetDuaration=";

export class ChangeTechOnPopup extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public changeTechOnPopup = async (param): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(
        URL_TEST +
          param.techID +
          URL_MID +
          param.trn +
          URL_END +
          param.IsResetDuaration
      )
      .catch(catchAxiosError);
    return data;
  };
}
