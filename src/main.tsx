import { Button, Space } from "antd";
import * as React from "react";
import { showAddContractModal } from "./add-contract";
import { Contracts } from "./contracts";

export function Main() {
  return (
    <Space style={{ padding: 16, width: "100%" }} direction="vertical">
      <Contracts />
      <Button type="primary" onClick={showAddContractModal}>
        Add contract
      </Button>
    </Space>
  );
}
