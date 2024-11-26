import { useEffect, useState } from "react";
import {
  Card,
  Page,
  Layout,
  ResourceList,
  ResourceItem,
  Spinner,
  Text,
} from "@shopify/polaris";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products/all-rest");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card title="Products" sectioned>
            {loading ? (
              <Spinner size="large" />
            ) : products.length > 0 ? (
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={products}
                renderItem={(product) => {
                  const { id, title, handle } = product;
                  return (
                    <ResourceItem id={id} accessibilityLabel={`View details for ${title}`}>
                      <h3>
                        <Text as="span" fontWeight="bold">
                          {title}
                        </Text>
                      </h3>
                      <div>Handle: {handle}</div>
                    </ResourceItem>
                  );
                }}
              />
            ) : (
              <Text>No products found.</Text>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
