import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { CreateBanner } from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Checky App" primaryAction={null} />
      
          <Card sectioned>
            <CreateBanner />
          </Card>

    </Page>
  );
}
