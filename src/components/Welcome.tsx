import Erc20BalanceChecker from "./Erc20BalanceChecker";

const Welcome = () => {
  return (
    <div
      id="Welcome"
      className="gap-3 grid grid-cols-1 lg:grid-cols-4 pt-60 p-5 pb-20"
    >
      <div className="col-span-2">
        <div className="md:text-6xl text-4xl text-black text-center">
          Welcome!
        </div>
        WETH mainnet balance:
        <Erc20BalanceChecker
          erc20Address={"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
          targetChainId={1}
        />
      </div>
    </div>
  );
};

export default Welcome;
