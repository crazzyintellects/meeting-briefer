import React, { createContext } from "react";
import { useSingleMeetingState } from "../hooks/useMeetingState";


const initialMeeting = {
    meetingId: 1,
    meetingName: "",
    meetingURL: "",
    transcript: "",
    startTime: "Sept 10, 2020",
    endTime: "",
    progress: 0,
    completed: false,
    summary: [
        {
            start: new Date(),
            text: "Meeting Summary 1 at ",
            interval: 1,
        },
        {
            start: new Date(),
            text: "Meeting Summary 2 at ",
            interval: 2,
        },
        {
            start: new Date(),
            text: "Meeting Summary 3 at ",
            interval: 3,
        },
        {
            start: new Date(),
            text: "Meeting Summary 4 at",
            interval: 4,
        },
        {
            start: new Date(),
            text: "Meeting Summary 5 at",
            interval: 5,
        }],
  };
  export const SingleMeetingContext = createContext();

  export const InitialMeeting = initialMeeting;
  
  export function SingleMeetingProvider(props) {
    const meetingStuff = useSingleMeetingState(initialMeeting);
    return (
      <SingleMeetingContext.Provider value={meetingStuff}>
        {props.children}
      </SingleMeetingContext.Provider>
    );
  }
  