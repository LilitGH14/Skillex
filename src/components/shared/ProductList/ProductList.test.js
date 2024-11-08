import React from "react";
import { render, screen } from "@testing-library/react";

import { PRODUCT_LIST_HEADER } from "../../../constants/tableConstant";
import ProductList from "./ProductList";

const mockProducts = [
  {
    id: 2,
    name: "Bluetooth Speaker",
    category: "Electronics",
    brand: "Brand B",
    price: 49.99,
    rating: 4,
    imageUrl: "https://example.com/images/speaker.jpg",
  },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    brand: "Brand D",
    price: 499.99,
    rating: 4.8,
    imageUrl: "https://example.com/images/smartphone.jpg",
  },
];

const mockSortByCategory = jest.fn();

describe("ProductList Component", () => {
  test("renders product headers", () => {
    render(
      <ProductList
        products={mockProducts}
        sortByCategory={mockSortByCategory}
        deviceType="desktop"
      />
    );

    PRODUCT_LIST_HEADER.forEach((header) => {
      expect(screen.getByText(header.name)).toBeInTheDocument();
    });
  });

  test("renders product data correctly", () => {
    render(
      <ProductList
        products={mockProducts}
        sortByCategory={mockSortByCategory}
        deviceType="desktop"
      />
    );

    mockProducts.forEach((product, idx) => {
      PRODUCT_LIST_HEADER.forEach((header) => {
        const fieldName = header.name.toLocaleLowerCase();
        const expectedValue = product[fieldName];
        const cell = screen.getByTestId(`product-${idx}-${header.name}`);

        expect(cell).toHaveTextContent(expectedValue);
      });
    });
  });
});
