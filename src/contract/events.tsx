import { Button, Descriptions, List, Row, Space, Typography } from "antd";
import { Event } from "ethers";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { ExplorerLink } from "../components/explorer-link";
import { Output } from "../components/output";
import { state } from "./state";

export const Events = observer(() => {
  const { eventsFilter, events } = state;
  const items = Array.from(events.values()).filter(
    (i) => eventsFilter[i.event!]
  );

  return (
    <>
      <Space>
        {Object.keys(eventsFilter).map((name) => (
          <Button
            key={name}
            size="small"
            shape="round"
            type={eventsFilter[name] ? "primary" : "default"}
            onClick={() => {
              runInAction(() => {
                state.eventsFilter[name] = !state.eventsFilter[name];
              });
            }}
          >
            {name}
          </Button>
        ))}
      </Space>
      <List dataSource={items} renderItem={(item) => <Item item={item} />} />
    </>
  );
});

const Item = ({ item }: { item: Event }) => {
  const { inputs = [] } = state.eventsAbi[item.event!];
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
          <div style={{ fontFamily: "monospace" }}>
            <Typography.Paragraph strong>{item.event}</Typography.Paragraph>
            {inputs.map(({ name, type }, index) => (
              <Row key={name}>
                <Space>
                  <Typography.Text>{type}</Typography.Text>
                  <Typography.Text type="danger">{name}</Typography.Text>
                  <Typography.Text type="secondary">
                    <Output type={type} item={item.args![index]} />
                  </Typography.Text>
                </Space>
              </Row>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </List.Item>
  );
};
