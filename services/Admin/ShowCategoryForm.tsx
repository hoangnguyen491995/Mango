import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_API = "/api/Admin/ShowCategoryForm";
interface IParam {
  FromDate: string;
  ToDate: string;
  TicketNum: string;
  CustomerNum: string;
  EmployeeID: string;
  Payment: string;
  Promo: string;
  Type: string;
  LastRow: number;
  OrderBy: string;
}
export class ShowCategoryForm extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public showCategoryForm = async (
    FromDate,
    ToDate,
    TicketNum,
    CustomerNum,
    EmployeeID,
    Payment,
    Promo,
    Type,
    LastRow,
    OrderBy
  ): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_API, {
        params: {
          FromDate,
          ToDate,
          TicketNum,
          CustomerNum,
          EmployeeID,
          Payment,
          Promo,
          Type,
          LastRow,
          OrderBy,
        },
      })
      .catch(catchAxiosError);
    return data;
  };
}
