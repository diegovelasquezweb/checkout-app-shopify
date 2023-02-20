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
  SkeletonText,
  SkeletonImage,
  BlockLayout,
  InlineLayout,
  Button,
  Link,
  Modal,
  TextBlock
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);



function App() {
  const { title, description, image, tooltip, button_type: buttonType, button_style: buttonStyle, show_button: showButton, button_url } = useSettings();

  const [button, setButton] = useState('Lorem Ipsum');

  const button_type = buttonType ?? 'plain';
  const button_style = buttonStyle ?? 'primary';
  const show_button = showButton  ?? true;

  return (
    <BlockLayout rows={['auto', 'fill']} spacing="base">
      <View>
        {image ? <Image
          border="base"
          borderWidth="base"
          borderRadius="loose"
          source={image ? image : 'https://cdn.shopify.com/s/files/1/0723/3640/8867/files/elementor-placeholder-image.webp?v=1676858525'}
          description={title}
          aspectRatio={16 / 9}
        /> : <SkeletonImage aspectRatio={16 / 9} />}
      </View>
      <View border="base" cornerRadius="base" padding="base" >
        <View padding="base">
          {title ? <Heading level={2} spacing="base">{title}</Heading> : <SkeletonText inlineSize="large" />}
        </View>
        <View padding="base">
          <InlineLayout columns={['90%', 'auto']}>
            {description ? <Text size="medium" emphasis="strong">{description}</Text> : <SkeletonText inlineSize="small" />}
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
        {show_button && <View padding="base">
          <Button
            kind={button_type}
            appearance={button_style}
            to={button_url ? button_url : undefined}
            onPress={() => {
              setButton('Click again');
            }}
          >
            {button}
          </Button>
        </View>}
      </View>
    </BlockLayout>
  );
}

