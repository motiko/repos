import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  loading: {
    marginTop: theme.spacing.unit * 8
  }
});

class BranchesList extends Component {
  state = {
    branches: []
  };
  componentDidMount() {
    this.fetchBranches();
  }

  async fetchBranches() {
    const { match } = this.props;
    const { organization, repository } = match.params;
    const response = await fetch(
      `https://api.github.com/repos/${organization}/${repository}/branches`
    );
    const parsedResponse = await response.json();
    const branches = parsedResponse.map(b => ({
      name: b.name
    }));
    this.setState({ branches });
  }

  render() {
    const { branches } = this.state;
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        {branches.length === 0 ? (
          <CircularProgress size={80} className={classes.loading} />
        ) : (
          <Grid item xs={12} md={6}>
            <List>
              {branches.map(branch => (
                <ListItem button key={branch.name}>
                  <ListItemText primary={branch.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(BranchesList);
