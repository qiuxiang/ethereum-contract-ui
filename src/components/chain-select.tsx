import { Select, SelectProps, Image, Space } from "antd";
import * as React from "react";
import { Chains } from "@w3u/chains";

export const ChainSelect = (props: SelectProps<number>) => (
  <Select {...props}>
    {Object.keys(Chains).map((id) => {
      const chain = Chains[parseInt(id)];
      return (
        <Select.Option key={id} value={parseInt(id)}>
          <Space>
            <Image src={chain.icon} width={16} fallback={Chains[1].icon} />
            {chain.name}
          </Space>
        </Select.Option>
      );
    })}
  </Select>
);
