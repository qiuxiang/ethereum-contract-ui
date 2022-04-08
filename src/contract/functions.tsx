import { JsonFragment } from "@ethersproject/abi";
import { Collapse } from "antd";
import * as React from "react";
import { InputItem } from "./input-item";

interface Props {
  functions: JsonFragment[];
}

export const Functions = ({ functions }: Props) => (
  <Collapse>
    {functions.map((i) => {
      return (
        <Collapse.Panel header={i.name} key={i.name!}>
          <InputItem item={i} />
        </Collapse.Panel>
      );
    })}
  </Collapse>
);
