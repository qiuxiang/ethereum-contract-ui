import { JsonFragmentType } from "@ethersproject/abi";
import { Descriptions } from "antd";
import * as React from "react";
import { ExplorerLink } from "../components/explorer-link";
import { Output } from "../components/output";

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
            <Output type={types[index].type} item={item} />
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  return <Output type={types[0].type} item={data} />;
};
