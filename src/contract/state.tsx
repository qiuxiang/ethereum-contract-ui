import { JsonFragment } from "@ethersproject/abi";
import { Contract, Event } from "ethers";
import { observable, runInAction } from "mobx";
import React from "react";
import { ExplorerLink } from "../components/explorer-link";
import { store } from "../store";

export const state = observable({
  abi: [] as JsonFragment[],
  contract: null as Contract | null,
  events: new Map<string, Event>(),
  eventsFilter: {} as Record<string, boolean>,
  eventsAbi: {} as Record<string, JsonFragment>,
});

export function mounted(address: string) {
  const contract = store.contracts.find((i) => i.address == address);
  if (!contract) return;

  runInAction(() => {
    state.eventsAbi = {};
    for (const event of contract.abi.filter((i) => i.type == "event")) {
      state.eventsFilter[event.name!] = true;
      state.eventsAbi[event.name!] = event;
    }
    state.abi = contract.abi;
    state.contract = contract.contract.connect(store.signer ?? store.provider!);
    store.title = "Contract";
    store.subTitle = <ExplorerLink type="address" value={address} />;
  });
  state.contract?.on({}, (event: Event) => {
    const key = event.transactionHash + "#" + event.event;
    if (!state.events.has(key)) {
      runInAction(() => state.events.set(key, event));
    }
  });
}

export function unmount() {
  state.contract?.removeAllListeners();
  runInAction(() => state.events.clear());
}
