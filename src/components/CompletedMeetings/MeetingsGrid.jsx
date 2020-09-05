import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MeetingItem from "./MeetingItem";

const useStyles = makeStyles((theme) => ({
  meetingsGrid: {
   // margin: `0 auto`,
    position:`relative`,
    bottom:`12rem`
    
  },
  meetingSection : {
      display:`flex`,
      justifyContent:`center`,
      alignItems:'center',
      flexWrap:'wrap',

  },
  meetingItem :{
      margin: `2rem`
  },
  title : {
    display: `flex`,
    flexWrap: `wrap`,
    alignItems: `center`,
    justifyContent: `center`,
    color:"#fff",
    fontWeight :`700`
  }

}));

const MeetingsGrid = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.meetingsGrid}>
        <Typography className={classes.title} gutterBottom variant="h5" noWrap>
          Recent Meetings
        </Typography>
        <section className={classes.meetingSection}>
          <MeetingItem />
          <MeetingItem />
          <MeetingItem />
         
        </section>
      </section>
    </>
  );
};

export default MeetingsGrid;
