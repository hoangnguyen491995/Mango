import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/Employees/GetPointEarn?appointmentId=";

const URL_END = "&customerId=";
const RVCNo = "&rvcNo=";

export class GetPointEarn extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
  }
  public getPointEarn = async (ApptId, CusId,rvcNo): Promise<IResponse> => {
    const data: IResponse = await this.instance
      .get(URL_START + ApptId + URL_END + CusId + RVCNo+rvcNo)
      .catch(catchAxiosError);
    return data;
  };
}

//https://backend_bd.enrichcous.com:4443/api/Employees/GetPointEarn?appointmentId=100023809&customerId=724331&rvcNo=0import
