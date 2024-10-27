import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/atoms/Footer";

describe("Footer Component", () => {
  test("renders Footer component", () => {
    render(<Footer />);
    expect(screen.getByText("Developed by Roma Bulani")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
