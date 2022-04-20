import { Loader } from "./";
import ErrorMessage from "./ErrorMessage";
import useSWR from "swr";

const Welcome = () => {
  // This is just here as an example of how to use SWR
  // Feel free to remove
  const { data: exampleData, error: exampleError } = useSWR(
    "https://api.coingecko.com/api/v3/ping"
  );
  const isLoading = !exampleData && !exampleError;

  return (
    <div
      id="Welcome"
      className="grid grid-cols-1 gap-3 p-5 pb-20 lg:grid-cols-4 pt-60"
    >
      <ErrorMessage error={exampleError} />
      <div>{isLoading ? <Loader /> : <p>{exampleData?.gecko_says}</p>}</div>
      <div className="col-span-2">
        <div className="text-4xl text-center text-black md:text-6xl">
          Welcome!
        </div>
      </div>
    </div>
  );
};
export default Welcome;
