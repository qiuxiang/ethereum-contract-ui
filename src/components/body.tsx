import { Layout } from "antd";
import { BasicProps } from "antd/lib/layout/layout";
import * as React from "react";

export const Body = ({ children }: BasicProps) => (
  <Layout.Content style={{ padding: "0 24px 0 24px" }}>
    {children}
  </Layout.Content>
);
