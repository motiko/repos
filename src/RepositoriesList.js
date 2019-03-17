import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import ForkIcon from './ForkIcon';
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  loading: {
    marginTop: theme.spacing.unit * 8
  }
});

function RepositoriesList({ repositories, classes }) {
  return (
    <Grid container justify="center">
      {repositories.length === 0 ? (
        <CircularProgress size={80} className={classes.loading} />
      ) : (
        <Grid item xs={12} md={6}>
          <List>
            {repositories.map(repo => (
              <ListItem button key={repo.name}>
                <ListItemText primary={repo.name} secondary={repo.language} />
                <ListItemSecondaryAction>
                  <IconButton disabled={true}>
                    <ForkIcon/>
                    {repo.forks}
                  </IconButton>
                  <IconButton disabled={true}>
                    <StarIcon />
                    {repo.stars}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}
export default withStyles(styles)(RepositoriesList);
