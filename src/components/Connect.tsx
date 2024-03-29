import { useConnect } from "wagmi";

const Connect = () => {
  const [
    {
      data: { connector, connectors },
      error,
      loading
    },
    connect
  ] = useConnect();

  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button
            className="btn"
            disabled={!x.ready}
            key={x.name}
            onClick={() => connect(x)}
          >
            {x.name}
            {!x.ready && " (unsupported)"}
            {loading && x.name === connector?.name && "…"}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? "Failed to connect")}</div>
    </div>
  );
};

export default Connect;
