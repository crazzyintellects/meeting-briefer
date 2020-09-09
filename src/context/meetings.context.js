import React, { createContext } from "react";
import { useMeetingsState } from "../hooks/useMeetingState";


const defaultMeetings = [
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
  export const MeetingsContext = createContext();
  
  export function MeetingsProvider(props) {
    const meetingStuff = useMeetingsState(defaultMeetings);
    return (
      <MeetingsContext.Provider value={meetingStuff}>
        {props.children}
      </MeetingsContext.Provider>
    );
  }
  