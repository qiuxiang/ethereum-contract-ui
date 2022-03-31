import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { Contract } from "ethers";
import * as React from "react";
import { store } from "./store";

function addContract() {
  let fileList: RcFile[] = [];
  let address = "0x4F0Ec940379AcAE75ab67d98B39F4039F701b481";
  Modal.confirm({
    maskClosable: true,
    icon: null,
    content: (
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <Form.Item label="Contract address" required>
          <Input onChange={({ target }) => (address = target.value)} required />
        </Form.Item>
        <Form.Item label="ABI" required>
          <Upload
            beforeUpload={(value) => {
              fileList.push(value);
              return false;
            }}
            onRemove={(file) => {
              fileList = fileList.filter(({ uid }) => uid != file.uid);
            }}
          >
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
        </Form.Item>
      </Form>
    ),
    async onOk() {
      function throwError(e: string) {
        message.error(e);
        throw e;
      }
      if (!address) {
        return throwError("Contract address is required");
      }
      if (fileList.length == 0) {
        return throwError("ABI file is required");
      }
      try {
        const json = new TextDecoder("utf-8").decode(
          await fileList[0].arrayBuffer()
        );
        let abi = JSON.parse(json);
        if (!Array.isArray(abi)) {
          // hardhat artifacts compatible
          abi = abi.abi;
        }
        new Contract(address, abi, store.signer!);
      } catch (_) {
        return throwError("Invalid ABI file");
      }
    },
  });
}

export function Main() {
  return (
    <div style={{ padding: 16 }}>
      <Button type="primary" onClick={addContract}>
        Add contract
      </Button>
    </div>
  );
}
