import { Alert, Badge, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useMatch } from "react-router-dom";
import { Body } from "../components/body";
import { Events } from "./events";
import { Functions } from "./functions";
import { mounted, state, unmount } from "./state";

export const ContractPage = observer(() => {
  const address = useMatch("/contract/:address")?.params?.address;
  React.useEffect(() => {
    mounted(address ?? "");
    return unmount;
  }, []);

  const { getter, setter, contract } = state;
  if (!contract) {
    return (
      <Body>
        <Alert type="error" message={`Contract ${address} not exists`} />
      </Body>
    );
  }

  return (
    <Body>
      <Tabs onChange={() => {}}>
        <Tabs.TabPane tab="Read" key="read">
          <Functions items={getter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Write" key="write">
          <Functions items={setter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<EventsTab />} key="events">
          <Events />
        </Tabs.TabPane>
      </Tabs>
    </Body>
  );
});

const EventsTab = observer(() => (
  <Badge count={state.events.size}>Events</Badge>
));
