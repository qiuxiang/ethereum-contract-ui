import { Typography } from "antd";
import * as React from "react";
import { ExplorerLink } from "./explorer-link";
import { Uint256Output } from "./uint256-output";

interface OutputProps {
  type?: string;
  item: any;
}

export const Output = ({ type, item }: OutputProps) => {
  if (type == "address") {
    return <ExplorerLink type="address" value={item} />;
  }
  if (type == "uint256") {
    return <Uint256Output value={item} />;
  }
  if (typeof item == "number") {
    return <Typography.Text code>{`${item}`}</Typography.Text>;
  }
  if (type == "string") {
    return (
      <Typography>
        <blockquote>{item}</blockquote>
      </Typography>
    );
  }
  return <>{`${item}`}</>;
};
