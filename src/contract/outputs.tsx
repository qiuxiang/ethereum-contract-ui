import { JsonFragmentType } from "@ethersproject/abi";
import { Descriptions, Typography } from "antd";
import * as React from "react";
import { ExplorerLink } from "../components/explorer-link";
import { BigNumberOutput } from "./big-number-output";

interface Props {
  types?: ReadonlyArray<JsonFragmentType>;
  data: any;
}

export const Outputs = ({ types = [], data }: Props) => {
  if (!data) return null;

  if (data.hash) {
    return <ExplorerLink type="tx" value={data.hash} />;
  }

  if (Array.isArray(data)) {
    return (
      <Descriptions size="small" bordered>
        {data.map((item, index) => (
          <Descriptions.Item key={index} label={types[index].name}>
            <OutputItem type={types[index]} item={item} />
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  return <OutputItem type={types[0]} item={data} />;
};

interface OutputItemProps {
  type: JsonFragmentType;
  item: any;
}

const OutputItem = ({ type, item }: OutputItemProps) => {
  if (type.type == "address") {
    return <ExplorerLink type="address" value={item} />;
  }
  if (type.type == "uint256") {
    return <BigNumberOutput value={item} />;
  }
  if (typeof item == "number") {
    return <Typography.Text code>{`${item}`}</Typography.Text>;
  }
  if (type.type == "string") {
    return (
      <Typography>
        <blockquote>{item}</blockquote>
      </Typography>
    );
  }
  return <>{`${item}`}</>;
};
