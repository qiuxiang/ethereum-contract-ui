import { Select, SelectProps, Space } from "antd";
import { chains } from "eth-chains/dist/src/chains";
import * as React from "react";

export const ChainSelect = (props: SelectProps<number>) => (
  <Select {...props}>
    {Object.keys(chains).map((id) => {
      const chain = chains[parseInt(id)];
      return (
        <Select.Option key={id} value={parseInt(id)}>
          <Space>{chain.name}</Space>
        </Select.Option>
      );
    })}
  </Select>
);
