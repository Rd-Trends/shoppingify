import React, { useState } from "react";

import useCategories from "../../hooks/useCategories";
import Button from "../Button";

interface props {
  query: string;
  setQuery(value: string): void;
}
const CreateNewCategory = ({ query, setQuery }: props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateCategories } = useCategories();

  const createCategory = () => {
    setIsProcessing(true);
    fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name: query }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        updateCategories(data);
        setQuery("");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProcessing(false));
  };

  return (
    <div className="py-2 px-2">
      <p className="mb-4 text-sm">
        No category found for the search term:{" "}
        <strong>
          <em>{query}</em>
        </strong>
      </p>
      <p className="mb-4 text-sm">
        click the button below to add <strong>{query.toUpperCase()}</strong> to
        your categories.
      </p>
      <Button loading={isProcessing} onClick={createCategory}>
        Create new category
      </Button>
    </div>
  );
};

export default CreateNewCategory;
