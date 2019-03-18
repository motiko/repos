import React from "react";
import BranchesList from "BranchesList";
import { render } from "react-testing-library";
import repositories from "__fixtures__/repositories";
import { createMemoryHistory } from "history";
import { Link, Route, Router, Switch } from "react-router-dom";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

describe("BranchesList", () => {
  it("renders without crashing", () => {
    render(
      <BranchesList
        match={{ params: { organization: "payworks", repository: "slate" } }}
      />
    );
  });

  it("renders branches list", () => {
    const { getByText } = render(<BranchesList repositories={repositories} />);
    expect(getByText(repositories[0].name)).toBeInTheDocument();
  });
});
