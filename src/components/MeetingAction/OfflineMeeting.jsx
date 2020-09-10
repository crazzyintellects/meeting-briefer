import React from "react";
import {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useMeetingsState } from "../../hooks/useMeetingState";
import useFormState from "../../hooks/useFormState";
import useToggle from "../../hooks/useToggle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {DefaultValues} from "../../context/meetings.context.js";
import {InitialMeeting} from "../../context/singleMeeting.context.js";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";


const useStyles = makeStyles((theme) => ({
  offlineMeeting: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    minHeight: `10rem`,
  },
  errorMsg: {
    color: `red`,
  }
}));

const OfflineMeeting = () => {
  const classes = useStyles();
  const [meetingName, setMeetingName, resetName] = useFormState("");
  const [meetingURL, setMeetingURL, resetURL] = useFormState("");
  const [showSubmitError, setShowSubmitError] = useToggle(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [meetings, setMeetings] = useLocalStorageState(
    "meetings",
    DefaultValues,
  );

  const {submitMeeting} = useMeetingsState();
  const submitMeetingHandler = () => {
    
    if (meetingName === '') {
      setErrorMsg("Missing Meeting Name!");
      if (!showSubmitError) setShowSubmitError();
    } else if (meetingURL === '') {
      setErrorMsg("Missing Meeting URL!");
      if (!showSubmitError) setShowSubmitError();
    } else {
      console.log('Submit Meeting    Name:' + meetingName + '    URL:' + meetingURL);
      if (showSubmitError) setShowSubmitError();
      

      let mtgID = 0;
      meetings.forEach(mtg => {
        if (mtg.meetingId >= mtgID) mtgID = mtg.meetingId + 1;
      });

      const newMtg = InitialMeeting;
      newMtg.meetingId = mtgID;
      newMtg.meetingName = meetingName;
      newMtg.meetingURL = meetingURL;
      newMtg.transcript = "Welcome everyone to our Staff meeting. Hope everyone had some well deserved time off. Yes, yeah it was good, thank you. On our agenda today we have the following. Production Engineering update, Code freeze..."
      console.log(JSON.stringify(newMtg));
      submitMeeting(newMtg);
      
      resetName();
      resetURL();

    }
  }

  return (
    <>
      <form className={classes.offlineMeeting} noValidate autoComplete="off">
 
        <TextField
          required
          id="offline-meeting-name"
          label="Meeting Name"
          color="secondary"
          onChange={setMeetingName}
          value={meetingName}
        />
        <TextField
          required
          id="meeting-name"
          label="Paste URL"
          color="secondary"
          onChange={setMeetingURL}
          value={meetingURL}
        />
        <Button variant="outlined" color="secondary" onClick={submitMeetingHandler}>
          Submit Meeting
        </Button>
        
      </form>
      {showSubmitError && <Typography
          variant="body1"
          component="p"
          gutterBottom
          className={classes.errorMsg}
        >
          {errorMsg}
      </Typography>}

    </>
  );
};

export default OfflineMeeting;
