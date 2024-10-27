import React from "react";
import { render, screen } from "@testing-library/react";
import FilmIcon from "../../components/icons/FilmIcon";
import HeartFilledIcon from "../../components/icons/HeartFilledIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import PersonIcon from "../../components/icons/PersonIcon";
import RocketIcon from "../../components/icons/RocketIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import VehicleIcon from "../../components/icons/VehicleIcon";
import WorldIcon from "../../components/icons/WorldIcon";

describe("FilmIcon Component", () => {
  test("renders FilmIcon component without crashing", () => {
    render(<FilmIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<FilmIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("HeartFilledIcon Component", () => {
  test("renders HeartFilledIcon component without crashing", () => {
    render(<HeartFilledIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<HeartFilledIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("HeartIcon Component", () => {
  test("renders HeartIcon component without crashing", () => {
    render(<HeartIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("stroke", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<HeartIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("stroke", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("PersonIcon Component", () => {
  test("renders PersonIcon component without crashing", () => {
    render(<PersonIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<PersonIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("RocketIcon Component", () => {
  test("renders RocketIcon component without crashing", () => {
    render(<RocketIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<RocketIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("SearchIcon Component", () => {
  test("renders SearchIcon component without crashing", () => {
    render(<SearchIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<SearchIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("VehicleIcon Component", () => {
  test("renders VehicleIcon component without crashing", () => {
    render(<VehicleIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<VehicleIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});

describe("WorldIcon Component", () => {
  test("renders WorldIcon component without crashing", () => {
    render(<WorldIcon />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("applies custom color", () => {
    const customColor = "red";
    const customSize = 32;
    render(<WorldIcon color={customColor} size={customSize} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", customColor);
    expect(svgElement).toHaveAttribute("height", `${customSize}`);
    expect(svgElement).toHaveAttribute("width", `${customSize}`);
  });
});
