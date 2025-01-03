import { Page, Layout } from "@shopify/polaris";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Welcome from "../components/Welcome/Welcome.jsx";
import SetupWizard from "../components/SetupWizard/SetupWizard.jsx";
import "./index.css";
import { useState } from "react";

const RenderStepsTypes = {
  Welcome: "Welcome",
  SetupWizard: "SetupWizard",
  Insights: "Insights",
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(RenderStepsTypes.Welcome);

  const renderStep = () => {
    switch (currentStep) {
      case RenderStepsTypes.Welcome:
        return <Welcome />;
      case RenderStepsTypes.SetupWizard:
        return <SetupWizard />;
      case RenderStepsTypes.Insights:
        return <div>Insights Component Placeholder</div>;
      default:
        return <Welcome />;
    }
  };

  return (
    <Page fullWidth={true}>
      <Layout>
        <Layout.Section>
          <div className="app">
            <Sidebar setCurrentStep={setCurrentStep} currentStep={currentStep} />
            <div className="content">{renderStep()}</div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
