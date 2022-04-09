import * as React from "react";
import { Chains } from "@w3u/chains";
import { store } from "../store";

interface Props {
  type: "tx" | "address" | "block" | "token";
  value: string;
}

export const ExplorerLink = ({ type, value }: Props) => {
  const url = getExplorerUrl();
  return (
    <a href={`${url}/${type}/${value}`} target="_blank">
      {value}
    </a>
  );
};

function getExplorerUrl() {
  const chain = Chains[store.provider?.network.chainId ?? 0];
  return chain?.explorer ?? "https://etherscan.io";
}
