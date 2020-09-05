import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  offlineMeeting: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    minHeight: `10rem`,
  },
}));

const OfflineMeeting = () => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.offlineMeeting} noValidate autoComplete="off">
 
        <TextField
          required
          id="meeting-name"
          label="Meeting Name"
          color="secondary"
        />
        <TextField
          required
          id="meeting-name"
          label="Paste URL"
          color="secondary"
        />
        <Button variant="outlined" color="secondary">
          Submit Meeting
        </Button>
      </form>
    </>
  );
};

export default OfflineMeeting;
