import { JsonFragment } from "@ethersproject/abi";
import { Contract, Event } from "ethers";
import { observable, runInAction } from "mobx";
import React from "react";
import { ExplorerLink } from "../components/explorer-link";
import { store } from "../store";

export const state = observable({
  abi: [] as JsonFragment[],
  getter: [] as JsonFragment[],
  setter: [] as JsonFragment[],
  contract: null as Contract | null,
  events: new Map<string, Event>(),
});

export function init(address: string) {
  const contract = store.contracts.find((i) => i.address == address);
  if (!contract) return;

  const functions = contract.abi.filter((i) => i.type == "function");
  runInAction(() => {
    state.events.clear();
    state.contract = contract.contract.connect(store.signer ?? store.provider!);
    state.getter = functions.filter((i) => i.stateMutability == "view");
    state.setter = functions.filter((i) => i.stateMutability != "view");
    store.title = "Contract";
    store.subTitle = <ExplorerLink type="address" value={address} />;
  });
  state.contract?.on({}, (event: Event) => {
    if (!state.events.has(event.transactionHash)) {
      runInAction(() => state.events.set(event.transactionHash, event));
    }
  });
}
