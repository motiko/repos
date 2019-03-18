import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit * 4
  }
});

const ALL_LANGUAGES = "ALL_LANGUAGES";

const languagesSelector = ({ repos }) =>
  Array.from(new Set(repos.map(r => r.language)));
const repositoriesSelecor = ({ repos, selectedLanguage }) => {
  const filteredRepos =
    selectedLanguage === ALL_LANGUAGES
      ? repos
    : repos.filter(repo => repo.language === selectedLanguage);
  const sortedRepos = filteredRepos.sort((a, b) => b.stars - a.stars);
  return sortedRepos;
};

const organizations = ["payworks", "microsoft", "google", "facebook"];

class App extends Component {
  state = {
    repos: [],
    selectedOrg: organizations[0],
    selectedLanguage: ALL_LANGUAGES
  };

  componentDidMount() {
    this.fetchOrganizations();
  }

  setOrganization = event => {
    this.setState(
      {
        selectedOrg: event.target.value,
        repos: [],
        selectedLanguage: ALL_LANGUAGES
      },
      this.fetchOrganizations
    );
  };

  setLanguage = event => {
    this.setState({ selectedLanguage: event.target.value });
  };

  async fetchOrganizations() {
    const response = await fetch(
      `https://api.github.com/orgs/${this.state.selectedOrg}/repos`
    );
    const parsedResponse = await response.json();
    const repos = parsedResponse.map(r => ({
      name: r.name,
      stars: r.stargazers_count,
      language: r.language || "N/A",
      forks: r.forks_count
    }));
    this.setState({ repos, selectedLanguage: ALL_LANGUAGES });
  }


  render() {
    const { classes } = this.props;
    const { selectedOrg, selectedLanguage } = this.state;
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Route
              path="/:organization/:repository"
              render={props => (
                <>
                  <IconButton onClick={props.history.goBack} >
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
                <>
                  <FormControl>
                    <Select value={selectedOrg} onChange={this.setOrganization}>
                      {organizations.map(org => (
                        <MenuItem value={org} key={org}>
                          {org}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={selectedLanguage}
                      onChange={this.setLanguage}
                    >
                      <MenuItem value={ALL_LANGUAGES}>
                        <em>All</em>
                      </MenuItem>
                      {languagesSelector(this.state).map(language => (
                        <MenuItem value={language} key={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
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
            <RepositoriesList
              {...props}
              repositories={repositoriesSelecor(this.state)}
              organization={selectedOrg}
            />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
