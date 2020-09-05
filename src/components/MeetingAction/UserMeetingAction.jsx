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
  },
}));

const UserMeetingAction = () => {
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
        variant="body2"
        component="p"
        gutterBottom
        style={{fontWeight:`600`}}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        gutterBottom
        className={classes.userHelpText}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <div className={classes.root}>
        <RealTimeMeeting />
        <Divider orientation="vertical" flexItem />
        <OfflineMeeting />
      </div>
    </>
  );
};

export default UserMeetingAction;
