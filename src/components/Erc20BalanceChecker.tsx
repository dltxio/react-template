import React, { useEffect, useState } from "react";
import { Erc20, Erc20__factory } from "../contracts";
import { useSigner } from "wagmi";
import { ethers } from "ethers";

type Props = {
  erc20Address: string;
  targetChainId: number;
};

const Erc20BalanceChecker: React.FC<Props> = ({
  erc20Address,
  targetChainId
}) => {
  const [{ data: signer, loading: loadingSigner }] = useSigner();
  const [erc20, setErc20] = useState<Erc20 | undefined>();
  const [signerAddress, setSignerAddress] = useState<string | undefined>();
  const [decimals, setDecimals] = useState<number | undefined>();
  const [balanceOf, setBalanceOf] = useState<ethers.BigNumber | undefined>();
  const isLoading =
    loadingSigner || balanceOf === undefined || decimals === undefined;
  const [connectedChainId, setConnectedChainId] = useState<number>(0);
  const isValidChain = targetChainId === connectedChainId;

  useEffect(() => {
    if (signer === undefined || signer.provider === undefined) return;
    (async () => {
      setSignerAddress(await signer.getAddress());
      const network = await signer.provider!.getNetwork();
      setConnectedChainId(network.chainId);
      const erc20 = Erc20__factory.connect(erc20Address, signer);
      setErc20(erc20);
    })();
  }, [signer, erc20Address]);

  useEffect(() => {
    if (erc20 === undefined) return;
    (async () => {
      setDecimals(await erc20.decimals());
      if (signerAddress) setBalanceOf(await erc20.balanceOf(signerAddress));
    })();
  }, [erc20, signerAddress]);

  return (
    <div>
      {isLoading && <h4>loading erc20 balance...</h4>}
      {!isLoading && (
        <h4>
          erc20 address: {erc20Address}
          <br />
          erc20 balance: {ethers.utils.formatUnits(balanceOf, decimals)}
          <br />
          balance for address: {signerAddress}
          <br />
          {!isValidChain && (
            <b>you are not connected to chain id {targetChainId}</b>
          )}
        </h4>
      )}
    </div>
  );
};

export default Erc20BalanceChecker;
