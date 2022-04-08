import { Alert, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useMatch } from "react-router-dom";
import { Body } from "../components/body";
import { Functions } from "./functions";
import { init, state } from "./state";

export const ContractPage = observer(() => {
  const match = useMatch("/contract/:index");
  const index = parseInt(match?.params?.index ?? "");
  if (isNaN(index)) {
    return <Alert type="error" message={`Invalid contract index ${index}`} />;
  }
  React.useEffect(() => init(index), []);
  const { getter, setter } = state;
  return (
    <>
      <Body>
        <Tabs onChange={() => {}}>
          <Tabs.TabPane tab="Read" key="read">
            <Functions items={getter} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Write" key="write">
            <Functions items={setter} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Events" key="events">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </Body>
    </>
  );
});
