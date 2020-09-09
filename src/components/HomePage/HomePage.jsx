import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../Header/Header";
import MeetingsGrid from "../CompletedMeetings/MeetingsGrid";
import MainContent from "../MainContent/MainContent";
import { MeetingsProvider } from "../../context/meetings.context.js";
import { SingleMeetingProvider } from "../../context/singleMeeting.context.js";

const HomePage = () => {
  //const classes = useStyles();
 
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <MeetingsProvider>
          <MeetingsGrid  />
          <SingleMeetingProvider>
          <MainContent />
          </SingleMeetingProvider>
        </MeetingsProvider>
      </Container>
    </>
  );
};

export default HomePage;
