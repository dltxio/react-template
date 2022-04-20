import { AxiosRequestConfig } from "axios";
import HTTPClient from "./HTTPClient";

type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | undefined;
  phoneNumberVerified: boolean;
  admin: boolean;
  hasBankAccount: boolean;
  idVerified: boolean;
  maxIdVerificationFailuresReached: boolean;
};

export default class Api extends HTTPClient {
  // These are just examples to get you going
  // Remove if not required
  public login = async (
    url: string,
    body: {
      email: string;
      password: string;
    }
  ) => this.post<string>(url, body);

  // Can keep generic here but may be worth continuing to specify
  // for each request as we can list the return types all in one spot
  // as shown below
  public getFetcher = async (url: string) => this.get<any>(url);

  public getFetcherWithHeader = async (
    url: string,
    headers: AxiosRequestConfig
  ) => this.get<any>(url, headers);

  public fetchAuthUser = async () => this.get<User>(`/user`);
}
