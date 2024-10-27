import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStarWars } from "../../store";
import Pagination from "../../components/molecules/Pagination";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

describe("Pagination Component", () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      count: 30, 
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination buttons when total pages are more than 1", () => {
    render(<Pagination />);
    expect(screen.getByText("<< Prev")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Next >>")).toBeInTheDocument();
  });

  test("does not render pagination if total buttons are less than or equal to 1", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
      count: 10,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);
    expect(screen.queryByText("<< Prev")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("Next >>")).not.toBeInTheDocument();
  });

  test("disables the Prev button on the first page", () => {
    render(<Pagination />);

    const prevButton = screen.getByText("<< Prev");
    expect(prevButton).toBeDisabled();
  });

  test("disables the Next button on the last page", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
      count: 30,
      currentPage: 3,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const nextButton = screen.getByText("Next >>");
    expect(nextButton).toBeDisabled();
  });

  test("handles Prev button click", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
        count: 30,
        currentPage: 3,
        setCurrentPage: mockSetCurrentPage,
      });
    render(<Pagination />);

    const prevButton = screen.getByText("<< Prev");
    fireEvent.click(prevButton);
    expect(mockSetCurrentPage).toBeCalledWith(2);
  });

  test("handles Next button click", () => {
    render(<Pagination />);

    const nextButton = screen.getByText("Next >>");
    fireEvent.click(nextButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  test("handles button clicks for specific page numbers", () => {
    render(<Pagination />);

    const button2 = screen.getByText("2");
    fireEvent.click(button2);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });
});
