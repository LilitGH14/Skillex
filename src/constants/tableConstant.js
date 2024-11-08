export const PRODUCT_LIST_HEADER = [
  { id: 123, name: "Category", type: "select" },
  { id: 124, name: "Price", type: "number" },
  { id: 125, name: "Brand", type: "select" },
  { id: 126, name: "Rating", type: "number" },
];

export const PRODUCT_FILTERS = {
  products: [
    {
      id: 100,
      name: "category",
      type: "select",
      label: "Category",
      placeholder: "Filter by category...",
      options: [
        {
          id: "category_opt1",
          name: "Electronics",
          value: "Electronics",
        },
        {
          id: "category_opt2",
          name: "Footwear",
          value: "Footwear",
        },
        {
          id: "category_opt3",
          name: "Clothing",
          value: "Clothing",
        },
      ],
    },
    {
      id: 101,
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Filter by price...",
    },
    {
      id: 102,
      name: "brand",
      type: "select",
      label: "Brand",
      placeholder: "Filter by brand...",
      options: [
        {
          id: "brand_opt1",
          name: "Brand A",
          value: "Brand A",
        },
        {
          id: "brand_opt2",
          name: "Brand B",
          value: "Brand B",
        },
        {
          id: "brand_opt3",
          name: "Brand C",
          value: "Brand C",
        },
        {
          id: "brand_opt4",
          name: "Brand D",
          value: "Brand D",
        },
        {
          id: "brand_opt5",
          name: "Brand E",
          value: "Brand E",
        },
      ],
    },
    {
      id: 103,
      name: "rating",
      type: "number",
      label: "Rating",
      placeholder: "Filter by rating...",
    },
  ],
};
