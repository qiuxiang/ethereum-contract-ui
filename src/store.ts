import { JsonFragment } from "@ethersproject/abi";
import {
  ExternalProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "ethers";
import { observable, runInAction } from "mobx";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Chains } from "@w3u/chains";

export interface ContractConfig {
  abi: JsonFragment[];
  address: string;
  contract: Contract;
  chainId: number;
}

const initialStore = {
  contracts: observable.array<ContractConfig>([]),
  navigate: <NavigateFunction>(() => {}),
  title: <React.ReactNode>"",
  subTitle: <React.ReactNode>"",
  chainId: 1,
};

interface MetaMaskEthereumProvider {
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  chainId: string;
}

interface OptionalStore {
  ethereum?: ExternalProvider & MetaMaskEthereumProvider;
  provider?: Web3Provider;
  signer?: JsonRpcSigner;
}

export const store = observable<typeof initialStore & OptionalStore>(
  initialStore
);

export async function init() {
  loadContracts();
  store.ethereum = Reflect.get(window, "ethereum");
  const { ethereum } = store;
  if (ethereum) {
    runInAction(() => {
      store.provider = new Web3Provider(ethereum);
      store.chainId = parseInt(ethereum.chainId, 16);
      console.log(Chains[store.chainId]);
    });
    updateSigner((await store.provider?.listAccounts()) ?? []);
    ethereum.on("accountsChanged", updateSigner);
    ethereum.on("chainChanged", (chainId) => {
      runInAction(() => (store.chainId = parseInt(chainId, 16)));
    });
  }
}

function updateSigner([account]: string[]) {
  if (account) {
    runInAction(() => (store.signer = store.provider?.getSigner(account)));
  }
}

export async function connectWallet() {
  const request = { method: "eth_requestAccounts" };
  try {
    const accounts = await store.ethereum?.request?.(request);
    updateSigner(accounts ?? []);
  } catch (_) {}
}

export function addContract(
  address: string,
  abi: JsonFragment[],
  chainId: number
) {
  const contract = new Contract(address, abi, store.signer ?? store.provider);
  store.contracts.push({ abi, address, contract, chainId });
  saveContracts();
}

function loadContracts() {
  try {
    const contracts = JSON.parse(localStorage.getItem("contracts")!);
    runInAction(() => {
      store.contracts = contracts.map(
        ({ address, abi, chainId }: ContractConfig) => {
          const contract = new Contract(address, abi);
          return { abi, address, contract, chainId };
        }
      );
    });
  } catch (_) {}
}

export function saveContracts() {
  const map = ({ address, abi, chainId }: ContractConfig) => ({
    address,
    abi,
    chainId,
  });
  const contracts = store.contracts.map(map);
  localStorage.setItem("contracts", JSON.stringify(contracts));
}

init();
