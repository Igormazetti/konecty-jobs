import { render, screen, fireEvent } from "@testing-library/react";
import CategoryItem from "./CategoryItem";

describe("CategoryItem", () => {
  it("should render with the correct title", () => {
    render(<CategoryItem title="Nike" handleClick={() => {}} />);

    expect(screen.getByText("Nike")).toBeInTheDocument();
  });

  it("should call handleClick when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<CategoryItem title="Nike" handleClick={handleClick} />);

    fireEvent.click(screen.getByText("Nike"));

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
