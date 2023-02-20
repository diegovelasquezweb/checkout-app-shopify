import React, { useState } from "react";
import {
  render,
  TextField,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
  PhoneField,
  Select,
  Stepper,
  ChoiceList,
  Choice,


} from "@shopify/checkout-ui-extensions-react";

// Set the entry point for the extension
render("Checkout::Dynamic::Render", () => <App />);

function App() {
  // Set up the checkbox state
  const [checked, setChecked] = useState(false);

  // Define the metafield namespace and key
  const metafieldNamespace = "metafieldNamespace";
  const metafieldKey = "metafieldKey";

  // Get a reference to the metafield
  const deliveryInstructions = useMetafield({
    namespace: metafieldNamespace,
    key: metafieldKey,
  });

  // Set a function to handle updating a metafield
  const applyMetafieldsChange = useApplyMetafieldsChange();

  // Set a function to handle the Checkbox component's onChange event
  const handleChange = () => {
    setChecked(!checked);
  };

  // Render the extension components
  return (
    <BlockStack>
      <TextField label="Text field" />
      <Checkbox>
        Checkbox
      </Checkbox>
      <PhoneField label="Phone" value="1 (555) 555-5555" />
      <Stepper label="Quantity" value={1} />
      <ChoiceList
        name="choice"
        value="first"
        onChange={(value) => {
          console.log(`onChange event with value: ${value}`);
        }}
      >
        <BlockStack>
          <Choice id="first">Single option1</Choice>
          <Choice id="second">Single option2</Choice>
        </BlockStack>
      </ChoiceList>

      <ChoiceList
        name="choiceMultiple"
        value={['multipleFirst']}
        onChange={(value) => {
          console.log(`onChange event with value: ${value}`);
        }}
      >
        <BlockStack>
          <Choice id="multipleFirst">Multi option1</Choice>
          <Choice id="multipleSecond">Multi option2</Choice>
        </BlockStack>
      </ChoiceList>
      <Select
        label="Country"
        value="2"
        options={[
          {
            value: '1',
            label: 'Australia',
          },
          {
            value: '2',
            label: 'Canada',
          },
          {
            value: '3',
            label: 'France',
          },
          {
            value: '4',
            label: 'Japan',
          },
          {
            value: '5',
            label: 'Nigeria',
          },
          {
            value: '6',
            label: 'United States',
          },
        ]}
      />
      <Checkbox checked={checked} onChange={handleChange}>
        Conditional
      </Checkbox>
      {checked && (
        <TextField
          label="Add data to metafield"
          multiline={3}
          onChange={(value) => {
            // Apply the change to the metafield
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value,
            });
          }}
          value={deliveryInstructions?.value}
        />
      )}
    </BlockStack>
  );
}
