import { JsonFragment } from "@ethersproject/abi";
import { Collapse, Empty } from "antd";
import * as React from "react";
import { FunctionForm } from "./function-form";

export const Functions = ({ items }: { items: JsonFragment[] }) => {
  if (items.length == 0) return <Empty />;

  return (
    <Collapse>
      {items.map((i) => {
        return (
          <Collapse.Panel header={i.name} key={i.name!}>
            <FunctionForm {...i} />
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};
