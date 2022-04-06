import { Button } from "antd";
import * as React from "react";
import { Body } from "../components/body";
import { showAddContractModal } from "./add-contract";
import { Items } from "./items";

export function ContractsPage() {
  return (
    <Body>
      <Items />
      <Button type="primary" onClick={showAddContractModal}>
        Add contract
      </Button>
    </Body>
  );
}
