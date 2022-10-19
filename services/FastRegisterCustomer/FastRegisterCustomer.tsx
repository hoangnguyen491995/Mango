import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";

const URL_TEST = "/api/Customers/FastRegister";

interface IRegisterCustomer {
  date: string;
  empId: number;
  gender: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  sex: string;
  portalCode: string;
  isKid: boolean;
  rvcNo: number;
}

export class APIFastRegister extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }

  public FastRegister = async (body: IRegisterCustomer): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .post(URL_TEST, body)
      .catch(catchAxiosError);
    return data;
  };
}
