import { JsonFragment } from "@ethersproject/abi";
import { Contract } from "ethers";
import { observable, runInAction } from "mobx";
import { store } from "../store";

export const state = observable({
  abi: <JsonFragment[]>[],
  getter: <JsonFragment[]>[],
  setter: <JsonFragment[]>[],
  contract: null as unknown as Contract,
});

export function init(index: number) {
  const { abi, address, contract } = store.contracts[index];
  const functions = abi.filter((i) => i.type == "function");
  runInAction(() => {
    state.contract = contract;
    state.getter = functions.filter((i) => i.stateMutability == "view");
    state.setter = functions.filter((i) => i.stateMutability != "view");
    store.title = "Contract";
    store.subTitle = address;
  });
}
