import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

export default class HTTPClient {
  private client: AxiosInstance;
  private customOnError: ((error: any) => void) | undefined;

  constructor(baseURL: string, secure: boolean) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: 0
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
  ): Promise<T> =>
    this.client
      .get<T>(url, axiosReqConfig)
      .then(this.onSuccess)
      .catch(this.onError);

  protected post = <T>(
    url: string,
    data?: unknown,
    reqConfig?: AxiosRequestConfig
  ): Promise<T> =>
    this.client
      .post<T>(url, data, reqConfig)
      .then(this.onSuccess)
      .catch(this.onError);

  protected put = <T>(
    url: string,
    data?: unknown,
    axiosReqConfig?: AxiosRequestConfig
  ): Promise<T> =>
    this.client
      .put<T>(url, data, axiosReqConfig)
      .then(this.onSuccess)
      .catch(this.onError);

  public setCustomOnError = (onError: (error: any) => void) => {
    this.customOnError = onError;
  };

  private onSuccess = (res: AxiosResponse) => res.data;

  private onError = (e: AxiosError) => {
    const error = e.response ? e.response.data : e;

    if (this.customOnError) {
      this.customOnError(error);
    }

    throw error;
  };
}
