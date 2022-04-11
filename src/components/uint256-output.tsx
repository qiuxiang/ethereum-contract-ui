import { Typography } from "antd";
import { BigNumber } from "ethers";
import * as React from "react";

export const Uint256Output = ({ value }: { value: BigNumber }) => {
  const string = value.toString();
  const children = [];
  if (string.length > 18) {
    children.push(
      <Typography.Text key="ether" strong>
        {string.substring(0, string.length - 18)},
      </Typography.Text>
    );
  }
  if (string.length > 9) {
    children.push(
      <Typography.Text key="gwei">
        {string.substring(string.length - 18, string.length - 9)},
      </Typography.Text>
    );
  }
  children.push(
    <Typography.Text key="wei" type="secondary">
      {string.substring(string.length - 9, string.length)}
    </Typography.Text>
  );
  return <Typography.Text type="secondary">{children}</Typography.Text>;
};
