import { WalletOutlined } from "@ant-design/icons";
import { Button, Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { connectWallet, store } from "./store";

export const MainLayout = observer(() => {
  const { signer, title, subTitle } = store;
  const { pathname } = useLocation();
  runInAction(() => (store.navigate = useNavigate()));
  return (
    <Layout>
      <PageHeader
        onBack={pathname == "/" ? undefined : () => history.back()}
        title={title}
        subTitle={subTitle}
        extra={[
          signer ? (
            <Button key="address" icon={<WalletOutlined />} shape="round">
              {signer?._address}
            </Button>
          ) : (
            <Button
              key="connect"
              icon={<WalletOutlined />}
              type="primary"
              onClick={connectWallet}
            >
              Connect wallet
            </Button>
          ),
        ]}
      />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
});
