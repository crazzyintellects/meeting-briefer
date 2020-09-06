import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
   // color:theme.palette.secondary.main,
    textAlign :`start`,
    padding:`0 1.2rem`
    
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  
}));


const CurrentMeetingTranscript = ({meeting}) => {
  const classes = useStyles();
 

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        Meeting Transcript
      </Typography>
      <div id="typeTranscript" className={`${classes.root} `} >
      
       {
        meeting.transcript
       
      }
      </div>
    </>
  );
};

export default CurrentMeetingTranscript;
