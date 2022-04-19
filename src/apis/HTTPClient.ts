import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

export default class HTTPClient {
  private client: AxiosInstance;

  constructor(baseUrl: string, secure: boolean) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Cache-Control": "no-store"
      }
    });

    if (secure) {
      this.client.interceptors.request.use(
        async (config) => {
          const token = window.localStorage.getItem("token");
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }

  protected get = <T>(
    url: string,
    axiosReqConfig?: AxiosRequestConfig
  ): Promise<T> => this.client.get(url, axiosReqConfig).then(this.onSuccess);

  protected post = <T>(
    url: string,
    data?: unknown,
    reqConfig?: AxiosRequestConfig
  ): Promise<T> => this.client.post(url, data, reqConfig).then(this.onSuccess);
  protected put = <T>(
    url: string,
    data?: unknown,
    axiosReqConfig?: AxiosRequestConfig
  ): Promise<T> =>
    this.client.put(url, data, axiosReqConfig).then(this.onSuccess);

  private onSuccess = (res: AxiosResponse) => res.data;
}
