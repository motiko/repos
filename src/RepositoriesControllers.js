import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as GitHub from './github';

// Contants
const ALL_LANGUAGES = "ALL_LANGUAGES";
const organizations = ["payworks", "microsoft", "google", "facebook"];
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
const languagesSelector =  ({repos}) => uniqueLanguages(repos)
// Styles
const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit * 4
  }
});

class RepositoriesControllers extends Component {
  state = {
    selectedOrg: organizations[0],
    selectedLanguage: ALL_LANGUAGES,
    repos: []
  };

  componentDidMount() {
    this.fetchRepositories();
  }

  setOrganization = event => {
    this.props.setDisplayedRepos([]);
    this.setState(
      {
        selectedOrg: event.target.value,
        selectedLanguage: ALL_LANGUAGES
      },
      this.fetchRepositories
    );
  };

  setProcessedRepos = () => {
    this.props.setDisplayedRepos(
      reposSelector(this.state)
    );
  };

  setLanguage = event => {
    this.setState({ selectedLanguage: event.target.value }, this.setProcessedRepos);
  };

  async fetchRepositories() {
    const repos = await GitHub.orgRepositories(this.state.selectedOrg)
    this.setState(
      {
        selectedLanguage: ALL_LANGUAGES,
        repos
      },
      this.setProcessedRepos
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedOrg, selectedLanguage } = this.state;
    return (
      <>
        <FormControl>
          <Select data-cy="organization-select" value={selectedOrg} onChange={this.setOrganization}>
            {organizations.map(org => (
              <MenuItem value={org} key={org}>
                {org}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select data-cy="language-select" value={selectedLanguage} onChange={this.setLanguage}>
            <MenuItem value={ALL_LANGUAGES}>
              <em>All</em>
            </MenuItem>
            {languagesSelector(this.state).map(language => (
              <MenuItem value={language} key={language} data-cy={`language-${language}`}>
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
