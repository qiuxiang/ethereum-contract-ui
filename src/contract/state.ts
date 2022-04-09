import { JsonFragment } from "@ethersproject/abi";
import { Contract, Event } from "ethers";
import { observable, runInAction } from "mobx";
import { store } from "../store";

export const state = observable({
  abi: <JsonFragment[]>[],
  getter: <JsonFragment[]>[],
  setter: <JsonFragment[]>[],
  contract: null as unknown as Contract,
  events: new Map<string, Event>(),
});

export function init(index: number) {
  const { abi, address, contract } = store.contracts[index];
  const functions = abi.filter((i) => i.type == "function");
  runInAction(() => {
    state.contract = contract.connect(store.signer ?? store.provider!);
    state.getter = functions.filter((i) => i.stateMutability == "view");
    state.setter = functions.filter((i) => i.stateMutability != "view");
    store.title = "Contract";
    store.subTitle = address;
  });
  state.contract.on({}, (event: Event) => {
    if (!state.events.has(event.transactionHash)) {
      runInAction(() => state.events.set(event.transactionHash, event));
    }
  });
}
