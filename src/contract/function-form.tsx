import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { JsonFragment } from "@ethersproject/abi";
import { Button, Form, Input, message } from "antd";
import { parseUnits } from "ethers/lib/utils";
import * as React from "react";
import { Outputs } from "./outputs";
import { state } from "./state";
import { Uint256Input } from "./uint256-input";

export const FunctionForm = (props: JsonFragment) => {
  const { name, inputs, outputs, stateMutability } = props;
  const readonly = stateMutability == "view";
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState<any>();
  return (
    <Form
      layout="vertical"
      onFinish={async (values) => {
        values = Object.values(values).map((value, index) => {
          return processInput(value as string, inputs![index].type!);
        });
        setLoading(true);
        try {
          setOutput(await state.contract[name!](...values));
        } catch (e) {
          message.error((e as any).data?.message ?? (e as any).message);
        }
        setLoading(false);
      }}
    >
      {inputs?.map(({ name, type }) => {
        let inputType;
        if (type?.match(/^(u?int)([0-9]*)$/)) {
          inputType = "number";
        }

        let input = <Input type={inputType} placeholder={type} />;
        if (type == "uint256") {
          input = <Uint256Input />;
        }

        return (
          <Form.Item label={name} key={name} name={name}>
            {input}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={readonly ? <SearchOutlined /> : <SendOutlined />}
        >
          {readonly ? "Query" : "Send"}
        </Button>
      </Form.Item>
      <Outputs types={outputs} data={output} />
    </Form>
  );
};

function processInput(value: any, type: string) {
  if (type == "uint256") {
    return value ? parseUnits(value.value, value.unit) : 0;
  }
  if (type.match(/^(u?int)([0-9]*)$/)) {
    return value ? parseUnits(value, 0) : 0;
  }
  return value;
}
