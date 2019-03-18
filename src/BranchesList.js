import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import * as GitHub from "./github";

const styles = theme => ({
  loading: {
    marginTop: theme.spacing.unit * 8
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
});

class BranchesList extends Component {
  state = {
    branches: [],
    isLaoding: true,
    errorMessage: "",
    showError: false
  };

  componentDidMount() {
    this.fetchBranches();
  }

  async fetchBranches() {
    const { organization, repository } = this.props.match.params;
    try {
      const branches = await GitHub.repoBrnaches(
        `${organization}/${repository}`
      );
      this.setState({ branches });
    } catch (err) {
      this.setState({ errorMessage: err.message, showError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  hideError = () => this.setState({ errorMessage: "", showError: false });

  render() {
    const { branches, isLoading, errorMessage, showError } = this.state;
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        {isLoading ? (
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={showError}
          autoHideDuration={2000}
          onClose={this.hideError}
        >
          <SnackbarContent
            className={classes.error}
            aria-describedby="error-message-id"
            message={<span id="error-message-id">{ errorMessage }</span>}
            action={[
              <IconButton
                aria-label="Close"
                className={classes.close}
                onClick={this.hideError}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </Grid>
    );
  }
}

export default withStyles(styles)(BranchesList);
