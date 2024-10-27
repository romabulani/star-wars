import React from "react";
import { render, screen } from "@testing-library/react";
import Shimmer from "../../components/atoms/Shimmer";

describe("Shimmer Component", () => {
  test("renders Shimmer component without crashing", () => {
    render(<Shimmer className="custom-class" />);
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("applies passed class names", () => {
    const customClass = "custom-class";
    render(<Shimmer className={customClass} />);
    const shimmerElement = screen.getByTestId("shimmer");
    expect(shimmerElement).toHaveClass(customClass);
  });
});
