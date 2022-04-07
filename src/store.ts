import { JsonFragment } from "@ethersproject/abi";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
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

interface OptionalStore {
  signer?: JsonRpcSigner;
  provider?: Web3Provider;
}

export const store = observable<typeof initialStore & OptionalStore>(
  initialStore
);

export async function init() {
  const ethereum = Reflect.get(window, "ethereum");
  if (!ethereum) return;

  runInAction(() => (store.provider = new Web3Provider(ethereum)));
  connectWallet();
  loadContracts();
}

export async function connectWallet() {
  const ethereum = Reflect.get(window, "ethereum");
  if (!ethereum) return;

  const [address] = await ethereum.request({
    method: "eth_requestAccounts",
  });
  runInAction(() => (store.signer = store.provider?.getSigner(address)));
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
