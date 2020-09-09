import React from "react";
import Container from '@material-ui/core/Container';
import Header from "../Header/Header";
import MeetingsGrid from "../CompletedMeetings/MeetingsGrid";
import MainContent from "../MainContent/MainContent";
import { useMeetingsState } from "../../hooks/useMeetingState";


const HomePage = () => {
  //const classes = useStyles();
  const meetingList = [
    {
      meetingId: 1,
      meetingName: "vPayment Launchpad",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: true,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
    {
      meetingId: 2,
      meetingName: "vPayment Tech",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: true,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
    {
      meetingId: 3,
      meetingName: "vPayment Bug Bash",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: true,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
    {
      meetingId: 4,
      meetingName: "Meeting 1",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: false,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
    {
      meetingId: 5,
      meetingName: "Meeting 2",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: false,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
    {
      meetingId: 6,
      meetingName: "Meeting 3",
      transcript: "",
      startTime: "Sep 5,2020 9:00 - 10:00 AM MST",
      endTime: "",
      completed: false,
      summary: {
        start: new Date(),
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        interval: 1,
      },
    },
  ];
  const { meetings } = useMeetingsState(meetingList);

  return (
    <>
    <Header />
    <Container maxWidth="xl" >
        
        <MeetingsGrid meetings={meetings} />
        <MainContent meetings={meetings}/>
    </Container>
    </>
  );
};

export default HomePage;
