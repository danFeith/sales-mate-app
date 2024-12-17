import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import "./App.css";
import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  return (
    <PolarisProvider>
      <QueryProvider>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Welcome />
            {/* <SetupWizard /> */}
          </div>
        </div>
      </QueryProvider>
    </PolarisProvider>
  );
}
