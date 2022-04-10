import { Descriptions, List, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { Event } from "ethers";
import * as React from "react";
import { state } from "./state";
import { ExplorerLink } from "../components/explorer-link";

export const Events = observer(() => (
  <List
    dataSource={Array.from(state.events.values())}
    renderItem={(item) => <Item item={item} />}
  />
));

const Item = ({ item }: { item: Event }) => {
  const { filters } = state.contract;
  const eventName =
    Object.keys(filters).find((i) => i.startsWith(`${item.event}(`)) ??
    item.event;
  return (
    <List.Item>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Block">
          <ExplorerLink type="block" value={`${item.blockNumber}`} />
        </Descriptions.Item>
        <Descriptions.Item label="Transaction">
          <ExplorerLink type="tx" value={item.transactionHash} />
        </Descriptions.Item>
        <Descriptions.Item label="Event">
          <Tag color="blue">{eventName}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Data">
          {item.args?.toString()}
        </Descriptions.Item>
      </Descriptions>
    </List.Item>
  );
};
