import React from "react";
import Container from '@material-ui/core/Container';
import Header from "../Header/Header";
import MeetingsGrid from "../CompletedMeetings/MeetingsGrid";
import MainContent from "../MainContent/MainContent";



const HomePage = () => {
  //const classes = useStyles();

  return (
    <>
    <Header />
    <Container maxWidth="xl" >
        
        <MeetingsGrid />
        <MainContent />
    </Container>
    </>
  );
};

export default HomePage;
