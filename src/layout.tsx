import { WalletOutlined } from "@ant-design/icons";
import { Button, Layout, PageHeader, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { connectWallet, store } from "./store";

export const MainLayout = observer(() => {
  const { signer } = store;
  return (
    <Layout>
      <PageHeader
        extra={[
          signer && (
            <Button key="address" icon={<WalletOutlined />} shape="round">
              {signer?._address}
            </Button>
          ),
        ]}
      />
      <Content>
        {signer ? (
          <Outlet />
        ) : (
          <Row justify="center">
            <Button
              icon={<WalletOutlined />}
              type="primary"
              onClick={connectWallet}
            >
              Connect wallet
            </Button>
          </Row>
        )}
      </Content>
    </Layout>
  );
});
