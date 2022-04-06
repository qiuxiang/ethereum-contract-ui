import * as React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ContractPage } from "./contract";
import { ContractsPage } from "./contracts";
import "./index.css";
import { Main } from "./main";
import "./store";

render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<ContractsPage />} />
        <Route path="contract/:index" element={<ContractPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById("main")
);
