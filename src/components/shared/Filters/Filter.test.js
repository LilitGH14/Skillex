import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Filters from "./Filters";

const filterForms = [
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
    value: "",
  },
  {
    id: 101,
    name: "price",
    type: "number",
    label: "Price",
    placeholder: "Filter by price...",
    value: "",
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
    value: "",
  },
  {
    id: 103,
    name: "rating",
    type: "number",
    label: "Rating",
    placeholder: "Filter by rating...",
    value: "",
  },
];

const deviceType = "desktop";
const handleChange = jest.fn();
const resetForm = jest.fn();

describe("Filters Component", () => {
  test("renders Filters component correctly", () => {
    render(
      <Filters
        filterForms={filterForms}
        deviceType={deviceType}
        handleChange={handleChange}
      />
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Brand")).toBeInTheDocument();
    expect(screen.getByLabelText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Reset filters")).toBeInTheDocument();
  });

  test("calls resetForm when reset button is clicked and check the form inputs are empty", () => {
    render(
      <Filters
        filterForms={filterForms}
        deviceType={deviceType}
        handleChange={handleChange}
        resetForm={resetForm}
      />
    );

    const resetButton = screen.getByText(/Reset filters/i);
    fireEvent.click(resetButton);

    expect(resetForm).toHaveBeenCalled();

    expect(screen.getByLabelText("Category")).toHaveValue("");
    expect(screen.getByLabelText("Price")).toHaveValue(null);
    expect(screen.getByLabelText("Brand")).toHaveValue("");
    expect(screen.getByLabelText("Rating")).toHaveValue(null);
  });
});
