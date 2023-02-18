import { TextField, Button, Form, FormLayout, EmptyState, DataTable, Card, TextContainer } from "@shopify/polaris";
import { ResourcePicker, Toast } from "@shopify/app-bridge-react";
// import { useAuthenticatedFetch } from "../../hooks";
import { useState, useMemo, useEffect } from "react";

export function CreateBanner() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  // const fetch = useAuthenticatedFetch();

  const toastMarkup = showToast ? (
    <Toast
      content="Changes saved"
      onDismiss={() => setShowToast(false)}
      duration={3000}
    />
  ) : null;

  // const handleSubmit = async () => {
  //   const response = await fetch("/api/products/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       description,
  //       images
  //     }),
  //   });

  //   if (response.ok) {
  //     setShowToast(true);
  //   } else {
  //     console.log("Error");
  //   }
  // };

  return (
    <>
      {toastMarkup}
      <Form className="">
        <FormLayout>
            <TextField
              label="Title"
              value={title}
              onChange={setTitle}
            />
            <TextField
              label="Description"
              value={description}
              onChange={setDescription}
              multiline={3}
            />
          <Button primary submit >Create Banner</Button>
        </FormLayout>
      </Form>

    </>
  );
}