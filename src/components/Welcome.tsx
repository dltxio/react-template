import useSWR from "swr";
import useApi from "../hooks/useApi";

const Welcome = () => {
  const api = useApi();
  const { data, error } = useSWR(
    "https://httpbin.org/gett",
    (url): Promise<number> => api.getFetcher(url)
  );

  console.log(data, error);
  return (
    <div
      id="Welcome"
      className="grid grid-cols-1 gap-3 p-5 pb-20 lg:grid-cols-4 pt-60"
    >
      <div></div>
      <div className="col-span-2">
        <div className="text-4xl text-center text-black md:text-6xl">
          Welcome!
        </div>
      </div>
    </div>
  );
};
export default Welcome;
