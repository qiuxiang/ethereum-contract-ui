import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";
import Upload, { RcFile } from "antd/lib/upload";
import { Contract, ContractInterface } from "ethers";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { addContract, store } from "../store";

export function showAddContractModal() {
  let address = "";
  let abi: ContractInterface;
  const state = observable({ fileList: observable.array<RcFile>() });
  const ContractForm = observer(() => {
    const { fileList } = state;
    return (
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <Form.Item label="Contract address" required>
          <Input onChange={({ target }) => (address = target.value)} required />
        </Form.Item>
        <Form.Item label="ABI" required>
          <Upload
            fileList={fileList}
            beforeUpload={async (file) => {
              try {
                const json = new TextDecoder("utf-8").decode(
                  await file.arrayBuffer()
                );
                abi = JSON.parse(json);
                // hardhat artifacts compatible
                if (!Array.isArray(abi)) {
                  abi = (abi as any).abi;
                }
                new Contract(address, abi, store.signer!);
              } catch (e) {
                message.error(`Invalid ABI: ${(e as any).message}`);
                return false;
              }
              if (fileList.length > 0) {
                fileList.pop();
              }
              fileList.push(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
        </Form.Item>
      </Form>
    );
  });
  Modal.confirm({
    maskClosable: true,
    icon: null,
    content: <ContractForm />,
    async onOk() {
      function throwError(e: string) {
        message.error(e);
        throw e;
      }

      if (!address) {
        return throwError("Contract address is required");
      }

      const { fileList } = state;
      if (fileList.length == 0) {
        return throwError("ABI file is required");
      }

      addContract(address, abi);
    },
  });
}
