import { PlusOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import * as React from "react";
import { Body } from "../components/body";
import { showAddContractModal } from "./add-contract";
import { Items } from "./items";

export function ContractsPage() {
  return (
    <Body>
      <Items />
      <br />
      <Row justify="center">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddContractModal}
        >
          Add contract
        </Button>
      </Row>
    </Body>
  );
}
