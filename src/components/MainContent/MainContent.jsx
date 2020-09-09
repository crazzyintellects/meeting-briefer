import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorLegends from "../ColorLegends/ColorLegends";
import UserMeeingAction from "../MeetingAction/UserMeetingAction";
import CurrentMeetingTranscript from "../MeetingTranscript/CurrentMeetingTranscript";
import SummaryTimeline from "../MeetingSummaryTimeline/SummaryTimeline";
import InProgress from "../InProgressMeetings/InProgress";
import {useSingleMeetingState } from '../../hooks/useMeetingState';


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

export default function MainContent({meetings}) {
  const classes = useStyles();
  const initialMeeting = {
    meetingId: 1,
    meetingName: "",
    // transcript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    transcript: "",
    startTime: new Date(),
    endTime: "",
    completed: false,
    summary: {
      start: new Date(),
      text: "This is good",
      interval: 1,
    },
  };


  const { singleMeeting, startMeeting, stopMeeting} = useSingleMeetingState(
    initialMeeting
  );


  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignContent="center" justify="space-between">
        <Grid item xs={2} xl={3}>
          <Paper className={classes.paper} elevation={5}>
            {" "}
            <ColorLegends />
          </Paper>
        </Grid>
        <Grid item xs={7} xl={6}>
          <Paper className={classes.paper} elevation={5}>
            <UserMeeingAction
              startMeetingAction={startMeeting}
              stopMeetingAction={stopMeeting}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>
            <InProgress meetings={meetings} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={5}>
            <CurrentMeetingTranscript meeting={singleMeeting} />
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
