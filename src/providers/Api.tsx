import { createContext } from "react";
import Api from "../apis/Api";

export const ApiContext = createContext<Api>(null as any);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const api = new Api(process.env.REACT_APP_API_URL!, true);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
