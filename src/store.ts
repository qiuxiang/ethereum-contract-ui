import { JsonFragment } from "@ethersproject/abi";
import {
  ExternalProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "ethers";
import { observable, runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";

interface ContractConfig {
  abi: JsonFragment[];
  address: string;
  contract: Contract;
}

const initialStore = {
  contracts: <ContractConfig[]>[],
  navigate: <NavigateFunction>(() => {}),
  title: "",
  subTitle: "",
};

interface MetaMaskEthereumProvider {
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
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
  if (store.ethereum) {
    runInAction(() => (store.provider = new Web3Provider(store.ethereum!)));
    updateSigner((await store.provider?.listAccounts()) ?? []);
    store.ethereum.on("accountsChanged", updateSigner);
  }
}

function updateSigner([account]: string[]) {
  if (account) {
    runInAction(() => (store.signer = store.provider?.getSigner(account)));
  }
}

export async function connectWallet() {
  updateSigner(
    (await store.ethereum?.request?.({ method: "eth_requestAccounts" })) ?? []
  );
}

export function addContract(address: string, abi: JsonFragment[]) {
  const contract = new Contract(address, abi, store.signer ?? store.provider);
  store.contracts.push({ abi, address, contract });
  saveContracts();
}

function loadContracts() {
  try {
    const contracts = JSON.parse(localStorage.getItem("contracts")!);
    runInAction(() => {
      store.contracts = contracts.map(({ address, abi }: ContractConfig) => {
        const contract = new Contract(address, abi);
        return { abi, address, contract };
      });
    });
  } catch (_) {}
}

function saveContracts() {
  const map = ({ address, abi }: ContractConfig) => ({ address, abi });
  const contracts = store.contracts.map(map);
  localStorage.setItem("contracts", JSON.stringify(contracts));
}

init();
