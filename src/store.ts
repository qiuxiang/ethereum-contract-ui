import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { observable } from "mobx";

export const store = observable({
  connected: false,
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
  console.log(Contract);
}

init();
