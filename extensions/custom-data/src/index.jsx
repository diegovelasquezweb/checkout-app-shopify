import React, { useState } from "react";
import {
  render,
  useSettings,
  Image,
  Heading,
  Text,
  View,
  Icon,
  Pressable,
  Tooltip,
  BlockStack,
  Grid,
  BlockLayout,
  InlineLayout,
  Button
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);



function App() {
  const { title, description, image, tooltip } = useSettings();

  const [button, setButton] = useState('Pay now');

  return (
    <BlockLayout rows={['auto', 'fill']} spacing="base">
      <View>
        <Image
          border="base"
          borderWidth="base"
          borderRadius="loose"
          source={image ? image : 'https://cdn.shopify.com/s/files/1/0723/3640/8867/files/elementor-placeholder-image.webp?v=1676858525'}
          description={title}
          aspectRatio={16 / 9}
        />
      </View>
      <View border="base" cornerRadius="base" padding="base" >
        <View padding="base">
          <Heading level={2} spacing="base">{title ? title : 'Lorem Ipsum Sit Amet'}</Heading>
        </View>
        <View padding="base">
          <InlineLayout columns={['90%', 'auto']}>
            <Text size="medium" emphasis="strong">
              {description ? description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </Text>
            {tooltip && tooltip.length > 0 &&
              <Pressable
                overlay={
                  <Tooltip>{tooltip}</Tooltip>
                }
              >
                <Icon source="questionFill" />
              </Pressable>
            }
          </InlineLayout>
        </View>
        <View padding="base">
          <Button
            onPress={() => {
              setButton('Click again ');
            }}
          >
            { button }
          </Button>
        </View>
      </View>
    </BlockLayout>
  );
}

