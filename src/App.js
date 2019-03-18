import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RepositoriesList from "./RepositoriesList";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BranchesList from "./BranchesList";
import { BrowserRouter, Route, Link } from "react-router-dom";
import RepositoriesControllers from "./RepositoriesControllers";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  state = {
    displayedRepos: []
  };

  setDisplayedRepos = repos => {
    this.setState({ displayedRepos: repos });
  };

  render() {
    const { displayedRepos } = this.state;
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Route
              path="/:organization/:repository"
              render={props => (
                <>
                  <IconButton onClick={props.history.goBack}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" gutterBottom>
                    {`${props.match.params.organization}/${
                      props.match.params.repository
                    }`}
                  </Typography>
                </>
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <RepositoriesControllers
                  {...props}
                  setDisplayedRepos={this.setDisplayedRepos}
                />
              )}
            />
          </Toolbar>
        </AppBar>
        <Route
          path="/:organization/:repository"
          render={props => <BranchesList {...props} />}
        />
        <Route
          exact
          path="/"
          render={props => (
            <RepositoriesList {...props} repositories={displayedRepos} />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
