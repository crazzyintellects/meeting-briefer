import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header/Header";
import MeetingsGrid from "../CompletedMeetings/MeetingsGrid";
import MainContent from "../MainContent/MainContent";


const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: `92vw`,
    margin: `3.5rem auto`,
    backgroundColor: `#f3f5f9`,
    boxShadow: `0 2rem 4rem rgba(0,0,0,.3)`,
    borderRadius: `1rem`,

    //minHeight: `50rem`,
  },
  mainContent: {
    margin: `0 auto`,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Header />
        <MeetingsGrid />
        <MainContent />
      </div>
    </>
  );
};

export default HomePage;
