import React , { memo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgressLabel from "./CircularProgressLabel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import {DefaultValues} from "../../context/meetings.context.js";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";


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

let s;

const InProgress = () => {
  const classes = useStyles();
  const [meetings] = useLocalStorageState(
    "meetings",
    DefaultValues,
  );

  const seeAll = () => {
    console.log('See All');
  
  }

  // console.log('meetings: ' + JSON.stringify(meetings));
  
  let inProgressMeetings = [];
  if (meetings.length){
    inProgressMeetings = meetings.filter(meeting => !meeting.completed);
    inProgressMeetings = inProgressMeetings.slice(-3);
  }

  // Used for Looping
  const [counter, setCounter] = useState(0);

  // Emmulate componentDidMount lifecycle
  useEffect(() => {
    setInterval(() => {
      setCounter(state => (state +1));
    }, 1000);
  }, []);

  // This is for counter state variable
  useEffect(() => {
    
    meetings.forEach(mtg => {
      if (!mtg.completed) {
        mtg.progress++;
        if (mtg.progress === 102) {
          mtg.completed = true;
        }
      }
    });

    if (counter > 3000) {
      clearInterval(s);
    }
  });
  
     

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
            <AccessTimeIcon style={{paddingRight:'5px'}}/>
            <Typography>{meeting.startTime} </Typography>
          </div>
        </div>
        <CircularProgressLabel value={meeting.progress < 100 ? meeting.progress : 100} />
      </div>
      <Divider />
      </React.Fragment>
      ))}
      {inProgressMeetings.length > 3 &&
      <Button variant="outlined" color="secondary" style={{marginTop:`1rem`}} onClick={seeAll}>
        See All
      </Button>}
    </>
  );
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
      <Typography
        variant="body1"
        component="p"
        
        className={classes.userHelpText}
      >
        <i>None</i> 
      </Typography>
    </>
  );
};

export default memo(InProgress);
