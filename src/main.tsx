import { WalletOutlined } from "@ant-design/icons";
import { Button, Layout, PageHeader, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { store } from "./store";

export const Main = observer(() => {
  const { signer } = store;
  return (
    <Layout>
      <PageHeader
        extra={[
          <Tooltip
            title={signer?._address ?? "Connect wallet"}
            placement="left"
          >
            <Button type="primary" shape="circle" icon={<WalletOutlined />} />
          </Tooltip>,
        ]}
      />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
});
