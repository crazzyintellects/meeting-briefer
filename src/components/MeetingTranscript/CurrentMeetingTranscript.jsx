import React, { useState, useEffect , useContext , memo} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { processTranscript } from "../../apihelpers/comprehend";
import {SingleMeetingContext} from "../../context/singleMeeting.context.js";

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

const CurrentMeetingTranscript = () => {
  const classes = useStyles();
  const { singleMeeting } = useContext(SingleMeetingContext);
  const initialState = {
    originalTranscript: singleMeeting.transcript,
    intervalDuration: 30000,
    sentiment: "NEUTRAL",
    //processedTrancript: meeting.transcript,
    meetingON: singleMeeting.meetingON,
  };

  // Set up initial Transcript
  // eslint-disable-next-line
  const [meetingTranscript, setMeetingTranscript] = useState(initialState);

  //Update the original transcript
  useEffect(() => {
    console.log("inside use effect ");
    if (singleMeeting.transcript !== meetingTranscript.originalTranscript) {
      if (singleMeeting.meetingON === false)
        setTimeout(processTranscript, 3000, singleMeeting.transcript);
    }
    // eslint-disable-next-line
  }, [
    // meeting.transcript,
    // meetingTranscript.originalTranscript,
    singleMeeting.meetingON,
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
        {singleMeeting.meetingName} Transcript
      </Typography>

      <div className={`${classes.root} `}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          style={{ fontWeight: 600 }}
          id="typeText"
        >
          {singleMeeting.transcript}
        </Typography>
      </div>
    </>
  );
};

export default memo(CurrentMeetingTranscript);
