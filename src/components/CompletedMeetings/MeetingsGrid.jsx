import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MeetingItem from "./MeetingItem";


const useStyles = makeStyles((theme) => ({
  meetingsGrid: {
    // margin: `0 auto`,
    position: `relative`,
    bottom: `12rem`,
  },
  meetingSection: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: "center",
    flexWrap: "wrap",
  },
  meetingItem: {
    margin: `2rem`,
  },
  title: {
    display: `flex`,
    flexWrap: `wrap`,
    alignItems: `center`,
    justifyContent: `center`,
    color: "#fff",
    fontWeight: `700`,
  },
}));

const MeetingsGrid = ({meetings}) => {
  const classes = useStyles();


 
  let completedMeetings = [];
  if (meetings.length){
    completedMeetings = meetings.filter(meeting => meeting.completed);
    completedMeetings = completedMeetings.slice(-3);
  }
     

  if (completedMeetings.length)
    return (
      <>
        <section className={classes.meetingsGrid}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            noWrap
          >
            Recent Meetings
          </Typography>
          <section className={classes.meetingSection}>
          {completedMeetings.map((meeting, i) => (  
            <React.Fragment key={i}>
            <MeetingItem key={meeting.meetingId} {...meeting}/>
            </React.Fragment>

          ))}
           
          </section>
        </section>
      </>
    );
  return null;
};

export default MeetingsGrid;
