import { observer } from "mobx-react-lite";
import * as React from "react";
import { store } from "./store";
import { List, Typography, Tag } from "antd";

export const Contracts = observer(() => {
  const { contracts } = store;

  return (
    <List>
      {contracts.map(({ address, contract }) => {
        const functions = Object.keys(contract.functions).filter((i) =>
          i.includes("(")
        );
        const description = (
          <Typography.Text type="secondary" ellipsis>
            {functions.map((i) => (
              <Tag key={i}>{i}</Tag>
            ))}
          </Typography.Text>
        );
        return (
          <a
            href=""
            key={address}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <List.Item>
              <List.Item.Meta title={address} description={description} />
            </List.Item>
          </a>
        );
      })}
    </List>
  );
});
