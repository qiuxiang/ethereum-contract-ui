import { Typography } from "antd";
import { BigNumber } from "ethers";
import * as React from "react";

export const BigNumberOutput = ({ value }: { value: BigNumber }) => {
  const wei = value.mod(`${1e9}`).toNumber();
  const gwei = value.div(`${1e9}`).toNumber();
  const ether = value.div(`${1e18}`).toNumber();
  const children = [];
  if (ether) {
    children.push(
      <Typography.Text key="ether" type="danger">
        {ether}
      </Typography.Text>
    );
    children.push(",");
  }
  if (gwei) {
    children.push(
      <Typography.Text key="gwei" type="warning">
        {gwei}
      </Typography.Text>
    );
    children.push(",");
  }
  children.push(
    <Typography.Text key="wei" type="secondary">
      {wei}
    </Typography.Text>
  );
  return (
    <Typography.Text type="secondary" copyable={{ text: `${value}` }}>
      {children}
    </Typography.Text>
  );
};
