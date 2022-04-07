import { SearchOutlined } from "@ant-design/icons";
import { JsonFragment } from "@ethersproject/abi";
import { Button, Collapse, Form, Input } from "antd";
import * as React from "react";
import { state } from "./state";

interface Props {
  functions: JsonFragment[];
}

export const Functions = ({ functions }: Props) => (
  <Collapse>
    {functions.map((i) => {
      return (
        <Collapse.Panel header={i.name} key={i.name!}>
          <Item item={i} />
        </Collapse.Panel>
      );
    })}
  </Collapse>
);

const Item = ({ item }: { item: JsonFragment }) => {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        console.log(values);
        console.log(state.contract[item.name!]);
      }}
    >
      {item.inputs?.map(({ name, type }) => {
        return (
          <Form.Item label={name} key={name} name={name}>
            <Input placeholder={type} />
          </Form.Item>
        );
      })}
      <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        Query
      </Button>
    </Form>
  );
};
