import * as React from "react";
import { store } from "../store";
import { observer } from "mobx-react-lite";

interface Props {
  type: "tx" | "address" | "block" | "token";
  value: string;
}

export const ExplorerLink = observer(({ type, value }: Props) => {
  const url = store.chain?.explorers?.[0]?.url;
  return (
    <a href={`${url}/${type}/${value}`} target="_blank">
      {value}
    </a>
  );
});
