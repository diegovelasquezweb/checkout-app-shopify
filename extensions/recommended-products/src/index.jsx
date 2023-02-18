import React, { useEffect, useState } from "react";
import {
  render,
  Divider,
  Image,
  Banner,
  Heading,
  Button,
  InlineLayout,
  BlockStack,
  Text,
  SkeletonText,
  SkeletonImage,
  useCartLines,
  useApplyCartLinesChange,
  useExtensionApi,
  useSettings
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const { i18n, shop } = useExtensionApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const {title} = useSettings();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getProductsQuery = {
      query: `query ($first: Int!) {
      products(first: $first) {
        nodes {
          id
          title
          featuredImage {
            url
          }
          variants(first: 1) {
            edges {
              node {
                id
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }`,
      variables: { first: 5 },
    };

    fetch(
      `${shop.storefrontUrl}api/unstable/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getProductsQuery),
      },
    )
      .then((response) => response.json())
      .then(({ data }) => setProducts(data.products.nodes))
      .then(setLoading(false))
      .catch((error) => {
        setTimeout(() => setShowError(false), 3000);
        console.log(error);
      });
  }, [shop]);

  const lines = useCartLines();
  const productsOnOffer = products.filter(
    (product) => !lines.map((item) => item.merchandise.id).includes(product.variants.edges[0].node.id)
  );

  //skeleton
  if (loading) {
    return (
      <>
        {productsOnOffer?.map((product) => (
          <BlockStack spacing="loose" key={product.variants.edges[0].node.id}>
            <Divider />
            <Heading level={2}>You might also like</Heading>
            <BlockStack spacing="loose">
              <InlineLayout
                spacing="base"
                columns={[64, "fill", "auto"]}
                blockAlignment="center"
              >
                <SkeletonImage aspectRatio={1} />
                <BlockStack spacing="none">
                  <SkeletonText inlineSize="large" />
                  <SkeletonText inlineSize="small" />
                </BlockStack>
                <Button kind="secondary" disabled={true}>
                  Add
                </Button>
              </InlineLayout>
            </BlockStack>
          </BlockStack>
        ))}
      </>
    );
  }

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>{title ? title : 'You might also like'}</Heading>
      {productsOnOffer?.map((product) => (
        <BlockStack spacing="loose" key={product.variants.edges[0].node.id}>
          <InlineLayout
            spacing="base"
            columns={[64, "fill", "auto"]}
            blockAlignment="center"
          >
            <Image
              border="base"
              borderWidth="base"
              borderRadius="loose"
              source={product.featuredImage.url}
              description={product.title}
              aspectRatio={1}
            />
            <BlockStack spacing="none">
              <Text size="medium" emphasis="strong">
                {product.title}
              </Text>
              <Text appearance="subdued">{i18n.formatCurrency(product.variants.edges[0].node.priceV2.amount)}</Text>
            </BlockStack>
            <Button
              kind="secondary"
              loading={adding}
              accessibilityLabel={`Add ${product.title} to cart`}
              onPress={async () => {
                setAdding(true);
                const result = await applyCartLinesChange({
                  type: "addCartLine",
                  merchandiseId: product.variants.edges[0].node.id,
                  quantity: 1,
                });
                setAdding(false);
                if (result.type === "error") {
                  setShowError(true);
                  console.error(result.message);
                }
              }}
            >
              Add
            </Button>
          </InlineLayout>
        </BlockStack>
      ))}
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}
