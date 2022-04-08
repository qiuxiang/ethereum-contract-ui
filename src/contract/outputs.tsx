import { JsonFragmentType } from "@ethersproject/abi";
import { Descriptions, Typography } from "antd";
import * as React from "react";
import { BigNumberOutput } from "./big-number-output";

interface Props {
  types?: ReadonlyArray<JsonFragmentType>;
  data: any;
}

export const Outputs = ({ types = [], data }: Props) => {
  if (!data) return null;

  if (Array.isArray(data)) {
    console.log(data);
    return (
      <Descriptions bordered>
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
    return <a target="_blank">{item}</a>;
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
