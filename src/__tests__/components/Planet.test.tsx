import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Planet from "../../components/molecules/Planet";
import { useStarWars } from "../../store";
jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
  setPlanetName: jest.fn(),
}));

describe("Planet Component", () => {
  const mockGetPlanetName = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      getPlanetName: mockGetPlanetName,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders planet name after fetching", async () => {
    const mockUrl = "http://example.com/planet/1";
    const mockPlanetName = "Tatooine";
    mockGetPlanetName.mockResolvedValueOnce(mockPlanetName);
    render(<Planet url={mockUrl} />);
    const planetNameElement = await waitFor(() => screen.getByText(mockPlanetName));
    expect(planetNameElement).toBeInTheDocument();
    expect(mockGetPlanetName).toHaveBeenCalledWith(mockUrl);
  });
});
