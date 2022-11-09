import React from "react";
import { GlobalStateProvider } from "./context/globalState";
import { Layout } from "./layout";

export const Index = () => {
  return (
    <GlobalStateProvider>
      <Layout />
    </GlobalStateProvider>
  );
};
