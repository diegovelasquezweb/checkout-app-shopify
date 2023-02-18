import React, { useState } from "react";
import {
  render,
  Banner,
  TextField,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);
// Set the entry point for the extension
// render("Checkout::ShippingMethods::RenderAfter", () => <App />);
// render('Checkout::DeliveryAddress::RenderBefore',() => <App />);

function App() {
  return (
     <Banner>
        Sorry, we can only ship to Canada at this
        time
      </Banner>
  );
}