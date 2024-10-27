import React from "react";
import { render, screen } from "@testing-library/react";
import Pill from "../../components/atoms/Pill";

describe("Pill Component", () => {
  test("renders Pill component without crashing", () => {
    render(<Pill value="Test Value" />);
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  test("applies correct styling classes", () => {
    const { container } = render(<Pill value="Styled Pill" />);
    const pillElement = container.firstChild;
    expect(pillElement).toHaveClass("px-4 py-1 border border-gray-200 rounded-full text-gray-700 text-sm");
  });
});
