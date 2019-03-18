import React from "react";
import RepositoriesList from "RepositoriesList";
import { render } from "react-testing-library";
import repositories from "__fixtures__/repositories";

describe("RepositoriesList", () => {
  it("renders without crashing", () => {
    render(<RepositoriesList repositories={[]} />);
  });

  it("renders repositories list", () => {
    const { getByText } = render(
      <RepositoriesList repositories={repositories} />
    );
    expect(getByText(repositories[0].name)).toBeInTheDocument();
  });
});
