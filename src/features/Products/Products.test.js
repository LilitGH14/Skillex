import React from "react";
import { render, screen } from "@testing-library/react";

import ProductList from "./ProductList";

const mockSortByCategory = jest.fn();

describe("Products Component", () => {
  test("check no data renders correctly", () => {
    render(
      <ProductList
        products={[]}
        sortByCategory={mockSortByCategory}
        deviceType="desktop"
      />
    );

    expect(screen.getByText("No product found")).toBeInTheDocument();
  });
});
