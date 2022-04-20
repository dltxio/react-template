import useSWR from "swr";
import useApi from "./useApi";

type UseGetHook = {
  handleSimpleFetch: () => {
    simpleFetchData: any;
    simpleFetchIsLoading: any;
    simpleFetchIsError: any;
  };
  handleFetchWithHeader: () => { data: any; isLoading: any; isError: any };
};

const useGet = (): UseGetHook => {
  const api = useApi();

  const CMCKey = process.env.COIN_MARKETCAP_API_KEY as string;
  const headers = {
    headers: { "X-CMC_PRO_API_KEY": CMCKey }
  };

  const handleSimpleFetch = () => {
    // Simple get
    const { data, error } = useSWR(
      "https://api.coingecko.com/api/v3/ping",
      (url): Promise<any> => api.getFetcher(url)
    );
    return {
      simpleFetchData: data,
      simpleFetchIsLoading: !error && !data,
      simpleFetchIsError: error
    };
  };

  const handleFetchWithHeader = () => {
    // Get with key in header
    // This example has a CORS issues, find a better example endpoint
    const { data, error } = useSWR(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      (url): Promise<any> => api.getFetcherWithHeader(url, headers)
    );
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    };
  };

  return { handleSimpleFetch, handleFetchWithHeader };
};

export default useGet;
