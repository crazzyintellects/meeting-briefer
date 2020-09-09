import React , {memo, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgressLabel from "./CircularProgressLabel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import {MeetingsContext} from "../../context/meetings.context.js";

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

const InProgress = () => {
  const classes = useStyles();
  const { meetings } = useContext(MeetingsContext);
  
  let inProgressMeetings = [];
  if (meetings.length){
    inProgressMeetings = meetings.filter(meeting => !meeting.completed);
    inProgressMeetings = inProgressMeetings.slice(-3);
  }
     

 if(inProgressMeetings.length)
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
      {inProgressMeetings.map((meeting, i) => (  
        <React.Fragment key={i}>
      <div className={classes.root}>
        <div className={classes.meetingContent}>
          <Typography
            variant="body1"
            component="p"
            
            className={classes.userHelpText}
          >
           {meeting.meetingName} 
          </Typography>
          <div className={classes.meetingTime}>
            <AccessTimeIcon />
            <Typography>{meeting.startTime} </Typography>
          </div>
        </div>
        <CircularProgressLabel value={77} />
      </div>
      <Divider />
      </React.Fragment>
      ))}
     
      <Button variant="outlined" color="secondary" style={{marginTop:`1rem`}}>
        See All
      </Button>
    </>
  );
  return null;
};

export default memo(InProgress);
