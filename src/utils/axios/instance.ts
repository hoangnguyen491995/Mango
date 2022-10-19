import axios, { AxiosInstance, AxiosResponse } from "axios";
import queryString from "query-string";

import Cookies from "js-cookie"

export default abstract class asyncHttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    // const accessToken = "6889" localStorage.getItem("AccessToken") || 
    const accessTokens = "6889"
    const headers: any = {
      "content-type": "application/json",
      // "accept": "*/*",
      // "access-control-allow-credentials": "true",
      // "access-control-allow-headers": "X-Requested-With,origin,content-type,accept",
      // "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      "Access-Control-Allow-Origin": "*",

    };


    if (accessTokens) headers.Authorization = `Bearer ${accessTokens}`;
    this.instance = axios.create({
      baseURL,
      headers,
      paramsSerializer: (params) => queryString.stringify(params),
    });

    this.responseInterceptor();
  }

  test = (id: string) => {
    // console.log(id);

  };

  private responseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this.handleError
    );
  };

  private _handleResponse = ({ data, status }: AxiosResponse): any => ({
    data,
    status,
  });

  protected handleError = (error: any) => {
    throw error;
  };
}
