import * as React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ContractPage } from "./contract";
import { ContractsPage } from "./contracts";
import { MainLayout } from "./layout";
import "./store";

render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ContractsPage />} />
        <Route path="contract/:address" element={<ContractPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById("main")
);
