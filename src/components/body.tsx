import { Layout } from "antd";
import { BasicProps } from "antd/lib/layout/layout";
import * as React from "react";

export const Body = ({ children }: BasicProps) => (
  <Layout.Content style={{ padding: "16px 24px" }}>{children}</Layout.Content>
);
