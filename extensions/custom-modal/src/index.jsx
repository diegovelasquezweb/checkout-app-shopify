import React from 'react';
import {
  render,
  Link,
  Modal,
  TextBlock,
  Button,
  useSettings,
  SkeletonText,
  SkeletonTextBlock,
  SkeletonImage,
  Image,
  View,
  BlockLayout,

} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {

  const { label, title, description, image, button_type: buttonType, button_style: buttonStyle } = useSettings();

  const button_type = buttonType ?? 'primary';
  const button_style = buttonStyle ?? 'primary';
  return (
    <Button
      kind={button_type}
      appearance={button_style}
      overlay={
        <Modal padding title={title ? title : 'Lorem Ipsum'}>
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
            <View>
              <TextBlock>
                {description ? description : <SkeletonTextBlock lines={7} />}
              </TextBlock>
            </View>
          </BlockLayout>
        </Modal>
      }
    >
      {label ? label : 'Lorem Ipsum'}
    </Button>
  );
}