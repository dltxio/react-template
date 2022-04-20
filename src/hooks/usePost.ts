import useSWR from "swr";
import useApi from "./useApi";

type UsePostHook = {
  handleSimplePost: (body: { email: string; password: string }) => {
    simplePostData: any;
    simplePostIsLoading: any;
    simplePostIsError: any;
  };
};

const usePost = (): UsePostHook => {
  const api = useApi();

  const handleSimplePost = (body: { email: string; password: string }) => {
    // Simple post using login as example
    const { data, error } = useSWR(
      "http://127.0.0.1:3001/auth/login",
      (url): Promise<any> => api.login(url, body)
    );
    return {
      simplePostData: data,
      simplePostIsLoading: !error && !data,
      simplePostIsError: error
    };
  };

  return { handleSimplePost };
};

export default usePost;
