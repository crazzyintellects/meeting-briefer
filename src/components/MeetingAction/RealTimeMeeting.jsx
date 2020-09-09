import React , {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import useToggle from "../../hooks/useToggle";
import useFormState from "../../hooks/useFormState";
import {SingleMeetingContext} from "../../context/singleMeeting.context.js";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  realTimeMeeting: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    minHeight: `7rem`,
    alignItems: `start`,
  },
}));

const RealTimeMeeting = () => {
  const classes = useStyles();
  const { startMeeting , stopMeeting } = useContext(SingleMeetingContext);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showStartBtn, setShowStartButton] = useToggle(true);
  const [meetingName, setMeetingName, resetMeetingName] = useFormState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const stopMeetingHandler = () => {
    
    setShowStartButton();
    handleDateChange(new Date());
    stopMeeting();

    //resetMeetingName();
    //document.getElementById('theForm').submit();
  };

  const startMeetingHandler = () => {
    setShowStartButton();
    startMeeting( meetingName,selectedDate);
    resetMeetingName();
    //document.getElementById('theForm').submit();
  };

  return (
    <>
      <form className={classes.realTimeMeeting} noValidate autoComplete="off">
        <TextField
          required
          id="real-time-meeting-name"
          label="Meeting Name"
          color="primary"
          onChange={setMeetingName}
          value={meetingName}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        {showStartBtn ? (
          <Button
            variant="contained"
            color="primary"
            onClick={startMeetingHandler}
            name="startButton"
            value="start"
          >
            Start Meeting
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={stopMeetingHandler}
            name="stopButton"
            value="stop"
          >
            Stop Meeting
          </Button>
        )}
      </form>
    </>
  );
};

export default RealTimeMeeting;
