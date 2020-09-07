import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import RealTimeMeeting from "./RealTimeMeeting";
import Divider from "@material-ui/core/Divider";
import OfflineMeeting from "./OfflineMeeting";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  userHelpText: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
    textTransform :'capitalize' ,
    textAlign :'start'
  },
}));

const UserMeetingAction = ({startMeetingAction,stopMeetingAction}) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        Take A Step
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        style={{fontWeight:`600`, textTransform :'capitalize' ,textAlign :'start'}}
      >
        Need to host a meeting; Don't worry, just start meeting and come back to get the summary <span role="img" aria-label="sunglasses">😎</span>
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        className={classes.userHelpText}
        
      >
        Missed out last meeting; Paste the recording URL; we will get you the context; you grab a coffee <span role="img" aria-label="coffee">☕️</span>
      </Typography>
      <div className={classes.root}>
        <RealTimeMeeting startMeetingAction={startMeetingAction} stopMeetingAction={stopMeetingAction}/>
        <Divider orientation="vertical" flexItem />
        <OfflineMeeting />
      </div>
    </>
  );
};

export default UserMeetingAction;
