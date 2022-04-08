import { SearchOutlined } from "@ant-design/icons";
import { JsonFragment } from "@ethersproject/abi";
import { Button, Form, Input, message, Typography } from "antd";
import { parseUnits } from "ethers/lib/utils";
import * as React from "react";
import { state } from "./state";

export const InputItem = ({ item }: { item: JsonFragment }) => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>();
  return (
    <Form
      layout="vertical"
      onFinish={async (values) => {
        values = Object.values(values).map((value, index) => {
          return processInput(value as string, item.inputs![index].type!);
        });
        setLoading(true);
        try {
          setResult(await state.contract[item.name!](...values));
        } catch (e) {
          message.error((e as any).message);
        }
        setLoading(false);
      }}
    >
      {item.inputs?.map(({ name, type }) => {
        return (
          <Form.Item label={name} key={name} name={name}>
            <Input placeholder={type} />
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<SearchOutlined />}
        >
          Query
        </Button>
      </Form.Item>
      {result && (
        <Typography>
          <pre>{result}</pre>
        </Typography>
      )}
    </Form>
  );
};

function processInput(value: string, type: string) {
  if (type.match(/^(u?int)([0-9]*)$/)) {
    return value ? parseUnits(value, 0) : 0;
  }
  return value;
}
