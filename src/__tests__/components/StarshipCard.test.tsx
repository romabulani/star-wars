import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import StarshipCard from "../../components/molecules/StarshipCard";
import { useStarWars } from "../../store";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

describe("StarshipCard Component", () => {
  const mockGetStarshipDetails = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      getStarshipDetails: mockGetStarshipDetails,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders shimmer while loading starship details", () => {
    mockGetStarshipDetails.mockResolvedValueOnce(undefined);
    render(<StarshipCard url="http://example.com/starship/1/" />);
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("renders starship details once fetched", async () => {
    const mockStarship = {
      name: "ABC Starship",
      manufacturer: "XYZ Company",
    };
    mockGetStarshipDetails.mockResolvedValueOnce(mockStarship);
    render(<StarshipCard url="http://example.com/starship/1/" />);
    await waitFor(() => expect(screen.getByText(/ABC Starship/)));
    expect(
      screen.getByText(/manufactured by XYZ Company/)
    ).toBeInTheDocument();
  });

  test("handles empty starship response gracefully", async () => {
    mockGetStarshipDetails.mockResolvedValueOnce(null);
    render(<StarshipCard url="http://example.com/starship/1/" />);
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });
});
