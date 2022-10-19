import HttpClient from "@utils/axios/instance";
import { catchAxiosError } from "@utils/axios/error";
import { IResponse } from "@utils/axios/entities";
const URL_START = "/api/CheckOut/VoidExtraItem?TrnSeq=";
const URL_END = "&rvcNo=";

export class VoidExtraItem extends HttpClient {
    constructor() {
        super(process.env.NEXT_PUBLIC_DOMAIN_API_MANGO as string);
    }
    public voidExtraItem = async (TrnSeq, rvcNo): Promise<IResponse> => {
        const data: IResponse = await this.instance
        .get(URL_START + TrnSeq + URL_END + rvcNo)
        .catch(catchAxiosError);
        return data;
    };
}

//https://backend_bd.enrichcous.com:4443/api/CheckOut/VoidExtraItem?TrnSeq=8535144&rvcNo=5