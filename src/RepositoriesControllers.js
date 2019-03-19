import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as GitHub from "./github";

// Contants
const organizations = ["payworks", "microsoft", "google", "facebook"];
const ALL_LANGUAGES = "ALL_LANGUAGES";
const DEFAULT_ORG = organizations[0];
// Helper methods
const uniqueLanguages = repos =>
  Array.from(new Set(repos.map(r => r.language)));
const filteredRepos = (repos, selectedLanguage) =>
  selectedLanguage === ALL_LANGUAGES
    ? repos
    : repos.filter(repo => repo.language === selectedLanguage);
const sortedRepos = repos => repos.sort((a, b) => b.stars - a.stars);
// Selectors
const reposSelector = ({ repos, selectedLanguage }) =>
  sortedRepos(filteredRepos(repos, selectedLanguage));
const languagesSelector = ({ repos }) => uniqueLanguages(repos);
// Styles
const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit * 4
  }
});

class RepositoriesControllers extends Component {
  state = {
    selectedOrg: DEFAULT_ORG,
    selectedLanguage: ALL_LANGUAGES,
    repos: []
  };

  componentDidMount() {
    const organization = this.restoreStateFromSearchParams();
    this.fetchRepositories(organization);
  }

  setOrganization = event => {
    this.props.setDisplayedRepos([]);
    const selectedOrg = event.target.value;
    // this.props.history.push({search: `?organization=${selectedOrg}`})
    this.saveStateToSearchParams(selectedOrg, ALL_LANGUAGES);
    this.setState({
      selectedOrg,
      selectedLanguage: ALL_LANGUAGES
    });
    this.fetchRepositories(selectedOrg);
  };

  setProcessedRepos = () => {
    this.props.setDisplayedRepos(reposSelector(this.state));
  };

  setLanguage = event => {
    const selectedLanguage = event.target.value;
    this.saveStateToSearchParams(this.state.selectedOrg, selectedLanguage);
    this.setState({ selectedLanguage }, this.setProcessedRepos);
  };

  async fetchRepositories(organization) {
    const repos = await GitHub.orgRepositories(organization);
    this.setState(
      {
        repos
      },
      this.setProcessedRepos
    );
  }

  saveStateToSearchParams(organization, language) {
    this.props.history.replace({
      search: `?organization=${organization}&language=${language}`
    });
  }

  restoreStateFromSearchParams() {
    const parsedUrl = new URLSearchParams(this.props.history.location.search);
    const selectedOrg = parsedUrl.get("organization") || DEFAULT_ORG;
    const selectedLanguage = parsedUrl.get("language") || ALL_LANGUAGES;
    this.setState({
      selectedOrg,
      selectedLanguage
    });
    return selectedOrg;
  }

  render() {
    const { classes } = this.props;
    const { selectedOrg, selectedLanguage } = this.state;
    return (
      <>
        <FormControl>
          <Select
            data-cy="organization-select"
            value={selectedOrg}
            onChange={this.setOrganization}
          >
            {organizations.map(org => (
              <MenuItem value={org} key={org}>
                {org}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            data-cy="language-select"
            value={selectedLanguage}
            onChange={this.setLanguage}
          >
            <MenuItem value={ALL_LANGUAGES}>
              <em>All</em>
            </MenuItem>
            {languagesSelector(this.state).map(language => (
              <MenuItem
                value={language}
                key={language}
                data-cy={`language-${language}`}
              >
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
}

export default withStyles(styles)(RepositoriesControllers);
