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
  useSettings

} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {

  const { show_checkbox, field, name_conditional} = useSettings();

  // const show_checkbox = showCheckbox ?? true;

  const [checked, setChecked] = useState(false);

  const metafieldNamespace = "metafieldNamespace";
  const metafieldKey = "metafieldKey";
  const metafield = useMetafield({
    namespace: metafieldNamespace,
    key: metafieldKey,
  });
  const applyMetafieldsChange = useApplyMetafieldsChange();

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <BlockStack>
      {show_checkbox && <>
        <Checkbox>Checkbox</Checkbox>
        <TextField label="Text field" />
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
        </>
      }

      <Checkbox checked={checked} onChange={handleChange}>
        {name_conditional ? name_conditional : 'Lorem'}
      </Checkbox>
      {checked && (
        <TextField
          label={field}
          multiline={3}
          onChange={(value) => {
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value,
            });
          }}
          value={metafield?.value}
        />
      )}
    </BlockStack>
  );
}
