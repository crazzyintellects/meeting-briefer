import React, { createContext } from "react";
import { useMeetingsState } from "../hooks/useMeetingState";


const defaultMeetings = [
    {
      meetingId: 1,
      meetingName: "vPayment Launchpad",
      meetingURL: "",
      transcript: "",
      startTime: "Aug 15,2020 9:00 - 10:00 AM MST",
      endTime: "",
      progress: 100,
      completed: true,
      summary: {
        start: new Date(),
        text:
          "The product partner has aligned to work on N plus two model, that will help finalize the userstories to be ready and delivered before 2 iterations and the kanban process is seamless ",
        interval: 1,
      },
    },
    {
      meetingId: 2,
      meetingName: "vPayment Tech",
      meetingURL: "",
      transcript: "",
      startTime: "Aug 17,2020 11:00 - 12:00 PM MST",
      endTime: "",
      progress: 100,
      completed: true,
      summary: {
        start: new Date(),
        text:
          "Leadership mantra is 'Talk Less, Code More', engineers aligned that they will focus more on code and less on meetings",
        interval: 1,
      },
    },
    {
      meetingId: 3,
      meetingName: "vPayment Bug Bash",
      meetingURL: "",
      transcript: "",
      startTime: "Aug 24,2020 9:30 - 10:30 AM MST",
      endTime: "",
      progress: 100,
      completed: true,
      summary: {
        start: new Date(),
        text:
          "Teams worked on a hackathon to find bugs associated within vpayment platofrorm. Big participation and big prizes to be won.",
        interval: 1,
      },
    },
    {
      meetingId: 4,
      meetingName: "Round Table",
      meetingURL: "",
      transcript: "",
      startTime: "Sep 1,2020 1:00 - 2:00 PM MST",
      endTime: "",
      progress: 21,
      completed: false,
      summary: {
        start: new Date(),
        text:
          "Focus on testing is very important, better testing means lesser incidents which means lesser late night calls for developers.",
        interval: 1,
      },
    },
    {
      meetingId: 5,
      meetingName: "Town Hall",
      meetingURL: "",
      transcript: "",
      startTime: "Sep 2,2020 9:00 - 10:30 AM MST",
      endTime: "",
      progress: 56,
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
      meetingName: "Grooming Call",
      meetingURL: "",
      transcript: "",
      startTime: "Sep 8,2020 2:00 - 3:00 PM MST",
      endTime: "",
      progress: 89,
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

  export const DefaultValues = defaultMeetings;
  
  export function MeetingsProvider(props) {
    const meetingStuff = useMeetingsState(defaultMeetings);
    return (
      <MeetingsContext.Provider value={meetingStuff}>
        {props.children}
      </MeetingsContext.Provider>
    );
  }
  