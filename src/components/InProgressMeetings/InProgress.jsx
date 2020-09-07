import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgressLabel from "./CircularProgressLabel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    marginBottom: `.4rem`,
    marginTop: `0.4rem`,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  userHelpText: {
    fontWeight: 600,
    color: theme.palette.primary.dark,
    fontSize: `1.1rem`,
  },
  meetingTime: {
    display: `flex`,
    color: theme.palette.primary.light,
  },
  meetingContent: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: "space-between",
    alignItems: `start`,
  },
}));

const InProgress = ({ startMeetingAction, stopMeetingAction }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        In Progress (Summary)
      </Typography>
      <div className={classes.root}>
        <div className={classes.meetingContent}>
          <Typography
            variant="body1"
            component="p"
            
            className={classes.userHelpText}
          >
            Meeting 1
          </Typography>
          <div className={classes.meetingTime}>
            <AccessTimeIcon />
            <Typography>Sep 5,2020 9:00-10:00 </Typography>
          </div>
        </div>
        <CircularProgressLabel value={77} />
      </div>
      <Divider />
      <div className={classes.root}>
        <div className={classes.meetingContent}>
          <Typography
            variant="body1"
            component="p"
            
            className={classes.userHelpText}
          >
            Meeting 2
          </Typography>
          <div className={classes.meetingTime}>
            <AccessTimeIcon />
            <Typography>Sep 11,2020 14:00-16:00 </Typography>
          </div>
        </div>
        <CircularProgressLabel value={52} />
      </div>

      <Divider />
      <div className={classes.root}>
        <div className={classes.meetingContent}>
          <Typography
            variant="body1"
            component="p"
            
            className={classes.userHelpText}
          >
            Meeting 3
          </Typography>
          <div className={classes.meetingTime}>
            <AccessTimeIcon />
            <Typography>Sep 8,2020 11:00-12:00 </Typography>
          </div>
        </div>
        <CircularProgressLabel value={28} />
      </div>
      <Button variant="outlined" color="secondary">
        See All
      </Button>
    </>
  );
};

export default InProgress;
