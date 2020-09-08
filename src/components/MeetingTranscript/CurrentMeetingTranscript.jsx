import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { processTranscript } from "../../apihelpers/comprehend";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    // color:theme.palette.secondary.main,
    textAlign: `start`,
    padding: `0 1.2rem`,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const CurrentMeetingTranscript = ({ meeting }) => {
  const classes = useStyles();

  const initialState = {
    originalTranscript: meeting.transcript,
    intervalDuration: 30000,
    sentiment: "NEUTRAL",
    //processedTrancript: meeting.transcript,
    meetingON: meeting.meetingON,
  };

  // Set up initial Transcript
  // eslint-disable-next-line
  const [meetingTranscript, setMeetingTranscript] = useState(initialState);

  //Update the original transcript
  useEffect(() => {
    console.log("inside use effect ");
    if (meeting.transcript !== meetingTranscript.originalTranscript) {
      if (meeting.meetingON === false)
        setTimeout(processTranscript, 3000, meeting.transcript);
    }
    // eslint-disable-next-line
  }, [
    // meeting.transcript,
    // meetingTranscript.originalTranscript,
    meeting.meetingON,
  ]);

  /*let data = ` multinational financial services corporation headquartered at 200 Vesey Street in New York City. The company was founded in 1850 and is one of the 30 components of the Dow Jones Industrial Average. The company is best known for its charge card, credit card, and traveler's cheque businesses.
`;
  processTranscript(data);*/

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        {meeting.meetingName} Transcript
      </Typography>

      <div className={`${classes.root} `}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          style={{ fontWeight: 600 }}
          id="typeText"
        >
          {meeting.transcript}
        </Typography>
      </div>
    </>
  );
};

export default CurrentMeetingTranscript;
