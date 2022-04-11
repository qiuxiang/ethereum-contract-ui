import * as React from "react";
import { Chains } from "@w3u/chains";
import { store } from "../store";
import { observer } from "mobx-react-lite";

interface Props {
  type: "tx" | "address" | "block" | "token";
  value: string;
}

export const ExplorerLink = observer(({ type, value }: Props) => {
  const url = Chains[store.chainId]?.explorer ?? "https://etherscan.io";
  return (
    <a href={`${url}/${type}/${value}`} target="_blank">
      {value}
    </a>
  );
});
