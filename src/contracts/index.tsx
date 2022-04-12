import { PlusOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Body } from "../components/body";
import { store, toggleAllChains } from "../store";
import { showAddContractModal } from "./add-contract";
import { Items } from "./items";

const AllChainsSwitch = observer(() => (
  <Switch
    checkedChildren="All Chains"
    unCheckedChildren={store.chain?.name ?? store.chainId}
    checked={store.allChains}
    onChange={toggleAllChains}
  />
));

function mounted() {
  runInAction(() => {
    store.title = "Contracts";
    store.subTitle = <AllChainsSwitch />;
  });
}

export function ContractsPage() {
  React.useEffect(mounted, []);
  return (
    <Body>
      <Items />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddContractModal}
      >
        Add contract
      </Button>
    </Body>
  );
}
