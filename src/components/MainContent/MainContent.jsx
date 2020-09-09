import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorLegends from "../ColorLegends/ColorLegends";
import UserMeeingAction from "../MeetingAction/UserMeetingAction";
import CurrentMeetingTranscript from "../MeetingTranscript/CurrentMeetingTranscript";
import SummaryTimeline from "../MeetingSummaryTimeline/SummaryTimeline";
import InProgress from "../InProgressMeetings/InProgress";


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

export default function MainContent({ meetings }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignContent="center" justify="space-between">
        <Grid item xs={2} >
          <Paper className={classes.paper} elevation={5}>
            {" "}
            <ColorLegends />
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.paper} elevation={5}>
            <UserMeeingAction />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={5}>
            <InProgress />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={5}>
            <CurrentMeetingTranscript />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>
            Key Phrases
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper} elevation={5}>
            <SummaryTimeline />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
