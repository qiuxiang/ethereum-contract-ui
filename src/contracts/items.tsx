import { observer } from "mobx-react-lite";
import * as React from "react";
import { store } from "../store";
import { List, Typography, Tag } from "antd";
import { Link } from "react-router-dom";

export const Items = observer(() => {
  const { contracts } = store;

  return (
    <List>
      {contracts.map(({ address, contract }, index) => {
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
          <Link to={`/contract/${index}`} key={address}>
            <List.Item style={{ paddingTop: 0, paddingBottom: 24 }}>
              <List.Item.Meta title={address} description={description} />
            </List.Item>
          </Link>
        );
      })}
    </List>
  );
});
