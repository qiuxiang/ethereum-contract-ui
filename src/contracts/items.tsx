import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, List, notification, Row, Tag, Typography } from "antd";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Link } from "react-router-dom";
import { style } from "typestyle";
import { ContractConfig, saveContracts, store } from "../store";

export const Items = observer(() => {
  const contracts = store.contracts.filter(
    (i) => store.allChains || i.chainId == store.chainId
  );
  return (
    <List>
      {contracts.map((item) => {
        const { address, contract } = item;
        const functions = Object.keys(contract.functions).filter((i) =>
          i.includes("(")
        );
        const description = (
          <Typography.Text type="secondary" ellipsis>
            {functions.map((i) => (
              <Tag style={{ fontFamily: "monospace" }} color="blue" key={i}>
                {i}
              </Tag>
            ))}
          </Typography.Text>
        );
        return (
          <Link to={`/contract/${address}`} key={address}>
            <List.Item style={{ paddingTop: 0, paddingBottom: 24 }}>
              <List.Item.Meta
                className={css.item}
                title={
                  <Row align="middle">
                    <span style={{ fontFamily: "monospace" }}>{address}</span>
                    <Button
                      title="Edit"
                      size="small"
                      type="link"
                      icon={<EditFilled />}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                    <Button
                      danger
                      title="Delete"
                      size="small"
                      type="link"
                      icon={<DeleteFilled />}
                      onClick={(e) => {
                        e.preventDefault();
                        deleteContract(item);
                      }}
                    />
                  </Row>
                }
                description={description}
              />
            </List.Item>
          </Link>
        );
      })}
    </List>
  );
});

function deleteContract(item: ContractConfig) {
  const index = store.contracts.indexOf(item);
  runInAction(() => store.contracts.remove(item));
  saveContracts();
  const key = `delete-contract-${item.address}`;
  notification.warning({
    key,
    message: "Contract deleted",
    description: item.address,
    btn: (
      <Button
        type="primary"
        onClick={() => {
          runInAction(() => store.contracts.splice(index, 0, item));
          saveContracts();
          notification.close(key);
        }}
      >
        Undo
      </Button>
    ),
  });
}

const css = {
  item: style({
    $nest: {},
  }),
};
