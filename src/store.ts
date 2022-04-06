import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "ethers";
import { observable, runInAction } from "mobx";

interface ContractConfig {
  abi: ContractInterface;
  address: string;
  contract: Contract;
}

export const store = observable({
  connected: false,
  contracts: <ContractConfig[]>[],
  signer: <JsonRpcSigner | null>null,
});

async function init() {
  const ethereum = Reflect.get(window, "ethereum");
  if (!ethereum) return;

  const [address] = await ethereum.request({
    method: "eth_requestAccounts",
  });

  store.connected = true;
  store.signer = new Web3Provider(ethereum).getSigner(address);
  loadContracts();
}

export function addContract(address: string, abi: ContractInterface) {
  const contract = new Contract(address, abi, store.signer!);
  store.contracts.push({ abi, address, contract });
  saveContracts();
}

function loadContracts() {
  try {
    const contracts = JSON.parse(localStorage.getItem("contracts")!);
    runInAction(() => {
      store.contracts = contracts.map(({ address, abi }: ContractConfig) => {
        const contract = new Contract(address, abi, store.signer!);
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
