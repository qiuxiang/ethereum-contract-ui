import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { runInAction } from "mobx";
import * as React from "react";
import { Body } from "../components/body";
import { store } from "../store";
import { showAddContractModal } from "./add-contract";
import { Items } from "./items";

export function ContractsPage() {
  React.useEffect(() => {
    runInAction(() => {
      store.title = "Contracts";
      store.subTitle = "";
    });
  }, []);
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
