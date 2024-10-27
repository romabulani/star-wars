import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStarWars } from "../../store";
import EditableFields from "../../components/molecules/EditableFields";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

describe("EditableFields Component", () => {
  const mockSetEditedFields = jest.fn();
  const mockEditedFields = {
    "https://swapi.dev/api/people/1/": {
      gender: "male",
      height: "172",
    },
  };
  
  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      setEditedFields: mockSetEditedFields,
      editedFields: mockEditedFields,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders gender field correctly", () => {
    render(
      <EditableFields
        originalValue="male"
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={true}
      />
    );

    expect(screen.getByText("Gender: MALE")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("renders height field correctly", () => {
    render(
      <EditableFields
        originalValue={172}
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={false}
      />
    );

    expect(screen.getByText("Height: 172 cm")).toBeInTheDocument();
  });

  test("enters editing mode on Edit button click", () => {
    render(
      <EditableFields
        originalValue="male"
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByPlaceholderText("Gender")).toBeInTheDocument();
  });

  test("saves edited value on Save button click", () => {
    render(
      <EditableFields
        originalValue="male"
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText("Gender"), {
      target: { value: "female" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockSetEditedFields).toHaveBeenCalledWith("https://swapi.dev/api/people/1/", {
      gender: "female",
    });
  });

  test("resets value on Reset button click", () => {
    render(
      <EditableFields
        originalValue="male"
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText("Gender"), {
      target: { value: "female" },
    });
    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(mockSetEditedFields).toHaveBeenCalledWith("https://swapi.dev/api/people/1/", {
      gender: "male",
    });
  });

  test("saves edited height value", () => {
    render(
      <EditableFields
        originalValue={172}
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText("Height"), {
      target: { value: "180" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockSetEditedFields).toHaveBeenCalledWith("https://swapi.dev/api/people/1/", {
      height: "180",
    });
  });

  test("initializes state correctly for gender", () => {
    render(
      <EditableFields
        originalValue="male"
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={true}
      />
    );

    expect(screen.getByText("Gender: MALE")).toBeInTheDocument();
  });

  test("initializes state correctly for height", () => {
    render(
      <EditableFields
        originalValue={172}
        characterUrl="https://swapi.dev/api/people/1/"
        isGender={false}
      />
    );

    expect(screen.getByText("Height: 172 cm")).toBeInTheDocument();
  });
});
