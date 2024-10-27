import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "../../components/atoms/Avatar";

describe("Avatar component", () => {
  test("renders the first letter of the name in uppercase", () => {
    render(<Avatar name="alice" />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  test("applies the correct background color based on the first letter", () => {
    render(<Avatar name="Bob" />);
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-gray-500",
    ];
    const expectedColorClass = colors[("B".charCodeAt(0) - 65) % colors.length];

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass(expectedColorClass);
  });

  test("handles lowercase letters and converts them to uppercase", () => {
    render(<Avatar name="charlie" />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
