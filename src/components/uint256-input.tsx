import { Input, Select } from "antd";
import * as React from "react";

interface Uint256Value {
  value: string;
  unit: string;
}

interface Props {
  value?: Uint256Value;
  onChange?: (value: Uint256Value) => void;
}

const defaultUnit = "wei";

export const Uint256Input = (props: Props) => {
  const { value = {} as Uint256Value, onChange } = props;
  const [unit, setUnit] = React.useState(defaultUnit);
  return (
    <Input
      addonAfter={
        <Select
          defaultValue={defaultUnit}
          onChange={(unit) => {
            setUnit(unit);
            onChange?.({ ...value, unit });
          }}
        >
          <Select.Option value="wei">wei</Select.Option>
          <Select.Option value="gwei">gwei</Select.Option>
          <Select.Option value="ether">ether</Select.Option>
        </Select>
      }
      placeholder="uint256"
      type="number"
      value={value?.value}
      onChange={({ target: { value } }) => onChange?.({ value, unit })}
    />
  );
};
