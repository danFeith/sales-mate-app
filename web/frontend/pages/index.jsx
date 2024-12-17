import { Page, Layout } from "@shopify/polaris";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Welcome from "../components/Welcome/Welcome.jsx";
import "./index.css";
export default function HomePage() {
  return (
    <Page fullWidth={true}>
      <Layout>
        <Layout.Section>
          <div className="app">
            <Sidebar />
            <div className="content">
              <Welcome />
              {/* <SetupWizard /> */}
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
