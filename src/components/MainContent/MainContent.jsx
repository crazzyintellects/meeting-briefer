import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorLegends from "../ColorLegends/ColorLegends";
import UserMeeingAction from "../MeetingAction/UserMeetingAction";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    // margin :`8rem`,
    marginTop: `-8.5rem`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.dark,
    borderRadius: `1.2rem`,
  },
}));

export default function MainContent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignContent="center" justify="space-between">
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>
            Stats
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={5}>
            <UserMeeingAction />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>
            In Progress
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={5}>
            {" "}
            <ColorLegends />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={5}>
            Typing Text
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={5}>
            TimeLine
          </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}
