import React from "react";
import {
  render,
  Banner,
  useSettings,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);
function App() {
  const {title, description, collapsible, status: merchantStatus} = useSettings();
  const status = merchantStatus ?? 'info';

  return (
    <Banner title={title} status={status} collapsible={collapsible}>
      {description}
    </Banner>
  );
}

