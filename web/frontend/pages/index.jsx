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
import { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

import { CreateBanner } from "../components";

export default function HomePage() {
  const [data, setData] = useState([]);
  const fetch = useAuthenticatedFetch();

  // create async function to fetch products
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const dataMarkup = data.map((item, index) => {
    return (
      <div key={index}>
        <h1>{item.title}</h1>
      </div>
    );
  });

  return (
    <Page narrowWidth>
      <TitleBar title="Checky App" primaryAction={null} />
      
          <Card sectioned>
            <CreateBanner />
          </Card>
          <Card sectioned>
            { dataMarkup }
          </Card>

    </Page>
  );
}
